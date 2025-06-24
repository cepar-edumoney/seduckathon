import React, { useState, useEffect } from 'react';
import {View,Text,TextInput,TouchableOpacity,KeyboardAvoidingView,Platform,ScrollView,StyleSheet,Dimensions,Keyboard,Image,TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createStyles } from '../styles/globalStyles';

const { width, height } = Dimensions.get('window');

export default function ChatScreen({ navigation }) {
  const styles = createStyles();
  const [input, setInput] = useState('');
  const [mensagens, setMensagens] = useState([
    {
      de: 'ia',
      texto:
        'Olá, eu sou o Edu! A IA que vai te orientar no uso consciente do dinheiro que você recebe. Estou aqui para te ajudar a entender melhor como organizar suas finanças, planejar seus gastos e fazer escolhas inteligentes com o que você tem.',
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [tecladoVisivel, setTecladoVisivel] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => setTecladoVisivel(true));
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => setTecladoVisivel(false));

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const enviarPergunta = () => {
    if (!input.trim()) return;

    const perguntaUsuario = { de: 'user', texto: input };
    setMensagens((prev) => [...prev, perguntaUsuario]);
    setInput('');
    setLoading(true);
    Keyboard.dismiss();

    setTimeout(() => {
      let resposta = '';
      const pergunta = perguntaUsuario.texto.toLowerCase();

      if (pergunta.includes('renda fixa')) {
        resposta =
          '📚 Renda Fixa é um tipo de investimento onde você já sabe, no momento da aplicação, como será a rentabilidade ou qual será a regra para calculá-la. Ela é considerada mais segura e previsível.\n\nExemplos:\n- CDB\n- Tesouro Direto\n- LCI e LCA\n\nEsses investimentos são indicados principalmente para quem quer segurança e construir uma reserva financeira.';
      } else if (pergunta.includes('renda variável')) {
        resposta =
          '📊 Renda Variável é um tipo de investimento onde os ganhos não são previsíveis. Ou seja, você pode ganhar mais, mas também pode perder dinheiro.\n\nExemplos de renda variável:\n- Ações na Bolsa\n- Fundos Imobiliários (FIIs)\n- ETFs (fundos de índice)\n\nEsse tipo de investimento é indicado para quem busca maiores ganhos a longo prazo e aceita correr riscos.';
      } else if (pergunta.includes('investimento') || pergunta.includes('investir')) {
        resposta =
          'Investir é uma forma inteligente de fazer o dinheiro crescer ao longo do tempo. Em vez de deixar o dinheiro parado, você o coloca em ativos como renda fixa, ações ou fundos, que podem gerar retorno.';
      } else if (pergunta.includes('educação financeira')) {
        resposta =
          'Educação financeira é aprender a cuidar bem do dinheiro. Isso inclui entender quanto se ganha, quanto se gasta, como economizar, evitar dívidas e fazer escolhas que ajudam no presente e no futuro.';
      } else {
        resposta =
          '❗ Eu só posso responder perguntas sobre educação financeira. Pergunte algo sobre dinheiro, investimentos ou organização financeira.';
      }

      setMensagens((prev) => [...prev, { de: 'ia', texto: resposta }]);
      setLoading(false);
    }, 1500);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={estilos.container}
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={{ position: 'absolute', left: 20, top: 50 }}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Ionicons name="chatbubbles-outline" size={36} color="#000" />
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: width * 0.05, paddingBottom: 120 }}
          keyboardShouldPersistTaps="handled"
        >
          {mensagens.map((msg, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                marginBottom: 10,
                justifyContent: msg.de === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              {msg.de !== 'user' && (
                <Image
                  source={require('../assets/mascote2.png')}
                  style={{ width: 30, height: 30, marginRight: 8 }}
                />
              )}

              <View
                style={[
                  estilos.mensagem,
                  msg.de === 'user' ? estilos.mensagemUser : estilos.mensagemIA,
                ]}
              >
                <Text style={estilos.mensagemTexto}>{msg.texto}</Text>
              </View>

              {msg.de === 'user' && (
                <Image
                  source={require('../assets/perfil.png')}
                  style={{
                    width: 30,
                    height: 30,
                    marginLeft: 8,
                    borderRadius: 15,
                  }}
                />
              )}
            </View>
          ))}

          {loading && (
            <Text style={{ color: '#216943', marginTop: 10 }}>
              Digitando resposta...
            </Text>
          )}
        </ScrollView>

        {/* Texto acima do teclado */}
        {tecladoVisivel && input.length > 0 && (
          <View style={estilos.barraDigitacao}>
            <Text style={estilos.textoDigitacao}>{input}</Text>
          </View>
        )}

        {/* Área de digitação*/}
        <View style={estilos.inputArea}>
          <TextInput
            style={estilos.input}
            placeholder="Digite sua pergunta..."
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity style={estilos.sendButton} onPress={enviarPergunta}>
            <Ionicons name="send" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF6C7',
  },
  mensagem: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  mensagemUser: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  mensagemIA: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  mensagemTexto: {
    fontSize: 16,
    color: '#000',
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.045,
    backgroundColor: '#FFF6C7',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.015,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: width * 0.045,
  },
  sendButton: {
    backgroundColor: '#216943',
    marginLeft: 8,
    padding: width * 0.03,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  barraDigitacao: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: Platform.OS === 'ios' ? 70 : 60,
    backgroundColor: '#e6e6e6',
    padding: 8,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  textoDigitacao: {
    fontSize: 16,
    color: '#333',
  },
});
