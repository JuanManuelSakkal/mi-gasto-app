import Moment from 'moment';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import { useLoading } from '../context/LoadingContext';
import { useSuccessAnimation } from '../context/SuccessAnimationContext';
import { Home } from '../context/UserContext';
import { createExpense, createIncome, getExpensesByHome, getIncomesByHome, getUsersByHome } from '../services/SupaBaseService';
import { generateRandomHexColor } from '../utils/RandomColorGenerator';
import ExpensesIncomeTabs from './ExpensesIncomeTabs';
import Header from './Header';
import MainSpeedDial from './MainSpeedDial';
import MonthOveralls from './MonthOveralls';
import NewExpenseModal, { Expense as NewExpense } from './NewExpenseModal';
import NewIncomeModal, { Income as NewIncome } from './NewIncomeModal';



interface HomeViewProps {
    home: Home;
}

interface User {
    id: string;
    name: string;
}

export interface Expense {
    id: string;
    name: string;
    payer: string;
    description: string;
    method: string;
    category: string;
    amount: number;
    created_at: string;
}

export interface Income {
    id: string;
    name: string;
    depositor: string;
    description: string;
    method: string;
    amount: number;
    created_at: string;
}

export interface UserColors {
    [key: string]: string
}

export interface MemberExpenses {
    [key: string]: Expense[]
}

export interface MemberIncomes {
    [key: string]: Income[]
}

export default function HomeView({ home }: HomeViewProps) {
    const { user } = useAuth();
    const { setSuccessAnimation } = useSuccessAnimation();
    const [members, setMembers] = useState<User[]>([]);
    const {setLoading} = useLoading();
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [incomes, setIncomes] = useState<Income[]>([]);
    const [memberExpenses, setMemberExpenses] = useState<MemberExpenses>({});
    const [memberIncomes, setMemberIncomes] = useState<MemberIncomes>({});
    const [newExpenseModalVisible, setNewExpenseModalVisible] = useState(false);
    const [newIncomeModalVisible, setNewIncomeModalVisible] = useState(false);
    const [userColors, setUserColors] = useState<UserColors>({});
    useEffect(() => {
        setLoading(true);
        getUsersByHome(home.id).then(data => {
            if(!data) return
            setMembers(data);
            const colors: UserColors = {};
            data.forEach(homeMember => {
                colors[homeMember.name] = generateRandomHexColor();
            });
            setUserColors(colors);
            setLoading(false);
        }); 
    }, [home]);

    useEffect(() => {
        fetchExpenses();
        fetchIncomes();
    }, [home]);

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
            setMemberExpenses(memberExpenses);
    }, [expenses, members]);

    useEffect(() => {
        const memberIncomes: MemberIncomes = {};
            incomes.forEach(incomes => {
                const userId = members.find(member => member.name === incomes.depositor)?.id;
                if(!userId) return
                if(!memberIncomes[userId]) {
                    memberIncomes[userId] = [];
                }
                memberIncomes[userId].push(incomes);
            });
            setMemberIncomes(memberIncomes);
    }, [incomes, members]);

    function fetchExpenses() {
        setLoading(true);
        getExpensesByHome(home.id).then(data => {
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

    function fetchIncomes() {
        setLoading(true);
        getIncomesByHome(home.id).then(data => {
            if(!data) return
            setIncomes(data.map((income) => {
                return {
                    id: income.id,
                    name: income.name,
                    depositor: income.profiles.name,
                    description: income.description,
                    method: income.payment_method.name,
                    amount: income.amount,
                    created_at: Moment(income.created_at).format('DD/MM/YYYY HH:mm')
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
        createExpense(user.id, home.id, newExpense).then(error => {
          setLoading(false);
          if(!error) {
            setSuccessAnimation(true);
            fetchExpenses();
          }

        });
    
      }

      const handleCreateIncome = (newIncome: NewIncome) => {
        console.log("calling handleCreateIncome");
        if(!user) return
        setNewIncomeModalVisible(false);
        setLoading(true);
        createIncome(user.id, home.id, newIncome).then(error => {
          setLoading(false);
          if(!error) {
            setSuccessAnimation(true);
            fetchIncomes();
          }
        });
      }

    return (
        <SafeAreaView style={styles.container}>
            <Header title={home.name} /> 
            <MonthOveralls expenses={expenses} memberExpenses={memberExpenses} incomes={incomes} memberIncomes={memberIncomes} />

            <View style={styles.contentContainer}>
                <View style={styles.gastosContainer}>
                

            <ExpensesIncomeTabs expenses={expenses} incomes={incomes} userColors={userColors} />
                
                </View>
                
            </View>
            
            
            <MainSpeedDial handleAddIncome={() => setNewIncomeModalVisible(true)} handleAddExpense={() => {setNewExpenseModalVisible(true)}} />
            <NewExpenseModal visible={newExpenseModalVisible} setVisible={setNewExpenseModalVisible} handleCreate={handleCreateExpense} />
            <NewIncomeModal visible={newIncomeModalVisible} setVisible={setNewIncomeModalVisible} handleCreate={handleCreateIncome} />
            
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
        flex: 6,
        width: '100%',
    },
    cardContent: {
        flexDirection: 'column',
        flex: 1,
    }
});