import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, ActivityIndicator, Image } from 'react-native';

const SistemaSolarScreen = () => {
  const [sistemaSolarData, setSistemaSolarData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://661775e1ed6b8fa43482b2a2.mockapi.io/SistemaSolar')
      .then(response => response.json())
      .then(data => {
        // Filtrar el sol y la tierra de los datos
        const planetsOnly = data.filter(item => item.nombre !== 'Sol' && item.nombre !== 'Tierra');
        setSistemaSolarData(planetsOnly);
        setFilteredData(planetsOnly);
        setIsLoading(false);
      })
      .catch(error => console.error('Error fetching Sistema Solar data:', error));
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = sistemaSolarData.filter(item =>
      item.nombre.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const renderPlanetItem = ({ item }) => (
    <View style={styles.planetItem}>
      <Text style={styles.planetName}>{item.nombre}</Text>
      <Image source={{ uri: item.imagen }} style={styles.planetImage} />
      <Text>Tipo: {item.tipo}</Text>
      <Text>Masa: {item.masa}</Text>
      <Text>Radio: {item.radio}</Text>
      <Text>Distancia Media al Sol: {item.distancia_media_al_sol}</Text>
      <Text>Periodo Orbital: {item.periodo_orbital}</Text>
      <Text>Periodo de Rotación: {item.periodo_rotacion}</Text>
      <Text>Número de Lunas: {item.numero_de_lunas}</Text>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar Planeta..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredData}
        renderItem={renderPlanetItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  searchInput: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  planetItem: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  planetName: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
  },
  planetImage: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SistemaSolarScreen;
