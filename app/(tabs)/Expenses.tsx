import { StyleSheet, Text, View } from "react-native";
import { BarChart } from 'react-native-gifted-charts';
import { useUser } from "../context/UserContext";


export default function Expenses() {
    const { selectedHome, setSelectedHome, homes, setHomes } = useUser();
    
    return (
        <>
            { !selectedHome.id &&
                <View style={styles.container}>
                    <Text>Expenses</Text>
                </View>
            }
            { selectedHome.id &&
                <View style={styles.container}>
                    <BarChart data={[]} />
                </View>
            }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});