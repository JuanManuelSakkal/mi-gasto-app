import { Divider, Tab, TabView } from "@rneui/themed";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Expense, Income, UserColors } from "../context/HomeContext";
import ThreeCellTable from "./ThreeCellTable";

interface ExpensesIncomeTabsProps {
    expenses: Expense[];
    incomes : Income[];
    userColors: UserColors;
}

export default function ExpensesIncomeTabs({expenses, incomes, userColors}: ExpensesIncomeTabsProps) {
    const router = useRouter()
    const [index, setIndex] = useState(0);

    function handleExpensePress(id: string) {
        const route = "/expenses/[expenseId]"
        router.push({
            pathname: route,
            params: {
                expenseId: id
            }
        });
    }

    function handleIncomePress(id: string) {
        const route = "/incomes/[incomeId]"
        router.push({
            pathname: route,
            params: {
                incomeId: id
            }
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.cardTitleContainer}>
                    <Text style={styles.cardTitle}>Actividad reciente</Text>
                </View>
                <Divider />
                <Tab
                    value={index}
                    style={styles.tabStyle}
                    onChange={(e) => setIndex(e)}
                    indicatorStyle={{ backgroundColor: "#4f46e5" }}
                >
                    <Tab.Item titleStyle={styles.titleStyle} title="Gastos" />
                    <Tab.Item titleStyle={styles.titleStyle}title="Ingresos" />

                </Tab>
                <TabView value={index} onChange={setIndex}>
                    <TabView.Item style={[styles.itemStyle]}>
                        <ThreeCellTable onRowPress={handleExpensePress} data={expenses.map(expense => {
                                                                        return {
                                                                            id: expense.id,
                                                                            userName: expense.payer, 
                                                                            color: userColors[expense.payer],
                                                                            name: expense.name, 
                                                                            category: expense.category,
                                                                            amount: "-$" + expense.amount.toLocaleString("es-AR")
                                                                        }
                                                                    }
                                                            )}/>
                    </TabView.Item>
                    <TabView.Item style={[styles.itemStyle]}>
                        <ThreeCellTable onRowPress={handleIncomePress} data={incomes.map(income => {
                                                                        return {
                                                                            id: income.id,
                                                                            userName: income.depositor, 
                                                                            color: userColors[income.depositor], 
                                                                            name: income.name, 
                                                                            category: income.method,
                                                                            amount: "+$" + income.amount.toLocaleString("es-AR")
                                                                        }
                                                                    }
                                                        )} />
                    </TabView.Item>
                </TabView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    tabStyle: {
        padding: 0,
    },
    itemStyle: {
        width: "100%",
        paddingHorizontal: 3,
        paddingTop: 10
    },
    titleStyle: {
        color: "black",
        fontSize: 14,
        padding: 0
    },
    card: {
        flex: 1, 
        width: "100%", 
        flexDirection: "column",
        backgroundColor: "white",
        borderRadius: 20,
        padding: 5,
        overflow: "hidden",
        elevation: 1
        
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
        paddingHorizontal: 20,
        marginVertical: 20
    },
    cardTitleContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        padding: 5
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "black",
    },
});