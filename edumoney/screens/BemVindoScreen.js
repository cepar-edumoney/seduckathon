import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function BemVindoScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/mascote2.png')}
        resizeMode="contain" 
      />
      <View style={styles.textBox}>
        <Text style={styles.text}>Eduque seu bolso com</Text>
        <Text style={styles.logo}>
          <Text style={styles.edu}>Edu</Text>
          <Text style={styles.money}>Money</Text>
        </Text>
      </View>
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
  textBox: {
    backgroundColor: '#FDC91A',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#1E58D8',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: '#000',
    marginBottom: 8,
    fontWeight: '500',
  },
  logo: {
    fontSize: 32,
    fontWeight: '900',
    fontStyle: 'italic',
  },
  edu: {
    color: '#11630C',
  },
  money: {
    color: '#2061EE',
  },
    image: {
      width: 120,
      height: 120,
      marginBottom: 20,
    },
});