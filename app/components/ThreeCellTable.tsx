import { Pressable } from "@react-native-material/core";
import { Avatar } from "@rneui/themed";
import { FlatList, StyleSheet, Text, View } from "react-native";

interface ThreeCellTableProps {
    title: string;
    data: [string, string, string, string, string][];
}

export default function ThreeCellTable({title, data}: ThreeCellTableProps) {
    return (

            <FlatList 
                style={{borderRadius: 10}}
                data={data} 
                renderItem={({item, index}) => (
                    <Pressable pressEffect="highlight" style={styles.tableRow}>
                        <View style={[styles.tableCell, {flex: 1}]}>
                            <Avatar rounded title={item[0][0]}  containerStyle={{borderRadius: 50, backgroundColor: item[1]}} />
                        </View>
                        <View style={[styles.tableCell, {flex: 3}]}>
                            <Text style={styles.tableText}>{item[2]}</Text>
                            <Text >{item[3]}</Text>
                        </View>
                        <View style={styles.tableCell}>
                            <Text style={styles.tableText}>{item[4]}</Text>
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