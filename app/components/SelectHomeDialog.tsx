import { Dialog } from "@rneui/base";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Home, useUser } from "../context/UserContext";


interface SelectHomeDialogProps {
    menuOpen: boolean;
    toggleMenu: () => void;
    handleSelect: (home: Home) => void;
    title: string;
}

export default function SelectHomeDialog({title, menuOpen, toggleMenu, handleSelect}: SelectHomeDialogProps) {
    const {homes} = useUser();

    return (
        <Dialog 
            overlayStyle={styles.container}
            isVisible={menuOpen} 
            transparent 
            animationType="fade" 
            onBackdropPress={toggleMenu}>
            <Dialog.Title title={title} />
            <View style={styles.container}>
                <FlatList
                data={homes}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item: home }) => (
                    <TouchableOpacity
                    style={styles.option}
                    onPress={() => handleSelect(home)}
                    >
                    <Text style={styles.optionText}>{home.name}</Text>
                    </TouchableOpacity>
                )}
                />
            </View>
        </Dialog>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
    },
    option: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    optionText: {
        fontSize: 16,
    },
})