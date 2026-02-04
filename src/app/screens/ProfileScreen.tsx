//boiler react native screen profile
import React from 'react';
import { StyleSheet,Text, View } from 'react-native';

interface Props {
  // Define any props you might need here
}

export const ProfileScreen: Props = () => (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>
    </View>
  );

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});