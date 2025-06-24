import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/mascote1.png')}
        resizeMode="contain" 
      />

      <Text style={styles.logo}>
        <Text style={styles.edu}>Edu</Text>
        <Text style={styles.money}>Money</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF6C7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 20,
  },
  logo: {
    fontSize: 42,
    fontWeight: '900',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  edu: {
    color: '#11630C',
  },
  money: {
    color: '#2061EE',
  },
});
