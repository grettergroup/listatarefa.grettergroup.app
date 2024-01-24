import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Tarefa from './.expo/src/tarefa';

export default function App() {
  const [tarefa, setTarefa] = useState('')
  const [lista, setLista] = useState([])

  function handleAdd() {
    if (tarefa === '') {
      return;
    }

    const dados = {
      key: Date.now(),
      item: tarefa
    }

    setLista(oldArray => [dados, ...oldArray]);
    setTarefa('')

  }

  function handleDelete(item) {
    let filtroItem = lista.filter((tarefa) => {
      return (tarefa.item !== item)
    })

    setLista(filtroItem)
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tarefas</Text>
      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          placeholder='Digite uma tarefa'
          value={tarefa}
          onChangeText={(text) => setTarefa(text)}
        />

        <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
          <FontAwesome name="plus" size={20} color="#fff"></FontAwesome>
        </TouchableOpacity>
      </View>

      <FlatList
        data={lista}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => <Tarefa data={item} deleteItem={() => handleDelete(item.item)} />}
        style={styles.lista}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#22272e',
    paddingTop: 28
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#fff',
    marginTop: '5%',
    padding: '5%',
    marginBottom: '12'
  },
  containerInput: {
    flexDirection: 'row',
    width: '100%',
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22
  },
  input: {
    width: '75%',
    backgroundColor: '#fff',
    height: 44,
    borderRadius: 4,
    paddingHorizontal: 8
  },

  buttonAdd: {
    width: '15%',
    height: 44,
    backgroundColor: '#73f7ff',
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4
  },

  lista: {
    backgroundColor: '#fff',
    paddingStart: '4%',
    paddingEnd: '4%'

  }
});
