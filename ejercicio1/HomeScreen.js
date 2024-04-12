import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Platform, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native'; 

const HomeScreen = () => {
  const [actividades, setActividades] = useState([]);
  const [nombre, setNombre] = useState('');
  const [lugar, setLugar] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [hora, setHora] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [dateSelected, setDateSelected] = useState(false);
  const [timeSelected, setTimeSelected] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  
  const navigation = useNavigation(); 

  const handleAddActivity = () => {
    const nuevaActividad = {
      nombre,
      lugar,
      descripcion,
      fecha,
      hora,
    };
    setActividades([...actividades, nuevaActividad]);
    setNombre('');
    setLugar('');
    setDescripcion('');
    setFecha(new Date());
    setHora(new Date());
    setDateSelected(false);
    setTimeSelected(false);
    setModalVisible(false);
  };

  const handleDeleteActivity = (index) => {
    setConfirmDeleteVisible(true);
    setDeleteIndex(index);
  };

  const confirmDeleteActivity = () => {
    const nuevasActividades = [...actividades];
    nuevasActividades.splice(deleteIndex, 1);
    setActividades(nuevasActividades);
    setConfirmDeleteVisible(false);
  };

  const handleLogout = () => {
    
    setLogoutModalVisible(false); 
    navigation.navigate('Login'); 
  };

  const getClassForDate = (date) => {
    if (!date) {
      return 'gray'; 
    }
    const currentDate = new Date();
    const actividadDate = new Date(date);
    if (actividadDate.toDateString() === currentDate.toDateString()) {
      return 'green';
    } else if (actividadDate < currentDate) {
      return 'red';
    } else {
      return 'blue';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
        <Text style={[styles.title, { color: 'black' }]}>Actividades</Text>
      </View>
      {actividades.length === 0 ? (
        <View style={styles.noRecordsContainer}>
          <Text style={styles.noRecordsText}>No hay registros</Text>
          <Ionicons name="sad-outline" size={100} color="black" />
        </View>
      ) : (
        <ScrollView style={styles.actividadesContainer}>
          {actividades.map((actividad, index) => (
            <View key={index} style={[styles.actividadItem, { backgroundColor: getClassForDate(actividad.fecha) }]}>
              <Text style={{ color: 'white' }}>{actividad.nombre}</Text>
              <Text style={{ color: 'white' }}>{actividad.lugar}</Text>
              <Text style={{ color: 'white' }}>{actividad.descripcion}</Text>
              <Text style={{ color: 'white' }}>{actividad.fecha ? actividad.fecha.toDateString() : 'Sin fecha'}</Text>
              <Text style={{ color: 'white' }}>{actividad.hora.toLocaleTimeString()}</Text>
              <TouchableOpacity onPress={() => handleDeleteActivity(index)}>
                <Ionicons name="trash" size={24} color="white" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
      <TouchableOpacity style={styles.floatingButton} onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Agregar Actividad</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={nombre}
              onChangeText={setNombre}
            />
            <TextInput
              style={styles.input}
              placeholder="Lugar"
              value={lugar}
              onChangeText={setLugar}
            />
            <TextInput
              style={styles.input}
              placeholder="Descripción"
              value={descripcion}
              onChangeText={setDescripcion}
            />
            <TouchableOpacity style={styles.dateTimeButton} onPress={() => setShowDatePicker(true)}>
              <Text style={styles.buttonText}>{dateSelected ? fecha.toDateString() : 'Agregar Fecha'}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={fecha}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    setFecha(selectedDate);
                    setDateSelected(true);
                  }
                }}
              />
            )}
            <TouchableOpacity
              style={[styles.dateTimeButton, dateSelected ? {} : { backgroundColor: '#ccc' }]}
              onPress={() => {
                if (dateSelected) {
                  setShowTimePicker(true);
                }
              }}
              disabled={!dateSelected}>
              <Text style={[styles.buttonText, dateSelected ? {} : { color: '#666' }]}>
                {timeSelected ? hora.toLocaleTimeString() : 'Agregar Hora'}
              </Text>
            </TouchableOpacity>
            {showTimePicker && (
              <DateTimePicker
                value={hora}
                mode="time"
                display="default"
                onChange={(event, selectedTime) => {
                  setShowTimePicker(false);
                  if (selectedTime) {
                    setHora(selectedTime);
                    setTimeSelected(true);
                  }
                }}
              />
            )}
            <TouchableOpacity
              style={[styles.button, dateSelected && timeSelected ? {} : { backgroundColor: '#ccc' }]}
              onPress={handleAddActivity}
              disabled={!dateSelected || !timeSelected}>
              <Text style={styles.buttonText}>Agregar Actividad</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setLogoutModalVisible(true)}>
              <Text style={styles.buttonText}>Cerrar Sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={confirmDeleteVisible}
        onRequestClose={() => {
          setConfirmDeleteVisible(false);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Eliminar Actividad</Text>
            <Text style={styles.modalText}>¿Estás seguro de eliminar esta actividad?</Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={confirmDeleteActivity}>
                <Text style={styles.buttonText}>Eliminar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#ccc' }]}
                onPress={() => setConfirmDeleteVisible(false)}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={logoutModalVisible}
        onRequestClose={() => {
          setLogoutModalVisible(false);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Cerrar Sesión</Text>
            <Text style={styles.modalText}>¿Estás seguro de cerrar sesión?</Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={handleLogout}>
                <Text style={styles.buttonText}>Cerrar Sesión</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#ccc' }]}
                onPress={() => setLogoutModalVisible(false)}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  actividadesContainer: {
    flex: 1,
    padding: 20,
  },
  actividadItem: {
    backgroundColor: '#007bff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007bff',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noRecordsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noRecordsText: {
    fontSize: 24,
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  dateTimeButton: {
    backgroundColor: '#007bff',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default HomeScreen;
