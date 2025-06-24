import React, { useState } from 'react';
import {View,Text,TouchableOpacity,Modal,TextInput,Alert,FlatList,ScrollView,Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createStyles } from '../styles/globalStyles';

export default function MeuDinheiroScreen({ navigation }) {
  const styles = createStyles();

  const [saldo, setSaldo] = useState(0);
  const [gastoMensal, setGastoMensal] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [valorInput, setValorInput] = useState('');
  const [historico, setHistorico] = useState([]);
  const [search, setSearch] = useState('');
  const [operacao, setOperacao] = useState('');
  const [destinarMeta, setDestinarMeta] = useState(false);
  const [metaSelecionada, setMetaSelecionada] = useState('');
  const [destinarDesafio, setDestinarDesafio] = useState(false);
  const [desafioSelecionado, setDesafioSelecionado] = useState('');
  const [modalDetalhesVisible, setModalDetalhesVisible] = useState(false);
  const [registroSelecionado, setRegistroSelecionado] = useState(null);

  const metas = ['Comprar um Notebook', 'Comprar um Livro'];
  const desafios = ['Desafio Diário', 'Desafio Semanal', 'Desafio Mensal'];

  const valoresDesafios = {
    'Desafio Diário': 0.5,
    'Desafio Semanal': 5,
    'Desafio Mensal': 10,
  };

  const handleOperacao = () => {
    const valor = parseFloat(valorInput);

    if (isNaN(valor) || valor <= 0) {
      Alert.alert('Valor inválido', 'Digite um valor maior que zero.');
      return;
    }

    if (destinarMeta && destinarDesafio) {
      Alert.alert(
        'Atenção',
        'Você só pode destinar o dinheiro para a Meta ou para o Desafio, não para ambos.'
      );
      return;
    }

    if (destinarDesafio) {
      const valorEsperado = valoresDesafios[desafioSelecionado];
      if (valor !== valorEsperado) {
        Alert.alert(
          'Valor incorreto',
          `O valor para ${desafioSelecionado} deve ser exatamente R$ ${valorEsperado.toFixed(2)}`
        );
        return;
      }
    }

    const data = new Date();

    const registro = {
      id: Math.random().toString(),
      tipo: operacao === 'adicionar' ? 'Entrada' : 'Saída',
      valor,
      data: data.toLocaleString('pt-BR'),
      meta: destinarMeta ? metaSelecionada : null,
      desafio: destinarDesafio ? desafioSelecionado : null,
    };

    if (operacao === 'adicionar') {
      setSaldo(saldo + valor);
    } else if (operacao === 'retirar') {
      if (saldo >= valor) {
        setSaldo(saldo - valor);
        setGastoMensal(gastoMensal + valor);
      } else {
        Alert.alert('Saldo insuficiente', 'Você não tem saldo suficiente.');
        return;
      }
    }

    setHistorico([registro, ...historico]);
    setValorInput('');
    setDestinarMeta(false);
    setMetaSelecionada('');
    setDestinarDesafio(false);
    setDesafioSelecionado('');
    setModalVisible(false);
  };

  const historicoFiltrado = historico.filter((item) =>
    item.tipo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{ position: 'absolute', left: 20, top: 50 }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Ionicons name="wallet-outline" size={36} color="#000" />
      </View>

      {/* Saldo */}
      <View style={{
        marginTop: 20,
        backgroundColor: '#71A0D6',
        borderColor: '#2061EE',
        borderWidth: 3,
        borderRadius: 12,
        width: '90%',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
      }}>
        <Text style={{ color: '#000', fontSize: 20, fontWeight: 'bold' }}>
          Saldo Disponível: R$ {saldo.toFixed(2)}
        </Text>
      </View>

      {/* Gasto Mensal */}
      <View style={{
        marginTop: 15,
        backgroundColor: '#D95349',
        borderColor: '#DD1A0B',
        borderWidth: 3,
        borderRadius: 12,
        width: '90%',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
      }}>
        <Text style={{ color: '#000', fontSize: 20, fontWeight: 'bold' }}>
          Gasto Mensal: R$ {gastoMensal.toFixed(2)}
        </Text>
      </View>

      <View style={{ alignItems: 'center', marginVertical: 20 }}>
        <Image
          source={require('../assets/mascote1.png')}
          style={{ width: 120, height: 120, resizeMode: 'contain' }}
        />
      </View>

      {/* Botões de Adicionar e retirar */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
      }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#FDC91A',
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => {
            setOperacao('adicionar');
            setModalVisible(true);
          }}
        >
          <Ionicons name="add-circle-outline" size={20} color="#000" />
          <Text style={{ color: '#000', fontWeight: 'bold', marginLeft: 8 }}>
            Adicionar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: '#FDC91A',
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => {
            setOperacao('retirar');
            setModalVisible(true);
          }}
        >
          <Ionicons name="remove-circle-outline" size={20} color="#000" />
          <Text style={{ color: '#000', fontWeight: 'bold', marginLeft: 8 }}>
            Retirar
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={{
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 20,
        marginTop: 30,
        marginBottom: 8,
        color: '#000',
      }}>
        Histórico
      </Text>
21
      <View style={{
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 10,
        paddingVertical: 8,
        alignSelf: 'center',
        marginBottom: 10,
      }}>
        <TextInput
          placeholder="Pesquisar no histórico..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Lista de Histórico */}
      {historicoFiltrado.length === 0 ? (
        <Text style={{
          textAlign: 'center',
          color: '#666',
          marginTop: 10,
          marginBottom: 30,
        }}>
          Nenhum histórico encontrado.
        </Text>
      ) : (
        <FlatList
          data={historicoFiltrado}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 50 }}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setRegistroSelecionado(item);
                setModalDetalhesVisible(true);
              }}
              style={{
                backgroundColor: '#fff',
                padding: 12,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#ccc',
                marginBottom: 8,
              }}
            >
              <Text style={{
                color: item.tipo === 'Entrada' ? '#216943' : 'red',
                fontWeight: 'bold',
              }}>
                {item.tipo} - R$ {item.valor.toFixed(2)}
              </Text>
              <Text style={{ color: '#000' }}>{item.data}</Text>
              {item.meta && (
                <Text style={{ color: '#000' }}>Meta: {item.meta}</Text>
              )}
              {item.desafio && (
                <Text style={{ color: '#000' }}>Desafio: {item.desafio}</Text>
              )}
            </TouchableOpacity>
          )}
        />
      )}
      
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.4)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <View style={{
            backgroundColor: '#FFF6C7',
            padding: 20,
            borderRadius: 10,
            width: '90%',
            alignItems: 'center',
          }}>
            <Text style={styles.title}>
              {operacao === 'adicionar' ? 'Adicionar Saldo' : 'Retirar Saldo'}
            </Text>

            <TextInput
              placeholder="Valor (R$)"
              keyboardType="numeric"
              value={valorInput}
              onChangeText={setValorInput}
              style={styles.input}
            />

            {/* Destinar à Meta */}
            <View style={{ width: '100%', marginTop: 10 }}>
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
                onPress={() => setDestinarMeta(!destinarMeta)}
              >
                <Ionicons
                  name={destinarMeta ? 'checkbox-outline' : 'square-outline'}
                  size={24}
                  color="#000"
                />
                <Text style={{ marginLeft: 8 }}>Deseja destinar à meta?</Text>
              </TouchableOpacity>

              {destinarMeta && (
                <View style={{ width: '100%', marginBottom: 10 }}>
                  <Text style={{ marginBottom: 6 }}>Escolha uma meta:</Text>
                  {metas.map((meta) => (
                    <TouchableOpacity
                      key={meta}
                      onPress={() => setMetaSelecionada(meta)}
                      style={{
                        padding: 10,
                        backgroundColor: metaSelecionada === meta ? '#FDC91A' : '#fff',
                        borderColor: '#ccc',
                        borderWidth: 1,
                        borderRadius: 8,
                        marginBottom: 6,
                      }}
                    >
                      <Text style={{ color: '#000' }}>{meta}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* Destinar à Desafio */}
            <View style={{ width: '100%' }}>
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
                onPress={() => setDestinarDesafio(!destinarDesafio)}
              >
                <Ionicons
                  name={destinarDesafio ? 'checkbox-outline' : 'square-outline'}
                  size={24}
                  color="#000"
                />
                <Text style={{ marginLeft: 8 }}>Deseja destinar à desafio?</Text>
              </TouchableOpacity>

              {destinarDesafio && (
                <View style={{ width: '100%', marginBottom: 10 }}>
                  <Text style={{ marginBottom: 6 }}>Escolha um desafio:</Text>
                  {desafios.map((desafio) => (
                    <TouchableOpacity
                      key={desafio}
                      onPress={() => setDesafioSelecionado(desafio)}
                      style={{
                        padding: 10,
                        backgroundColor: desafioSelecionado === desafio ? '#FDC91A' : '#fff',
                        borderColor: '#ccc',
                        borderWidth: 1,
                        borderRadius: 8,
                        marginBottom: 6,
                      }}
                    >
                      <Text style={{ color: '#000' }}>{desafio}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            <TouchableOpacity style={styles.buttonPrimary} onPress={handleOperacao}>
              <Text style={styles.buttonPrimaryText}>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.link}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de Detalhes */}
      <Modal visible={modalDetalhesVisible} transparent animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              backgroundColor: '#fff',
              padding: 20,
              borderRadius: 10,
              width: '90%',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
              {registroSelecionado?.tipo}
            </Text>

            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: registroSelecionado?.tipo === 'Entrada' ? '#216943' : '#D95349',
                marginBottom: 5,
              }}
            >
              R$ {registroSelecionado?.valor.toFixed(2)}
            </Text>

            <Text style={{ fontSize: 16, marginBottom: 5 }}>
              Data: {registroSelecionado?.data}
            </Text>

            {registroSelecionado?.meta && (
              <Text style={{ fontSize: 16, marginBottom: 5 }}>
                Meta: {registroSelecionado.meta}
              </Text>
            )}

            {registroSelecionado?.desafio && (
              <Text style={{ fontSize: 16, marginBottom: 5 }}>
                Desafio: {registroSelecionado.desafio}
              </Text>
            )}

            <TouchableOpacity
              onPress={() => setModalDetalhesVisible(false)}
              style={{ marginTop: 20 }}
            >
              <Text style={{ color: '#007BFF', fontSize: 16 }}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
