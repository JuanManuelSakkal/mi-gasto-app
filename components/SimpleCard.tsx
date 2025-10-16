import { Card } from "@rneui/themed";
import { StyleSheet, Text } from "react-native";

interface SimpleCardProps {
    title: string;
    text: string;
}

export default function SimpleCard({title, text}: SimpleCardProps) {
    return (
        <Card containerStyle={{flex: 1, maxHeight: 125, borderRadius: 20}}>
            <Card.Title style={styles.title}>{title}</Card.Title>
            <Text style={styles.text}>{text}</Text>
        </Card>
    );
}

const styles = StyleSheet.create({
    
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left',
        minHeight: 46,
    },
    text: {
        fontSize: 18,
        color: "#4f46e5",
        fontWeight: 'bold',
    },
});