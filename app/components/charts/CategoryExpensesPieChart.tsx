import { useHome } from "@/app/context/HomeContext";
import { generateRandomHexColor } from "@/app/utils/RandomColorGenerator";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { PieChartPro, pieDataItem } from "react-native-gifted-charts";

interface CategoryExpenses {
    [key: string]: number
}

interface CategoryAndColor {
    name: string,
    color: string
}

export default function CategoryExpensesPieChart() {
    const { expenses } = useHome();
    const [pieData, setPieData] = useState<pieDataItem[]>([]);
    const [categories, setCategories] = useState<CategoryAndColor[]>([]);
    const [categoryExpenses, setCategoryExpenses] = useState<CategoryExpenses>({});

    useEffect(() => {
        const categoryExpenses: CategoryExpenses = {};
        const usedCategories: CategoryAndColor[] = []
        expenses.forEach(expense => {
            if (categoryExpenses[expense.category]) {
                categoryExpenses[expense.category] += expense.amount;
            } else {
                categoryExpenses[expense.category] = expense.amount;
            }
            if(!usedCategories.find(usedCategory => usedCategory.name === expense.category)) {
                usedCategories.push({name: expense.category, color: generateRandomHexColor()});
            }
        });
        setCategoryExpenses(categoryExpenses);
        setCategories(usedCategories);
    }, [expenses]);

    function generatePieData() {

        const data = categories.map((category) => {
            return {
                name: category.name,
                value: categoryExpenses[category.name],
                color: category.color,
            }
        })

        return data
    }

    useEffect(() => {
        setPieData(generatePieData());
    }, [expenses, categoryExpenses, categories]);

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.titleContainer}><Text style={styles.title}>Gastos por categoría</Text></View>
                <PieChartPro
                    data={pieData}
                    donut    
                    radius={60}
                />
                <View style={styles.footerContainer}>
                    {categories.map(category => 
                        <View style={styles.tagElement} key={category.name}>
                            <Text>{category.name}: </Text><View style={{width: 10, height: 10, backgroundColor: category.color}}></View>
                        </View>
                    )}
                </View>
            </ View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        paddingHorizontal: 30,
        marginHorizontal: 20,
        alignItems: 'center',
        backgroundColor: '#ffffffff',
        borderRadius: 20,
        elevation: 1
    },
    titleContainer: {
        padding: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    footerContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 15
    },
    tagElement: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        paddingHorizontal: 10
    }
});