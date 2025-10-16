import { StyleSheet, Text, View } from "react-native";
import CategoryExpensesPieChart from "../../components/charts/CategoryExpensesPieChart";
import UserExpensesBarChart from "../../components/charts/UserExpensesBarChart";
import { useUser } from "../../context/UserContext";


export default function Expenses() {
    const { selectedHome, setSelectedHome, homes, setHomes } = useUser();
    const barData = [
    {value: 230,label: 'Jan',frontColor: '#4ABFF4'},
    {value: 180,label: 'Feb',frontColor: '#79C3DB'},
    {value: 195,label: 'Mar',frontColor: '#28B2B3'},
    {value: 250,label: 'Apr',frontColor: '#4ADDBA'},
    {value: 320,label: 'May',frontColor: '#91E3E3'},
    ];
    return (
        <>
            { !selectedHome?.id &&
                <View style={styles.container}>
                    <Text>Expenses</Text>
                </View>
            }
            { selectedHome?.id &&
                <View style={styles.container}>
                    <UserExpensesBarChart />
                    <CategoryExpensesPieChart />
                </View>
            }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
    },
});