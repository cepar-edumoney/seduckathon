import React, { useState } from 'react';
import {View,Text,TouchableOpacity,Modal,ScrollView,Alert,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';
import { createStyles } from '../styles/globalStyles';

export default function DesafiosScreen({ navigation }) {
  const styles = createStyles();

  const [desafiosAtivos, setDesafiosAtivos] = useState([
    {
      id: '1',
      categoria: 'diário',
      tempo: '2 dias - R$ 0,50',
      progresso: 0.5,
    },
  ]);

  const [desafiosFinalizados] = useState({
    diário: [
      { id: 'd1', tempo: '2 dias', status: 'Concluído' },
      { id: 'd2', tempo: '5 dias', status: 'Concluído' },
    ],
    semanal: [
      { id: 's1', tempo: '2 semanas', status: 'Concluído' },
      { id: 's2', tempo: '3 semanas', status: 'Concluído' },
    ],
    mensal: [
      { id: 'm1', tempo: '3 meses', status: 'Concluído' },
      { id: 'm2', tempo: '6 meses', status: 'Concluído' },
    ],
  });

  const [modalHistoricoVisible, setModalHistoricoVisible] = useState(false);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [historicoAtual, setHistoricoAtual] = useState([]);

  const [modalAdicionarVisible, setModalAdicionarVisible] = useState(false);
  const [categoriaNovoDesafio, setCategoriaNovoDesafio] = useState(null);
  const [tempoNovoDesafio, setTempoNovoDesafio] = useState(null);

  const opcoesPorCategoria = {
    diário: ['2 dias - R$ 0,50', '5 dias - R$ 0,50'],
    semanal: ['2 semanas - R$ 5,00', '3 semanas - R$ 5,00'],
    mensal: ['3 meses - R$ 10,00', '6 meses - R$ 10,00'],
  };

  const abrirHistorico = (categoria) => {
    setCategoriaSelecionada(categoria);
    setHistoricoAtual(desafiosFinalizados[categoria]);
    setModalHistoricoVisible(true);
  };

  const adicionarDesafio = () => {
    const existeAtivo = desafiosAtivos.some((d) => d.categoria === categoriaNovoDesafio);

    if (existeAtivo) {
      Alert.alert(
        'Desafio em andamento',
        `Você já está fazendo um desafio na categoria ${categoriaNovoDesafio.toUpperCase()}. Conclua o desafio atual para iniciar outro.`
      );
      return;
    }

    if (!categoriaNovoDesafio || !tempoNovoDesafio) {
      Alert.alert('Seleção incompleta', 'Escolha uma categoria e um tempo.');
      return;
    }

    const novoDesafio = {
      id: Math.random().toString(),
      categoria: categoriaNovoDesafio,
      tempo: tempoNovoDesafio,
      progresso: 0,
    };

    setDesafiosAtivos([...desafiosAtivos, novoDesafio]);
    setModalAdicionarVisible(false);
    setCategoriaNovoDesafio(null);
    setTempoNovoDesafio(null);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{ position: 'absolute', left: 20, top: 50 }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Ionicons name="trophy-outline" size={36} color="#000" />
      </View>

      <View style={{ marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
        <Ionicons name="person-circle-outline" size={150} color="#000" />
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#000', marginTop: 8 }}>
          Aluno
        </Text>
      </View>

      {/* Categorias */}
      <View
        style={{
          marginTop: 40,
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '90%',
          alignSelf: 'center',
        }}
      >
        {['diário', 'semanal', 'mensal'].map((cat) => (
          <TouchableOpacity key={cat} onPress={() => abrirHistorico(cat)}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontWeight: 'bold', color: '#000' }}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Text>
              <Text style={{ color: '#000' }}>{desafiosFinalizados[cat].length}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Botão adicionar */}
      <TouchableOpacity
        style={{
          backgroundColor: '#FDC91A',
          paddingVertical: 12,
          paddingHorizontal: 24,
          borderRadius: 10,
          alignItems: 'center',
          alignSelf: 'center',
          marginTop: 30,
        }}
        onPress={() => setModalAdicionarVisible(true)}
      >
        <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 16 }}>Adicionar Novo Desafio</Text>
      </TouchableOpacity>

      {/* Desafios Ativos */}
      {desafiosAtivos.map((item) => (
        <View
          key={item.id}
          style={{
            backgroundColor: '#71A0D6',
            borderRadius: 12,
            padding: 16,
            marginTop: 20,
            width: '90%',
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Ionicons name="trophy-outline" size={40} color="#FFD700" />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 18,
                color: '#000',
                marginBottom: 4,
              }}
            >
              Desafio {item.categoria.toUpperCase()}
            </Text>
            <Text style={{ color: '#000', marginBottom: 8 }}>{item.tempo}</Text>
            <Progress.Bar
              progress={item.progresso}
              width={null}
              color="#216943"
              unfilledColor="#fff"
              borderWidth={1}
              borderColor="#216943"
              height={10}
            />
          </View>
        </View>
      ))}

      {/* Modal Histórico */}
      <Modal visible={modalHistoricoVisible} transparent animationType="slide">
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
              backgroundColor: '#FFF6C7',
              padding: 20,
              borderRadius: 12,
              width: '90%',
              maxHeight: '70%',
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: 10,
                color: '#000',
              }}
            >
              {categoriaSelecionada.toUpperCase()} - Histórico
            </Text>

            {historicoAtual.map((item) => (
              <View
                key={item.id}
                style={{
                  backgroundColor: '#fff',
                  padding: 12,
                  borderRadius: 8,
                  marginBottom: 8,
                  borderWidth: 1,
                  borderColor: '#ccc',
                }}
              >
                <Text style={{ color: '#000', fontWeight: 'bold' }}>{item.tempo}</Text>
                <Text style={{ color: '#000' }}>{item.status}</Text>
              </View>
            ))}

            <TouchableOpacity onPress={() => setModalHistoricoVisible(false)} style={{ marginTop: 10 }}>
              <Text style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal Adicionar Desafios*/}
      <Modal visible={modalAdicionarVisible} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View style={{ backgroundColor: '#FFF6C7', padding: 20, borderRadius: 12, width: '90%' }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: 10,
                color: '#000',
              }}
            >
              Adicionar Desafio
            </Text>

            <Text style={{ fontWeight: 'bold', color: '#000' }}>Selecione a categoria:</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginVertical: 10,
              }}
            >
              {['diário', 'semanal', 'mensal'].map((cat) => (
                <TouchableOpacity
                  key={cat}
                  onPress={() => {
                    setCategoriaNovoDesafio(cat);
                    setTempoNovoDesafio(null);
                  }}
                  style={{
                    backgroundColor: categoriaNovoDesafio === cat ? '#216943' : '#FDC91A',
                    padding: 8,
                    borderRadius: 8,
                  }}
                >
                  <Text style={{ color: '#000', fontWeight: 'bold' }}>{cat.toUpperCase()}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {categoriaNovoDesafio && (
              <>
                <Text style={{ fontWeight: 'bold', color: '#000' }}>Selecione o tempo:</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-around',
                    marginVertical: 10,
                  }}
                >
                  {opcoesPorCategoria[categoriaNovoDesafio].map((opcao) => (
                    <TouchableOpacity
                      key={opcao}
                      onPress={() => setTempoNovoDesafio(opcao)}
                      style={{
                        backgroundColor: tempoNovoDesafio === opcao ? '#216943' : '#FDC91A',
                        padding: 8,
                        borderRadius: 8,
                        marginVertical: 5,
                      }}
                    >
                      <Text style={{ color: '#000' }}>{opcao}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}

            <TouchableOpacity
              style={{
                backgroundColor: '#216943',
                paddingVertical: 10,
                borderRadius: 8,
                marginTop: 10,
              }}
              onPress={adicionarDesafio}
            >
              <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>
                Salvar Desafio
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setModalAdicionarVisible(false);
                setCategoriaNovoDesafio(null);
                setTempoNovoDesafio(null);
              }}
              style={{ marginTop: 10 }}
            >
              <Text style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
