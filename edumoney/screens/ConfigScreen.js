
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createStyles } from '../styles/globalStyles';

export default function ConfigScreen({ navigation }) {
  const styles = createStyles();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{ position: 'absolute', left: 20, top: 50 }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Ionicons name="settings-outline" size={36} color="#000" />
      </View>

      {/* Nome EduMoney estilizado */}
      <View style={{ marginTop: 60, alignItems: 'center', paddingHorizontal: 20 }}>
        <Text
          style={{
            fontSize: 36,
            fontWeight: '900',
            fontStyle: 'italic',
            textAlign: 'center',
          }}
        >
          <Text style={{ color: '#11630C' }}>Edu</Text>
          <Text style={{ color: '#2061EE' }}>Money</Text>
        </Text>

        <Text
          style={{
            marginTop: 20,
            fontSize: 16,
            color: '#000',
            textAlign: 'justify',
            lineHeight: 24,
          }}
        >
          O EduMoney é um aplicativo educativo que ensina alunos a cuidar do próprio
          dinheiro (como o “pé de meia”) de forma simples e prática. Ele simula
          investimentos, ajuda a criar metas e oferece conteúdos e desafios sobre finanças.
          A ideia é ensinar a importância de poupar e investir desde cedo, de forma
          divertida e acessível.
        </Text>

        {/* Chat IA */}
        <Ionicons
          name="chatbubbles-outline"
          size={60}
          color="#000"
          style={{ marginTop: 20 }}
        />
        <Text
          style={{
            marginTop: 10,
            fontSize: 16,
            color: '#000',
            textAlign: 'justify',
            lineHeight: 24,
          }}
        >
          <Text style={{ fontWeight: 'bold' }}>Chat IA:</Text> é uma funcionalidade
          integrada ao EduMoney que atua como um assistente virtual personalizado,
          projetado para orientar os alunos sobre como usar de forma inteligente o dinheiro
          que recebem, seja mesada, presente ou renda de pequenos trabalhos.
        </Text>

        {/* Meu Dinheiro */}
        <Ionicons
          name="wallet-outline"
          size={60}
          color="#000"
          style={{ marginTop: 25 }}
        />
        <Text
          style={{
            marginTop: 10,
            fontSize: 16,
            color: '#000',
            textAlign: 'justify',
            lineHeight: 24,
          }}
        >
          <Text style={{ fontWeight: 'bold' }}>Meu Dinheiro:</Text> é o espaço onde o
          aluno visualiza, organiza e acompanha toda a movimentação do seu dinheiro, seja
          ele simulado ou real. É aqui que ele aprende a gerenciar suas finanças de forma
          prática, consciente e organizada, desenvolvendo habilidades essenciais como
          planejamento, poupança e investimento.
        </Text>

        {/* Metas */}
        <Ionicons
          name="rocket-outline"
          size={60}
          color="#000"
          style={{ marginTop: 25 }}
        />
        <Text
          style={{
            marginTop: 10,
            fontSize: 16,
            color: '#000',
            textAlign: 'justify',
            lineHeight: 24,
          }}
        >
          <Text style={{ fontWeight: 'bold' }}>Metas:</Text> permitem que o aluno defina
          objetivos financeiros, como comprar algo ou economizar para o futuro. Ele pode
          criar metas de investimento, determinar o valor desejado e o prazo, e acompanhar
          o progresso. A plataforma mostra quanto já foi investido e quanto falta para
          alcançar o objetivo.
        </Text>

        {/* Desafios */}
        <Ionicons
          name="trophy-outline"
          size={60}
          color="#000"
          style={{ marginTop: 25 }}
        />
        <Text
          style={{
            marginTop: 10,
            fontSize: 16,
            color: '#000',
            textAlign: 'justify',
            lineHeight: 24,
          }}
        >
          <Text style={{ fontWeight: 'bold' }}>Desafios:</Text> são missões que estimulam
          o aluno a poupar e investir de forma divertida. Existem desafios diários,
          semanais e mensais, cada um com metas e recompensas. Ao cumprir os desafios, o
          aluno desenvolve disciplina financeira, aprendendo na prática como alcançar seus
          objetivos e administrar melhor o seu dinheiro.
        </Text>

        {/* Informações */}
        <Ionicons
          name="information-circle-outline"
          size={60}
          color="#000"
          style={{ marginTop: 25 }}
        />
        <Text
          style={{
            marginTop: 10,
            fontSize: 16,
            color: '#000',
            textAlign: 'justify',
            lineHeight: 24,
          }}
        >
          <Text style={{ fontWeight: 'bold' }}>Informações:</Text> é a central de
          aprendizado do EduMoney. Nela, o aluno encontra conteúdos educativos sobre
          investimentos, finanças e organização do dinheiro. As informações são simples,
          claras e práticas, ajudando o aluno a entender conceitos financeiros, tomar
          decisões conscientes e construir uma base sólida de educação financeira para a
          vida toda. 
        </Text>
      </View>
    </ScrollView>
  );
}
