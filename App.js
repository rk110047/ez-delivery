import MainSwitch from './src/components/navigation';
import React from 'react';
import { StyleSheet, Text, View ,StatusBar} from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <MainSwitch />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
