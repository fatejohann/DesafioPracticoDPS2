import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SistemaSolarScreen from './src/screens/SistemaSolarScreen'; // Importa el componente de pantalla SistemaSolarScreen
import SolScreen from './src/screens/SolScreen'; // Importa el componente de pantalla SolScreen
import TierraScreen from './src/screens/TierraScreen'; // Importa el componente de pantalla TierraScreen

// Crea la navegación de la barra de pestañas
const Tab = createBottomTabNavigator();

// Función principal de la aplicación
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Sistema Solar" component={SistemaSolarScreen} />
        <Tab.Screen name="Sol" component={SolScreen} />
        <Tab.Screen name="Tierra" component={TierraScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
