import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { createStyles } from '../styles/globalStyles';

export default function InfoScreen({ navigation }) {
  const styles = createStyles();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{ position: 'absolute', left: 20, top: 50 }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Ionicons name="information-circle-outline" size={36} color="#000" />
      </View>

      <Text style={local.title}>Tipos de Investimentos</Text>

      <View style={local.buttonsContainer}>
        <TouchableOpacity
          style={local.button}
          onPress={() => navigation.navigate('RendaFixa')}
        >
        <Ionicons name="arrow-up-outline" size={36} color="#000" style={{ transform: [{ rotate: '45deg' }] }} />
          <Text style={local.buttonText}>Renda Fixa</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={local.button}
          onPress={() => navigation.navigate('RendaVariavel')}
        >
          <Ionicons name="trending-up" size={36} color="#000" />
          <Text style={local.buttonText}>Renda Variável</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const local = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  buttonsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#FDC91A',
    width: 150,
    height: 150,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 50,
  },
  buttonText: {
    marginTop: 10,
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
