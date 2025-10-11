import { Pressable } from "@react-native-material/core";
import { StyleSheet, Text, ViewStyle } from "react-native";

interface CustomButtonProps {
    title: string
    handlePress: () => void
    extraStyles?: ViewStyle
}
export default function CustomButton( { title, handlePress, extraStyles }: CustomButtonProps ) {
    return (
        <Pressable pressEffect="highlight" onPress={handlePress} style={[styles.button, extraStyles]}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
  button: { 
    marginBottom: 10, 
    backgroundColor: '#4f46e5', 
    padding: 15, 
    borderRadius: 10, 
    alignItems: 'center', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.25, 
    shadowRadius: 3.84, 
    elevation: 5 },
  text: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});