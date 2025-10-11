import Moment from 'moment';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import { useLoading } from '../context/LoadingContext';
import { useSuccessAnimation } from '../context/SuccessAnimationContext';
import { createExpense, getExpensesByHome, getUsersByHome } from '../services/SupaBaseService';
import { generateRandomHexColor } from '../utils/RandomColorGenerator';
import Header from './Header';
import MainSpeedDial from './MainSpeedDial';
import NewExpenseModal, { Expense as NewExpense } from './NewExpenseModal';
import SimpleCard from './SimpleCard';
import ThreeCellTable from './ThreeCellTable';



interface HomeViewProps {
    homeName: string;
    homeId: string;
}

interface User {
    id: string;
    name: string;
}

interface Expense {
    id: string;
    name: string;
    payer: string;
    description: string;
    method: string;
    category: string;
    amount: number;
    created_at: string;
}

interface UserColors {
    [key: string]: string
}

interface MemberExpenses {
    [key: string]: Expense[]
}

export default function HomeView({ homeName, homeId }: HomeViewProps) {
    const { user } = useAuth();
    const { setSuccessAnimation } = useSuccessAnimation();
    const [members, setMembers] = useState<User[]>([]);
    const {setLoading} = useLoading();
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [memberExpenses, setMemberExpenses] = useState<MemberExpenses>({});
    const [newExpenseModalVisible, setNewExpenseModalVisible] = useState(false);
    const [userColors, setUserColors] = useState<UserColors>({});
    useEffect(() => {
        setLoading(true);
        getUsersByHome(homeId).then(data => {
            if(!data) return
            setMembers(data);
            const colors: UserColors = {};
            data.forEach(user => {
                colors[user.name] = generateRandomHexColor();
            });
            setUserColors(colors);
            setLoading(false);
        }); 
    }, [homeId]);

    useEffect(() => {
        fetchExpenses();
    }, [homeId]);

    useEffect(() => {
        const memberExpenses: MemberExpenses = {};
            expenses.forEach(expense => {
                const userId = members.find(member => member.name === expense.payer)?.id;
                if(!userId) return
                if(!memberExpenses[userId]) {
                    memberExpenses[userId] = [];
                }
                memberExpenses[userId].push(expense);
            });
            console.log(memberExpenses);
            setMemberExpenses(memberExpenses);
    }, [expenses, members]);

    function fetchExpenses() {
        setLoading(true);
        getExpensesByHome(homeId).then(data => {
            console.log("expenses data: ", data);
            if(!data) return
            setExpenses(data.map((expense) => {
                return {
                    id: expense.id,
                    name: expense.name,
                    payer: expense.profiles.name,
                    description: expense.description,
                    method: expense.payment_method.name,
                    category: expense.category.name,
                    amount: expense.amount,
                    created_at: Moment(expense.created_at).format('DD/MM/YYYY HH:mm')
                }
            }));
            setLoading(false);
        })
    }


    
      const handleCreateExpense = (newExpense: NewExpense) => {
        console.log("calling handleCreateExpense");
        if(!user) return
        setNewExpenseModalVisible(false);
        setLoading(true);
        createExpense(user.id, homeId, newExpense).then(error => {
          setLoading(false);
          if(!error) {
            setSuccessAnimation(true);
            fetchExpenses();
          }

        });
    
      }

    return (
        <SafeAreaView style={styles.container}>
            <Header title={homeName} />
            <View style={styles.subTitleContainer}>
                <SimpleCard title="Gastos del mes del hogar" text={"$" + expenses.reduce((total, expense) => total + expense.amount, 0).toLocaleString("es-AR")} />
                <SimpleCard title="Gastos del mes personales" 
                            text={"$" + (user && memberExpenses[user.id] ? memberExpenses[user.id].reduce((total, expense) => total + expense.amount, 0).toLocaleString("es-AR") : "0")} />
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.gastosContainer}>
                
                <ThreeCellTable title="Gastos recientes" data={expenses.map(expense => [expense.payer, userColors[expense.payer], 
                                                                                expense.name, expense.category,
                                                                                "$" + expense.amount.toLocaleString("es-AR")])} />
                
                </View>
                
            </View>
            
            <MainSpeedDial handlePress={() => {setNewExpenseModalVisible(true)}} />
            <NewExpenseModal visible={newExpenseModalVisible} setVisible={setNewExpenseModalVisible} handleCreate={handleCreateExpense} />
            
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    gastosContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleContainer: {
        backgroundColor: '#4f46e5',
        marginTop: 20,
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'white',
    },
    subTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    contentContainer: {
        flexDirection: 'column',
        flex: 10,
        width: '100%',
    },
    cardContent: {
        flexDirection: 'column',
        flex: 1,
    }
});