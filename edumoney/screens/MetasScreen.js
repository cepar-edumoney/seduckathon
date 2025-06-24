import React, { useState } from 'react';
import {View,Text,TouchableOpacity,FlatList,StyleSheet,TextInput,Modal,Alert,
} from 'react-native';
import { createStyles } from '../styles/globalStyles';
import * as Progress from 'react-native-progress';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function MetasScreen({ navigation }) {
  const styles = createStyles();

  const [metas, setMetas] = useState([
    {
      id: '1',
      nome: 'Comprar um notebook',
      valorTotal: 3000,
      acumulado: 1200,
      data: '01/12/2025',
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [novaMeta, setNovaMeta] = useState('');
  const [valorMeta, setValorMeta] = useState('');
  const [dataMeta, setDataMeta] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const adicionarMeta = () => {
    if (novaMeta && valorMeta) {
      const nova = {
        id: Math.random().toString(),
        nome: novaMeta,
        valorTotal: parseFloat(valorMeta),
        acumulado: 0,
        data: dataMeta.toLocaleDateString('pt-BR'),
      };
      setMetas([...metas, nova]);
      setNovaMeta('');
      setValorMeta('');
      setDataMeta(new Date());
      setModalVisible(false);
    }
  };

  const confirmarExcluirMeta = (id, nome) => {
    Alert.alert(
      'Excluir Meta',
      `Tem certeza que deseja excluir a meta "${nome}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: () => excluirMeta(id) },
      ]
    );
  };

  const excluirMeta = (id) => {
    const novasMetas = metas.filter((meta) => meta.id !== id);
    setMetas(novasMetas);
  };

  const renderItem = ({ item }) => {
    const progresso = item.acumulado / item.valorTotal;

    const hoje = new Date();
    const [dia, mes, ano] = item.data.split('/');
    const dataMetaFormatada = new Date(ano, mes - 1, dia);

    const corTitulo = dataMetaFormatada < hoje ? 'red' : '#216943';

    return (
      <View style={local.card}>
        <TouchableOpacity
          style={local.deleteButton}
          onPress={() => confirmarExcluirMeta(item.id, item.nome)}
        >
          <Ionicons name="trash" size={20} color="red" />
        </TouchableOpacity>

        <Text style={[local.metaTitle, { color: corTitulo }]}>{item.nome}</Text>
        <Text>Meta: R$ {item.valorTotal.toFixed(2)} até {item.data}</Text>
        <Progress.Bar progress={progresso} width={null} color="#216943" height={10} />
        <Text>Acumulado: R$ {item.acumulado.toFixed(2)} ({Math.round(progresso * 100)}%)</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{ position: 'absolute', left: 20, top: 50 }}
          onPress={() => navigation.goBack()} 
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Ionicons name="rocket-outline" size={36} color="#000" />
      </View>

      <FlatList
        data={metas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 20 }}
      />

      <TouchableOpacity style={local.buttonAdd} onPress={() => setModalVisible(true)}>
        <Text style={local.buttonAddText}>Adicionar Nova Meta</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={local.modalContainer}>
          <View style={local.modalContent}>
            <Text style={styles.title}>Nova Meta</Text>

            <TextInput
              placeholder="Nome da Meta"
              value={novaMeta}
              onChangeText={setNovaMeta}
              style={styles.input}
            />
            <TextInput
              placeholder="Valor Total (R$)"
              keyboardType="numeric"
              value={valorMeta}
              onChangeText={setValorMeta}
              style={styles.input}
            />

            <TouchableOpacity style={local.dateButton} onPress={() => setShowDatePicker(true)}>
              <Text style={local.dateButtonText}>{dataMeta.toLocaleDateString('pt-BR')}</Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={dataMeta}
                mode="date"
                display="calendar"
                onChange={(event, selectedDate) => {
                  const currentDate = selectedDate || dataMeta;
                  setShowDatePicker(false);
                  setDataMeta(currentDate);
                }}
              />
            )}

            <TouchableOpacity style={styles.buttonPrimary} onPress={adicionarMeta}>
              <Text style={styles.buttonPrimaryText}>Salvar Meta</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.link}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const local = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    elevation: 2,
    position: 'relative',
  },
  metaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  buttonAdd: {
    backgroundColor: '#FDC91A',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 90,
  },
  buttonAddText: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF6C7',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  dateButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateButtonText: {
    color: '#000',
    fontSize: 16,
  },
});
