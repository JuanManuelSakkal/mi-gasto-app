import CustomButton from "@/app/components/CustomButton";
import { AuthStackParamList } from "@/app/navigation/AuthStack";
import { Snackbar } from "@react-native-material/core";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { authUser } from "../services/SupaBaseService";


type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>("");

  const handleLogin = async () => {
    const error = await authUser(email, password);
    
    if (error) setError(error.message);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Contraseña" secureTextEntry value={password} onChangeText={setPassword} style={styles.input} />

      
      <CustomButton title="Ingresar" handlePress={handleLogin} />
      
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
        <Text style={{ marginRight: 5}}>¿No tienes cuenta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')} >
                  <Text style={styles.link}>Registrate</Text>
        </TouchableOpacity>
      </View>
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
  container: { flex: 1, justifyContent: 'center', padding: 20, height: '100%' },
  title: { fontSize: 36, marginBottom: 20, textAlign: 'center', fontWeight: 'bold' },
  link: {color: '#4f46e5'},
  input: { borderWidth: 1, borderColor: '#ccc', padding: 15, marginBottom: 10, borderRadius: 10, fontSize: 16},
});