import { StyleSheet } from 'react-native';

export const createStyles = () => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF6C7',
  },
  header: {
    backgroundColor: '#FDC91A',
    paddingTop: 50, // espaço superior (para afastar do topo)
    paddingBottom: 20, // espaço inferior (deixa mais alto)
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4, // sombra leve se desejar
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,  
  },
  buttonPrimary: {
    backgroundColor: '#216943',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonPrimaryText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  buttonHome: {
    backgroundColor: '#FDC91A',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonHomeText: {
    fontWeight: 'bold',
    color: '#000',
  },
  link: {
    color: '#216943',
    marginTop: 12,
    fontSize: 14,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitleInline: {
  fontWeight: 'bold',
  color: '#000',
  fontSize: 16,
},
  paragraph: {
    fontSize: 16,
    color: '#000',
    lineHeight: 22,
    marginBottom: 12,
    textAlign: 'justify',  // ✅ Alinhamento justificado
  },
});
