import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createStyles } from '../styles/globalStyles';

export default function RendaVariavelScreen({ navigation }) {
  const styles = createStyles();

  const allQuestions = [
    'Você sabe o que são ações?',
    'Você entende o que é um fundo imobiliário (FII)?',
    'Você conhece a diferença entre swing trade e day trade?',
    'Você sabe o que é dividend yield?',
    'Você entende o conceito de volatilidade?',
    'Você já ouviu falar de ETF?',
    'Você conhece os riscos de investir em ações?',
    'Você sabe como funciona o mercado de opções?',
    'Você entende o papel da análise fundamentalista?',
    'Você acompanha o índice Ibovespa?',
  ];

  const getRandomQuestions = () => {
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [resultModalVisible, setResultModalVisible] = useState(false);
  const [answers, setAnswers] = useState([null, null, null, null, null]);
  const [currentQuestions, setCurrentQuestions] = useState(getRandomQuestions());
  const [average, setAverage] = useState(0);

  const selectAnswer = (questionIndex, option) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = option;
    setAnswers(newAnswers);
  };

  const calculateAverage = () => {
    const total = answers.reduce((sum, val) => sum + (val || 0), 0);
    return (total / answers.length).toFixed(1);
  };

  const finalizeTest = () => {
    if (answers.some(answer => answer === null)) {
      Alert.alert('Atenção', 'Responda todas as perguntas antes de finalizar.', [{ text: 'OK' }]);
      return;
    }
    const avg = calculateAverage();
    setAverage(avg);
    setResultModalVisible(true);
  };

  const closeResultModal = () => {
    setModalVisible(false);
    setResultModalVisible(false);
    setAnswers([null, null, null, null, null]);
    setCurrentQuestions(getRandomQuestions());
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
        <Ionicons name="trending-up" size={36} color="#000" />
      </View>

      {/* Botão Teste */}
      <TouchableOpacity
        style={{
          backgroundColor: '#FDC91A',
          paddingVertical: 14,
          paddingHorizontal: 30,
          borderRadius: 10,
          alignItems: 'center',
          alignSelf: 'center',
          marginTop: 20,
          marginBottom: 20,
        }}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }}>
          Teste
        </Text>
      </TouchableOpacity>

      <View style={{ padding: 20 }}>
        <Text style={styles.subtitleInline}>O que é Renda Variável?</Text>
        <Text style={styles.paragraph}>
          Renda Variável é o tipo de investimento cujo retorno não é previsível. Os ativos sofrem influência direta de fatores do mercado, podendo variar com frequência.
        </Text>

        <Text style={styles.subtitleInline}>Exemplos de Ativos</Text>
        <Text style={styles.paragraph}>
          • Ações de empresas{"\n"}
          • Fundos Imobiliários (FIIs){"\n"}
          • ETFs{"\n"}
          • Opções{"\n"}
          • BDRs (recibos de ações estrangeiras)
        </Text>

        <Text style={styles.subtitleInline}>Vantagens</Text>
        <Text style={styles.paragraph}>
          • Potencial de altos retornos{"\n"}
          • Diversificação de carteira{"\n"}
          • Participação nos lucros das empresas (dividendos)
        </Text>

        <Text style={styles.subtitleInline}>Riscos</Text>
        <Text style={styles.paragraph}>
          • Alta volatilidade{"\n"}
          • Perda do capital investido{"\n"}
          • Influência de fatores econômicos, políticos e internacionais
        </Text>

        <Text style={styles.subtitleInline}>Perfil Recomendado</Text>
        <Text style={styles.paragraph}>
          Investidores com perfil mais arrojado, com tolerância ao risco e foco em médio/longo prazo.
        </Text>

        <Text style={styles.subtitleInline}>Conclusão</Text>
        <Text style={styles.paragraph}>
          A Renda Variável pode ser uma excelente forma de aumentar o patrimônio no longo prazo, mas exige conhecimento, estratégia e controle emocional.
        </Text>
      </View>

      <Modal visible={modalVisible} animationType="slide">
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <Text style={modalStyles.title}>Questionário</Text>
          <Text style={modalStyles.subtitle}> Atenção: para responder cada pergunta, selecione apenas uma das opções disponíveis: 1, 2 ou 3.</Text>
          {currentQuestions.map((question, index) => (
            <View key={index} style={modalStyles.questionBlock}>
              <Text style={modalStyles.question}>{question}</Text>
              <View style={modalStyles.optionsRow}>
                {[1, 2, 3].map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      modalStyles.optionCircle,
                      {
                        backgroundColor:
                          answers[index] === option ? '#4CAF50' : '#FDC91A',
                      },
                    ]}
                    onPress={() => selectAnswer(index, option)}
                  >
                    <Text style={modalStyles.optionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}

          <TouchableOpacity
            style={modalStyles.closeButton}
            onPress={finalizeTest}
          >
            <Text style={{ fontWeight: 'bold' }}>Finalizar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={modalStyles.cancelButton}
          >
            <Text style={modalStyles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
      
      <Modal visible={resultModalVisible} transparent animationType="fade">
        <View style={modalStyles.resultOverlay}>
          <View style={modalStyles.resultBox}>
            <Text style={modalStyles.resultText}>
              Sua média de conhecimento: {average}
            </Text>
            <TouchableOpacity
              onPress={closeResultModal}
              style={modalStyles.closeButton}
            >
              <Text style={{ fontWeight: 'bold' }}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const modalStyles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
   subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'justify',
  },
  questionBlock: {
    marginBottom: 30,
    alignItems: 'center',
  },
  question: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
  },
  optionCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  optionText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#FDC91A',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  cancelButton: {
    marginTop: 15,
    alignItems: 'center',
  },
  cancelText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultBox: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  resultText: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
});
