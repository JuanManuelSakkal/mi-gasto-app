import { StyleSheet, Text, View } from "react-native";
import { useAuth } from "../context/AuthContext";
import { Expense, Income, MemberExpenses, MemberIncomes } from "./HomeView";
import SimpleCard from "./SimpleCard";


interface MonthOverallsProps {
    expenses: Expense[],
    memberExpenses: MemberExpenses,
    incomes: Income[],
    memberIncomes: MemberIncomes
}

export default function MonthOveralls({expenses, memberExpenses, incomes, memberIncomes}: MonthOverallsProps) {
    const { user } = useAuth();
    return (
        <View style={styles.subTitleContainer}>
            <View><Text style={{fontWeight: 'bold', fontSize: 20}}>Resumen del mes</Text></View>
            <View style={styles.cardRow}>
                <SimpleCard title="Gastos del hogar" text={"$" + expenses.reduce((total, expense) => total + expense.amount, 0).toLocaleString("es-AR")} />
                <SimpleCard title="Ingresos del hogar" text={"$" + incomes.reduce((total, income) => total + income.amount, 0).toLocaleString("es-AR")} />

             </View>
            <View style={styles.cardRow}>
                <SimpleCard title="Gastos personales" 
                            text={"$" + (user && memberExpenses[user.id] ? memberExpenses[user.id].reduce((total, expense) => total + expense.amount, 0).toLocaleString("es-AR") : "0")} />
           
                <SimpleCard title="Ingresos personales" 
                            text={"$" + (user && memberIncomes[user.id] ? memberIncomes[user.id].reduce((total, income) => total + income.amount, 0).toLocaleString("es-AR") : "0")} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    subTitleContainer: {
        marginTop: 20,
        flex: 4,
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardRow: {
        flex: 1,
        flexDirection: 'row',
        gap: 0,
        width: '100%',
        justifyContent: 'space-around',
    }
});