import { useHome } from '@/context/HomeContext';
import moment from 'moment';
import { ReactNode, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

interface DataPoint {
    value: number,
    label?: string,
    labelComponent?: () => ReactNode
}

export default function MonthExpensesLineChart() {
    const {expenses} = useHome();
    const [data, setData] = useState<DataPoint[]>([]);

    useEffect(() => {
        setData(generateData());
    }, [expenses])

    function groupData(data: DataPoint[]) {
        let index = 0
        let element = data[index];
        while (index < data.length - 1) {
            if (element.label === data[index + 1].label) {
                element.value += data[index + 1].value;
                data.splice(index + 1, 1);
            } else {
                element = data[++index];
            }
        }
        return data
    }
    function generateData() {
        if(!expenses) return []
        const ungroupedData: DataPoint[] = expenses.toReversed().map(expense => {return {value: expense.amount, label: expense.created_at = moment(expense.created_at, 'DD/MM/YYYY HH:mm').format('DD MMM')}})
        const data = groupData(ungroupedData).map((dataPoint, index) => {
            if(index%10 === 0){ 
                return {value: dataPoint.value, label: dataPoint.label,
                    labelComponent: () => {
                        return <View style={{alignItems: 'center', justifyContent: 'center', width: 50, transform: [{translateX: -20}]}}><Text>{dataPoint.label}</Text></View>
                    }
                }
            } else {
                return {value: dataPoint.value}
            }
        });
        console.log("data: ", data);
        return data
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.titleContainer}><Text style={styles.title}>Gastos por mes</Text></View>
                <LineChart
                    data={data}
                    noOfSections={3}
                    spacing={10}
                    stepHeight={50}
                    width={270}
                    curved
                    hideDataPoints
                    color='#4f46e5'
                    thickness={4}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginHorizontal: 20,
        flexDirection: 'column',
        borderWidth: 1,
        paddingTop: 50
    },
    card: {
        width: '100%',
        marginHorizontal: 20,
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#ffffffff',
        borderRadius: 20,
        elevation: 1
    },
    titleContainer: {
        alignItems: 'center',
        width: '100%',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
})