import { useHome } from "@/app/context/HomeContext";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

interface barDataItem {
    value: number,
    frontColor: string,
    label: string,
}

export default function UserExpensesBarChart() {
    const { userColors, memberExpenses, members } = useHome();
    const [barChartData, setBarChartData] = useState<barDataItem[] | []>([]);

    useEffect(() => {
        setBarChartData(generateChartData());
    }, [members, memberExpenses]);

    function generateChartData() {
        if(members.length === 0) return []
        const data: barDataItem[] = members.map(member => {
            if(!memberExpenses[member.id] || memberExpenses[member.id].length === 0) return {value: 0, frontColor: userColors[member.name], label: member.name}
            const value = memberExpenses[member.id].reduce((total, expense) => total + expense.amount, 0)
            return {
                value: value,
                frontColor: userColors[member.name],
                label: member.name
            }
        }) 

        return data.sort((a, b) => b.value - a.value);
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.titleContainer}><Text style={styles.title}>Gastos por integrante</Text></View>
                {
                    barChartData.map((item, index) => (
                        <View key={index} style={styles.barContainer}>
                            <Text style={styles.barName}>{item.label}</Text>
                            <View style={[styles.bar]}>
                                <View style={{
                                        backgroundColor: item.frontColor, 
                                        width: `${(item.value / barChartData[0].value) * 100}%`, 
                                        height: '100%', 
                                        borderTopRightRadius: 10,
                                        borderBottomRightRadius: 10
                                        }}>
                                </View>
                            </View>
                            <Text style={styles.barValue}>{"$" + item.value?.toLocaleString("es-AR")}</Text>
                        </View>
                    ))
                }
            </ View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        width: '100%',
        padding: 15,
        alignItems: 'center',
        backgroundColor: '#ffffffff',
        borderRadius: 20,
        elevation: 1
    },
    barContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        width: '100%',
    },
    barName: {
        width: 80,
        textAlign: 'right',
        marginBottom: 2
    },
    bar: {
        marginHorizontal: 10,
        height: 20,
        width: 160,
    },
    barValue: {
        marginBottom: 2,
        width: 100,
        fontWeight: 'bold',
        color: "#4f46e5"
    },
    titleContainer: {
        padding: 5
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});