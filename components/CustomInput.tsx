import { StyleSheet, TextInput, TextStyle } from "react-native";
interface CustomInputProps {
    placeholder?: string
    onChangeText?: (text: string) => void,
    extraStyles?: TextStyle
    value?: string
}

export default function CustomInput( { placeholder, onChangeText, extraStyles, value }: CustomInputProps ) {
    return (
        <TextInput value={value} placeholder={placeholder} onChangeText={onChangeText} style={[styles.input, extraStyles]} />       
    )
}

const styles = StyleSheet.create({
  input: { borderWidth: 1, borderColor: '#ccc', padding: 15, marginBottom: 10, borderRadius: 10, fontSize: 16},
});