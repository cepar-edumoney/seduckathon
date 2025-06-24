import React, { useState } from 'react';
import {View,Text,TouchableOpacity,ScrollView,Modal,StyleSheet,Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createStyles } from '../styles/globalStyles';

export default function RendaFixaScreen({ navigation }) {
  const styles = createStyles();

  const allQuestions = [
    'Quanto você entende sobre Tesouro Direto?',
    'Qual seu conhecimento sobre CDB?',
    'Você sabe o que é LCI/LCA?',
    'Você entende a diferença entre renda fixa e variável?',
    'Você sabe o que significa rentabilidade pós-fixada?',
    'Você conhece os riscos de crédito da renda fixa?',
    'Você já investiu em Tesouro IPCA?',
    'Você sabe como funciona o CDB com liquidez diária?',
    'Você entende o que é risco de liquidez?',
    'Você acompanha a taxa Selic e o CDI?',
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
      Alert.alert(
        'Atenção',
        'Por favor, responda todas as perguntas antes de finalizar.',
        [{ text: 'OK' }]
      );
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
        <Ionicons name="arrow-up-outline" size={36} color="#000" style={{ transform: [{ rotate: '45deg' }] }} />
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
        <Text style={styles.subtitleInline}>O que é Renda Fixa?</Text>
        <Text style={styles.paragraph}>
          A Renda Fixa é um tipo de investimento em que as regras de rendimento são definidas no momento da aplicação ou seguem um índice (como o CDI). Você sabe, desde o início, quanto irá receber ou tem uma boa previsão.
        </Text>

        <Text style={styles.subtitleInline}>Como Funciona?</Text>
        <Text style={styles.paragraph}>
          Ao investir, você empresta seu dinheiro para instituições (bancos, empresas ou governo), que devolvem com juros após determinado tempo.
        </Text>

        <Text style={styles.subtitleInline}>Características</Text>
        <Text style={styles.paragraph}>
          • Rentabilidade estável e previsível.{"\n"}
          • Menor risco que renda variável.{"\n"}
          • Ideal para segurança e planejamento.
        </Text>

        <Text style={styles.subtitleInline}>Vantagens</Text>
        <Text style={styles.paragraph}>
          • Reserva de emergência.{"\n"}
          • Metas de curto e médio prazo.{"\n"}
          • Proteção contra oscilações do mercado.
        </Text>

        <Text style={styles.subtitleInline}>Tipos de Renda Fixa</Text>
        <Text style={styles.paragraph}>
          • Tesouro Direto: Títulos emitidos pelo governo, considerados os mais seguros.{"\n"}
          • CDB: Emitido pelos bancos, com risco ligado à instituição.{"\n"}
          • LCI e LCA: Letras de Crédito Imobiliário e do Agronegócio, isentas de IR.{"\n"}
          • Debêntures: Títulos de empresas, com retorno maior, mas mais arriscados.
        </Text>

        <Text style={styles.subtitleInline}>Rentabilidade</Text>
        <Text style={styles.paragraph}>
          • Prefixada: Taxa fixa desde o início.{"\n"}
          • Pós-fixada: Atrelada a um índice (Selic ou CDI).{"\n"}
          • Híbrida: Combina uma taxa fixa com a inflação (IPCA).
        </Text>

        <Text style={styles.subtitleInline}>Riscos da Renda Fixa</Text>
        <Text style={styles.paragraph}>
          • Risco de Crédito: A instituição não conseguir pagar.{"\n"}
          • Risco de Mercado: Oscilação nas taxas de juros.{"\n"}
          • Risco de Liquidez: Dificuldade de resgatar antes do vencimento.
        </Text>

        <Text style={styles.subtitleInline}>Conclusão</Text>
        <Text style={styles.paragraph}>
          A Renda Fixa é ideal para quem busca segurança, estabilidade e planejamento. É essencial para reservas de emergência e metas de curto ou médio prazo, protegendo seu patrimônio contra oscilações do mercado.
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
    fontSize: 25,
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
