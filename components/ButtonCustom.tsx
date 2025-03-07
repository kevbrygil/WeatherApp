import { View, TouchableOpacity, Text } from 'react-native';

interface Props {
  title: string;
  color: 'primary' | 'success' | 'secondary' | 'warning' | 'danger';
  handleClick?: () => void;
  type?: 'button' | 'submit';
  extraClasses?: string;
  isDisabled: boolean;
}

const ButtonCustom: React.FC<Props> = ({
  title,
  color,
  handleClick,
  type,
  extraClasses,
  isDisabled,
}) => {
  let colors: string;
  switch (color) {
    case 'primary':
      colors = 'bg-blue-500 hover:bg-blue-600';
      break;
    case 'success':
      colors = 'bg-green-500 hover:bg-green-600';
      break;
    case 'warning':
      colors = 'bg-yellow-300 hover:bg-yellow-400 text-black';
      break;
    case 'secondary':
      colors = 'bg-gray-400 hover:bg-gray-500';
      break;
    default:
      colors = 'bg-red-500 hover:bg-red-600';
  }
  const classes = `rounded text-white py-2 px-2 ${colors}`;

  return (
    <View>
      <TouchableOpacity className={classes} onPress={handleClick}>
        <Text className={extraClasses ? extraClasses : 'text-lg font-bold text-white'}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonCustom;
