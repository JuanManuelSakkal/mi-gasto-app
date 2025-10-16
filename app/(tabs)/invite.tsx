import CustomButton from '@/components/CustomButton';
import CustomInput from '@/components/CustomInput';

import { useAuth } from '@/context/AuthContext';
import { useLoading } from '@/context/LoadingContext';
import { Home, useUser } from '@/context/UserContext';
import { sendEmail } from '@/utils/EmailSender';
import { inviteEmailTemplate } from '@/utils/htmlTemplates';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SelectHomeDialog from '../../components/SelectHomeDialog';
import { useSuccessAnimation } from '../../context/SuccessAnimationContext';
import { createInvite } from '../../services/SupaBaseService';
import { generateRandomCode } from '../../utils/RandomCodeGenerator';
export default function InviteScreen() {
  const { user, userName } = useAuth();
  const { setLoading } = useLoading();
  const { setSuccessAnimation } = useSuccessAnimation();
  const { homes, selectedHome: globalSelectedHome } = useUser();
  const [ selectedHome, setSelectedHome ] = useState<Home>(globalSelectedHome);
  const [email, setEmail] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setSelectedHome(globalSelectedHome);
  }, [globalSelectedHome]);
  
  const handleInvite = async () => {
    if(!selectedHome || !user) return;
    setLoading(true);
    const inviteCode = generateRandomCode().toString();
    createInvite(selectedHome.id, inviteCode, email, user.id).then( result => {
      if(result.error || !result.data) {
        return
      } else {
        const inviteHtml = inviteEmailTemplate(userName, selectedHome.name, inviteCode, 'http://localhost:3000/invite?token=' + result.data[0].id);
        sendEmail(email, userName + " te ha invitado a Mi Gasto: app de gestión de gastos", inviteHtml).then( error => {
            setLoading(false);
            if(!error) {
              setSuccessAnimation(true);
            }
          });
      }
    })

  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSelect = (home: Home) => {
    setSelectedHome(home);
    setMenuOpen(false);
  };  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Invitar al hogar</Text>
      <CustomButton title={selectedHome ? selectedHome.name : "Seleccionar hogar"}
                    handlePress={toggleMenu} extraStyles={{ width: '100%' }} />
      <CustomInput placeholder="Email" onChangeText={setEmail} extraStyles={{ width: '100%' }} />
      <CustomButton title="Invitar" handlePress={handleInvite} extraStyles={{ width: '100%' }} />
      <SelectHomeDialog title="Seleccionar Hogar" menuOpen={menuOpen} toggleMenu={toggleMenu} handleSelect={handleSelect} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  title: {
    fontSize: 36,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  }
});
