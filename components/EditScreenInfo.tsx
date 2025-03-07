import React, { useState } from 'react';
import { Text, View } from 'react-native';

import Button from './Button';
import { Weather } from 'Interfaces/WeatherInterface';

export const EditScreenInfo = ({ path }: { path: string }) => {
  const title = 'Titulo:';
  const description = 'Descripcion blablabla.';
  const [WeatherInputValue, setWeatherValue] = useState('');
  const [isDisabledButtonValue, setIsDisabledButtonValue] = useState(false);
  const urlApi = 'https://67cb29063395520e6af489a3.mockapi.io/api/v1/weather';

  const viewWeather = async (): Promise<void> => {
    setIsDisabledButtonValue(true);

    await fetch(urlApi)
      .then((res) => res.json())
      .then((weatherData: Weather[]) => {
        if (weatherData && weatherData.length) setWeatherValue(weatherData[0].weather);
      });

    setIsDisabledButtonValue(false);
  };

  return (
    <View>
      <View className={styles.getStartedContainer}>
        <View className={styles.codeHighlightContainer + styles.homeScreenFilename}>
          <Text>La temperatura es de {WeatherInputValue} grados celsius</Text>
        </View>
        {WeatherInputValue !== '' ? (
          <Text className={styles.getStartedText}>{description}</Text>
        ) : null}
        <Button color="primary" handleClick={viewWeather} isDisabled={isDisabledButtonValue}>
          Ver el clima
        </Button>
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
