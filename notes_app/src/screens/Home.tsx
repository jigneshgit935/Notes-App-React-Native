import { View, Text } from 'react-native';
import React from 'react';
import { RootNavigationProps } from '../../App';
import { StackNavigationProp } from '@react-navigation/stack';
interface MyProps {
  navigation: StackNavigationProp<RootNavigationProps, 'Home'>;
}
const Home = ({ navigation }: MyProps) => {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default Home;
