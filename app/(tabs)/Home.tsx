import CustomButton from '@/app/components/CustomButton';
import HomeView from '@/app/components/HomeView';
import NewHomeModal from '@/app/components/NewHomeModal';
import { useAuth } from '@/app/context/AuthContext';
import { useLoading } from '@/app/context/LoadingContext';
import { useUser } from '@/app/context/UserContext';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Expense } from '../components/NewExpenseModal';
import { createUserHome } from '../services/SupaBaseService';

export default function HomeScreen() {
  const { user } = useAuth();
  const { selectedHome, setSelectedHome, homes, setHomes } = useUser();
  const [homeName, setHomeName] = useState('');
  const [homeId, setHomeId] = useState('');
  const [newHomeModalVisible, setNewHomeModalVisible] = useState(false);
  const {loading, setLoading} = useLoading();
  const [homeExpenses, setHomeExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    if(!selectedHome) return;
    setHomeName(selectedHome.name);
    setHomeId(selectedHome.id);

  }, [selectedHome]);

  const handleCreateHome = (name: string) => {
    console.log("calling handleCreateHome");
      if(!user) return
      
      setNewHomeModalVisible(false);
      setLoading(true);
      createUserHome(user.id, name).then( result => {
          if(!result?.error) {
            
            setHomeName(name);
            setHomeId(result.homeId);
            setHomes([...homes, {id: result.homeId, name}]);
            setSelectedHome({id: result.homeId, name});
          };
          setLoading(false);
      });
      

  }


  return (
    <>
      {  
        homeId &&
        <>
        <HomeView home={{id: homeId, name: homeName}}></HomeView>
        </>
      }
      {    
        !homeId && !loading &&
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.h3}>Parece que aún no formás parte de ningún hogar</Text>
          <CustomButton title="Crear hogar" handlePress={() => {setNewHomeModalVisible(true)}} />
        </View>
      }
      <NewHomeModal visible={newHomeModalVisible} setVisible={setNewHomeModalVisible} handleCreate={handleCreateHome} />

    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: { fontSize: 36, marginBottom: 20, textAlign: 'center', fontWeight: 'bold' },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  h3: { fontSize: 24, marginBottom: 20, textAlign: 'center', fontWeight: 'bold' },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
