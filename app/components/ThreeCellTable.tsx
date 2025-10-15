import { Pressable } from "@react-native-material/core";
import { Avatar } from "@rneui/themed";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Expense, Income } from "../context/HomeContext";

export interface RowData {
    object: Expense | Income;
    userName: string;
    name: string;
    color: string;
    category: string;
    amount: string;
}

interface ThreeCellTableProps {
    data: RowData[];
    onRowPress?: (object: Expense | Income) => void
}

export default function ThreeCellTable({data, onRowPress}: ThreeCellTableProps) {
    return (

            <FlatList 
                style={{borderRadius: 10}}
                data={data} 
                renderItem={({item, index}) => (
                    <Pressable pressEffect="highlight" style={styles.tableRow}
                        onPress={() => onRowPress && onRowPress(item.object)}
                    >
                        <View style={[styles.tableCell, {flex: 1}]}>
                            <Avatar rounded title={item.userName[0]}  containerStyle={{borderRadius: 50, backgroundColor: item.color}} />
                        </View>
                        <View style={[styles.tableCell, {flex: 3}]}>
                            <Text style={styles.tableText}>{item.name}</Text>
                            <Text >{item.category}</Text>
                        </View>
                        <View style={styles.tableCell}>
                            <Text style={styles.tableText}>{item.amount}</Text>
                        </View>
                    </Pressable>
                    
                )} 
            />
    );
}

const styles = StyleSheet.create({
    cardContent: {
        flexDirection: 'row',
        flex: 1,
    },
    tableRow: {
        flexDirection: 'row', 
        width: '100%', 
        justifyContent: 'space-between',
        paddingVertical: 3,
        marginTop: 1,
        backgroundColor: '#f0f0f0ff',
    },
    tableCell: {
        flex: 2,
        padding: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tableText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});