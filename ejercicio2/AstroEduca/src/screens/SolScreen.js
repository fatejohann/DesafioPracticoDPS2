import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';

const SolScreen = () => {
  const [solData, setSolData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://661775e1ed6b8fa43482b2a2.mockapi.io/SistemaSolar')
      .then(response => response.json())
      .then(data => {
        const sol = data.find(item => item.nombre === 'Sol');
        setSolData(sol);
        setIsLoading(false);
      })
      .catch(error => console.error('Error fetching Sol data:', error));
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{solData.nombre}</Text>
      <Text>Tipo: {solData.tipo}</Text>
      <Text>Masa: {solData.masa}</Text>
      <Text>Radio: {solData.radio}</Text>
      <Text>Distancia Media a la Tierra: {solData.distancia_media_a_la_tierra}</Text>
      <Text>Edad: {solData.edad}</Text>
      <Text>Temperatura Superficial: {solData.temperatura_superficial}</Text>
      <Image source={{ uri: solData.imagen }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SolScreen;
