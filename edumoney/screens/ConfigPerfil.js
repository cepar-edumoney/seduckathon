import React, { useState, useEffect } from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Modal,Pressable,} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PerfilScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [nome, setNome] = useState('Aluno');
  const [email, setEmail] = useState('aluno@gmail.com');

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const dadosSalvos = await AsyncStorage.getItem('@perfil_usuario');
        if (dadosSalvos) {
          const { nome, email } = JSON.parse(dadosSalvos);
          setNome(nome);
          setEmail(email);
        }
      } catch (error) {
        console.log('Erro ao carregar dados do perfil:', error);
      }
    };

    const unsubscribe = navigation.addListener('focus', carregarDados);
    return unsubscribe;
  }, [navigation]);

  const handleLogout = () => {
    setModalVisible(false);
    navigation.navigate('Welcome');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back-outline" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Perfil</Text>
      </View>

      {/* Cartão com nome e e-mail */}
      <View style={styles.profileCard}>
        <Ionicons name="person-circle" size={48} color="#000" />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{nome}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <MaterialIcons name="logout" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Botão de editar perfil */}
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('EditarPerfil')}
      >
        <Ionicons name="person-outline" size={20} color="#000" />
        <View style={styles.editTextContainer}>
          <Text style={styles.editTitle}>Editar Perfil</Text>
          <Text style={styles.editSubtitle}>Deixe sua conta do seu jeito</Text>
        </View>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Sair da conta?</Text>
            <Text style={styles.modalMessage}>
              Tem certeza que deseja sair?
            </Text>

            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalButton, { backgroundColor: '#ccc' }]}
                onPress={() => setModalVisible(false)}
              >
                <Text>Cancelar</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, { backgroundColor: '#D95349' }]}
                onPress={handleLogout}
              >
                <Text style={{ fontWeight: 'bold' }}>Sair</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff9c4',
    paddingHorizontal: 0,
  },
  header: {
    backgroundColor: '#FDC91A',
    paddingTop: 50,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    width: '100%',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 50,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  profileCard: {
    backgroundColor: '#fff8dc',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginTop: 20,
    marginHorizontal: 20,
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    color: '#333',
  },
  editButton: {
    backgroundColor: '#ffca28',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 10,
    marginTop: 20,
    marginHorizontal: 20,
  },
  editTextContainer: {
    marginLeft: 12,
  },
  editTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  editSubtitle: {
    fontSize: 13,
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000066',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 14,
    marginBottom: 20,
    color: '#333',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    padding: 12,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
});
