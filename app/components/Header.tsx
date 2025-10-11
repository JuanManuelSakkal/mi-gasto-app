import { StyleSheet, Text, View } from 'react-native'
import Menu from './Menu'

interface HeaderProps {
    title: string
}

export default function Header({title}: HeaderProps) {
    return (
        <View style={styles.titleContainer}>
            <Text style={styles.title}>🏠{title}</Text>
            <Menu />
        </View>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        backgroundColor: '#4f46e5',
        marginTop: 20,
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'white',
    },
})