import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native';
import React from 'react';
interface LoaderProps {
  visible: boolean;
  text: string;
}
const Loader = ({ visible, text }: LoaderProps) => {
  return (
    <Modal visible={visible}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
          }}
        >
          <ActivityIndicator size="large" color="#000" />
          <Text>{text}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({});
