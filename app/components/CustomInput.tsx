import { StyleSheet, TextInput, TextStyle } from "react-native";
interface CustomInputProps {
    placeholder?: string
    onChangeText?: (text: string) => void,
    extraStyles?: TextStyle
}

export default function CustomInput( { placeholder, onChangeText, extraStyles }: CustomInputProps ) {
    return (
        <TextInput placeholder={placeholder} onChangeText={onChangeText} style={[styles.input, extraStyles]} />       
    )
}

const styles = StyleSheet.create({
  input: { borderWidth: 1, borderColor: '#ccc', padding: 15, marginBottom: 10, borderRadius: 10, fontSize: 16},
});