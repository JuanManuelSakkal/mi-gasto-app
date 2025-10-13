import { Divider, Tab, TabView } from "@rneui/themed";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Expense, Income, UserColors } from "./HomeView";
import ThreeCellTable from "./ThreeCellTable";

interface ExpensesIncomeTabsProps {
    expenses: Expense[];
    incomes : Income[];
    userColors: UserColors;
}

export default function ExpensesIncomeTabs({expenses, incomes, userColors}: ExpensesIncomeTabsProps) {
    const [index, setIndex] = useState(0);
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
                        <ThreeCellTable title="Gastos recientes" data={expenses.map(expense => [expense.payer, userColors[expense.payer], 
                                                                                                        expense.name, expense.category,
                                                                                                        "-$" + expense.amount.toLocaleString("es-AR")])} />
                    </TabView.Item>
                    <TabView.Item style={[styles.itemStyle]}>
                        <ThreeCellTable title="Gastos recientes" data={incomes.map(income => [income.depositor, userColors[income.depositor], 
                                                                                                        income.name, income.method,
                                                                                                        "+$" + income.amount.toLocaleString("es-AR")])} />
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
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
        paddingHorizontal: 20,
        overflow: "hidden",
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