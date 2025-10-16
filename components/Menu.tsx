import { Icon } from "@rneui/themed";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Home, useUser } from "../context/UserContext";
import SelectHomeDialog from "./SelectHomeDialog";


export default function Menu() {
    const {setSelectedHome} = useUser();

    const [menuOpen, setMenuOpen] = useState(false);
    function toggleMenu() {
        setMenuOpen(!menuOpen);
    }

    function handleSelect(home: Home) {
        console.log(`Selected: ${home.name}`);
        setSelectedHome(home);
        toggleMenu();
    }

    return (<>
        <View style={styles.menuContainer}>
            <Pressable onPress={toggleMenu}>
                <Icon name="menu" color="white" size={30} />
            </Pressable>
            <SelectHomeDialog title="Ver Hogar" menuOpen={menuOpen} toggleMenu={toggleMenu} handleSelect={handleSelect} />
            
        </View>
            </>
    )
}

const styles = StyleSheet.create({
    menuContainer: {
        position: 'absolute',
        right: 20,
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