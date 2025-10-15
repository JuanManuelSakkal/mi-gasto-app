
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import { useHome } from '../context/HomeContext';
import { useLoading } from '../context/LoadingContext';
import { useSuccessAnimation } from '../context/SuccessAnimationContext';
import { Home } from '../context/UserContext';
import { createExpense, createIncome } from '../services/SupaBaseService';
import ExpensesIncomeTabs from './ExpensesIncomeTabs';
import Header from './Header';
import MainSpeedDial from './MainSpeedDial';
import MonthOveralls from './MonthOveralls';
import NewExpenseModal, { Expense as NewExpense } from './NewExpenseModal';
import NewIncomeModal, { Income as NewIncome } from './NewIncomeModal';



interface HomeViewProps {
    home: Home;
}

export default function HomeView({ home }: HomeViewProps) {
    const { user } = useAuth();
    const { setSuccessAnimation } = useSuccessAnimation();
    const { expenses, memberExpenses, incomes, memberIncomes, fetchExpenses, fetchIncomes, userColors } = useHome();
    const {setLoading} = useLoading();
    const [newExpenseModalVisible, setNewExpenseModalVisible] = useState(false);
    const [newIncomeModalVisible, setNewIncomeModalVisible] = useState(false);

    
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