import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';

const TierraScreen = () => {
  const [tierraData, setTierraData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://661775e1ed6b8fa43482b2a2.mockapi.io/SistemaSolar')
      .then(response => response.json())
      .then(data => {
        const tierra = data.find(item => item.nombre === 'Tierra');
        setTierraData(tierra);
        setIsLoading(false);
      })
      .catch(error => console.error('Error fetching Tierra data:', error));
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
      <Text style={styles.title}>{tierraData.nombre}</Text>
      <Text>Tipo: {tierraData.tipo}</Text>
      <Text>Masa: {tierraData.masa}</Text>
      <Text>Radio: {tierraData.radio}</Text>
      <Text>Distancia Media al Sol: {tierraData.distancia_media_al_sol}</Text>
      <Text>Periodo Orbital: {tierraData.periodo_orbital}</Text>
      <Text>Periodo de Rotación: {tierraData.periodo_rotacion}</Text>
      <Text>Número de Lunas: {tierraData.numero_de_lunas}</Text>
      <Image source={{ uri: tierraData.imagen }} style={styles.image} />
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

export default TierraScreen;
