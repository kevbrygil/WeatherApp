import { Weather } from 'Interfaces/WeatherInterface';
import * as Location from 'expo-location';
import React, { useState, useEffect } from 'react';
import { Text, View, Alert } from 'react-native';

import ButtonCustom from './ButtonCustom';
import Loading from './Loading';

export const EditScreenInfo = ({ path }: { path: string }) => {
  const [WeatherInputValue, setWeatherValue] = useState(0);
  const [isDisabledButtonValue, setIsDisabledButtonValue] = useState(false);
  const [isLoadingValue, setIsLoadingValue] = useState(false);

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const [url, setUrl] = useState(
    'https://api.open-meteo.com/v1/forecast?latitude=20.73918000&longitude=-89.28490000&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m'
  );

  const viewWeather = async (): Promise<void> => {
    setIsDisabledButtonValue(true);
    setIsLoadingValue(true);
    await fetch(url)
      .then((res) => res.json())
      .then((weatherData: Weather) => {
        if (weatherData) setWeatherValue(weatherData.current.temperature_2m);
      });
    setIsDisabledButtonValue(false);
    setIsLoadingValue(false);
  };

  const createTwoButtonAlert = () =>
    Alert.alert('Hubo un problema!', 'Debe aceptar la localización', [{ text: 'OK' }]);

  useEffect(() => {
    const getLocation = async (): Promise<void> => {
      setIsLoadingValue(true);
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') createTwoButtonAlert();
      else {
        const currentLocation = await Location.getCurrentPositionAsync({});
        setLatitude(currentLocation.coords.latitude);
        setLongitude(currentLocation.coords.longitude);
        setUrl(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
        );
      }
    };

    getLocation()
      .catch(console.error)
      .finally(() => setIsLoadingValue(false));
  }, []);

  return (
    <View>
      <View className={styles.getStartedContainer}>
        {isLoadingValue ? (
          <Loading />
        ) : WeatherInputValue ? (
          <View>
            <Text className={styles.getStartedText}>
              La temperatura es de {WeatherInputValue} grados celsius
            </Text>
          </View>
        ) : null}

        {!isLoadingValue && (
          <View className={styles.helpLink}>
            <ButtonCustom
              type="button"
              color="primary"
              handleClick={viewWeather}
              isDisabled={isDisabledButtonValue}
              title="Ver el clima"
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = {
  codeHighlightContainer: `rounded-md px-1`,
  getStartedContainer: `items-center mx-12`,
  getStartedText: `text-lg leading-6 text-center`,
  helpContainer: `items-center mx-5 mt-4`,
  helpLink: `py-4`,
  helpLinkText: `text-center`,
  homeScreenFilename: `my-2`,
};
