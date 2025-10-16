import { Pressable } from "@react-native-material/core";
import { Icon } from "@rneui/themed";
import { StyleSheet, Text, ViewStyle } from "react-native";

interface CustomButtonProps {
    title: string
    handlePress: () => void
    extraStyles?: ViewStyle
    icon?: string
}
export default function CustomButton( { title, handlePress, extraStyles, icon }: CustomButtonProps ) {
    return (
        <Pressable pressEffect="highlight" onPress={handlePress} style={[styles.button, extraStyles]}>
            {icon && <Icon style={{marginRight: 10}} name={icon} size={20} color="white" />}<Text style={styles.text}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
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