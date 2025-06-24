import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
  Pressable,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  const buttons = [
    { label: 'Chat IA', route: 'Chat', icon: 'chatbubbles-outline' },
    { label: 'Meu Dinheiro', route: 'MeuDinheiro', icon: 'wallet-outline' },
    { label: 'Metas', route: 'Metas', icon: 'rocket-outline' },
    { label: 'Desafios', route: 'Desafios', icon: 'trophy-outline' },
    { label: 'Informações', route: 'Info', icon: 'information-circle-outline' },
    { label: 'Configurações', route: 'Config', icon: 'settings-outline' },
  ];

  const handleLogout = () => {
    setModalVisible(false);
    navigation.replace('Welcome');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => setModalVisible(true)}
      >
        <MaterialIcons name="logout" size={25} color="#000" />  
      </TouchableOpacity>

      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('ConfigPerfil')}>
          <Ionicons name="person-circle-outline" size={95} color="#000" />
        </TouchableOpacity>
        <Text style={styles.userName}>Aluno</Text>
      </View>

      {/* Botões */}
      <View style={styles.gridContainer}>
        {buttons.map((btn) => (
          <TouchableOpacity
            key={btn.route}
            style={styles.squareButton}
            onPress={() => navigation.navigate(btn.route)}
          >
            <Ionicons name={btn.icon} size={32} color="#000" style={{ marginBottom: 10 }} />
            <Text style={styles.buttonText}>{btn.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/*  Modal de Sair */}
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
                <Text style={{ fontWeight: 'bold', color: '#fff' }}>Sair</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const screenWidth = Dimensions.get('window').width;
const buttonSize = (screenWidth - 80) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF6C7',
    alignItems: 'center',
    paddingTop: 60,
  },
  logoutButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    marginBottom: 40,
    gap: 10,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
    marginTop: 20,
  },
  squareButton: {
    width: buttonSize,
    height: buttonSize,
    backgroundColor: '#FDC91A',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    padding: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    width: '85%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
});
