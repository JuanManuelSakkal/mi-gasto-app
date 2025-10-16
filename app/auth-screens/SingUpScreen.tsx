import { AuthStackParamList } from '@/app/navigation/AuthStack';
import CustomButton from '@/components/CustomButton';
import { Snackbar } from "@react-native-material/core";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { createUser } from '../../services/SupaBaseService';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;
export default function SignupScreen( { navigation }: Props ) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>("");
  const [name, setName] = useState('');

  const handleSignup = async () => {
    const error = await createUser(email, password, name);
    if (error) setError(error.message);
  };

  const handleGoBack = () => {
    navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear cuenta</Text>
      <TextInput placeholder="Nombre" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Contraseña" secureTextEntry value={password} onChangeText={setPassword} style={styles.input} />
 

      <CustomButton title="Registrarme" handlePress={handleSignup} />
      
      
      <TouchableOpacity onPress={handleGoBack} style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
        <Text style={styles.link}>Ya tengo cuenta</Text>
      </TouchableOpacity>
      
      {error && <TouchableOpacity onPress={() => setError(null)} style={{position: 'absolute', bottom: 10, left: 10, right: 10 }} >
                  <Snackbar message={error}
                            style={{ backgroundColor: 'red'}} 
                  />
                </TouchableOpacity>
      }

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 36, marginBottom: 20, textAlign: 'center', fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 15, marginBottom: 10, borderRadius: 10, fontSize: 16 },
  link: {color: '#4f46e5'},
  text: {}
});