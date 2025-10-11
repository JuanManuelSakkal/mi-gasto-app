import CustomButton from "@/app/components/CustomButton";
import { StyleSheet, View } from "react-native";

import { useNavigation } from "expo-router";
import { supabase } from '../supabase/supabase-client';

export default function ProfileScreen() {
    const navigation = useNavigation();
    
    function handlePress() {
        supabase.auth.signOut();
        navigation.popTo("App");
    }

    return (
        <View style={styles.container}>

            <CustomButton title="Logout" handlePress={handlePress} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});