  import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import BemVindoScreen from './screens/BemVindoScreen';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import MeuDinheiroScreen from './screens/MeuDinheiroScreen';
import MetasScreen from './screens/MetasScreen';
import DesafiosScreen from './screens/DesafiosScreen';
import InfoScreen from './screens/InfoScreen';
import RendaFixaScreen from './screens/RendaFixaScreen';
import RendaVariavelScreen from './screens/RendaVariavelScreen';
import ConfigScreen from './screens/ConfigScreen';
import ConfigPerfil from './screens/ConfigPerfil';
import EditarPerfilScreen from './screens/EditarPerfilScreen';
import RegisterScreen from './screens/RegisterScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="BemVindo" component={BemVindoScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="MeuDinheiro" component={MeuDinheiroScreen} />
        <Stack.Screen name="Metas" component={MetasScreen} />
        <Stack.Screen name="Desafios" component={DesafiosScreen} />
        <Stack.Screen name="Info" component={InfoScreen} />
        <Stack.Screen name="RendaFixa" component={RendaFixaScreen} />
        <Stack.Screen name="RendaVariavel" component={RendaVariavelScreen} />
        <Stack.Screen name="Config" component={ConfigScreen} />
        <Stack.Screen name="ConfigPerfil" component={ConfigPerfil} />
        <Stack.Screen name="EditarPerfil" component={EditarPerfilScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
