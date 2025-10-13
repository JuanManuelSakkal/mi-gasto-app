import { useState } from "react";
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SlideModal() {
    const [menuOpen, setMenuOpen] = useState(false);

    function toggleMenu() {
        setMenuOpen(!menuOpen);
    }
    function handleSelect(item: string) {
        console.log(`Selected: ${item}`);
        toggleMenu();
    }
    return (
        <Modal visible={menuOpen} transparent animationType="slide">
            <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
                <FlatList
                data={["Option 1", "Option 2", "Option 3"]}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                    style={styles.option}
                    onPress={() => handleSelect(item)}
                    >
                    <Text style={styles.optionText}>{item}</Text>
                    </TouchableOpacity>
                )}
                />
                <TouchableOpacity style={styles.closeButton} onPress={toggleMenu}>
                <Text style={styles.closeText}>Close</Text>
                </TouchableOpacity>
            </View>
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    menuContainer: {
        position: 'absolute',
        right: 20,
    },
    modalBackground: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        width: "80%",
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
    },
    option: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    optionText: {
        fontSize: 16,
    },
    closeButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: "#e74c3c",
        borderRadius: 5,
    },
    closeText: {
        color: "white",
        textAlign: "center",
    },
})