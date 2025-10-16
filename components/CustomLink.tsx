import { Link, RelativePathString } from "expo-router";
import { StyleSheet, Text } from "react-native";


interface CustomLinkProps {
    title: string;
    ref: RelativePathString;
}

export default function CustomLink( { title, ref }: CustomLinkProps ) {

    return (
        <Link href={ref} style={styles.link}>
            <Text style={styles.text}>{title}</Text>
        </Link>
    );

}

const styles = StyleSheet.create({
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
    text: {}
});