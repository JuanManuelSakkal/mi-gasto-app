import CustomButton from "@/components/CustomButton";
import { Pressable } from "@react-native-material/core";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ChangePasswordDialog from "../../components/ChangePasswordDialog";
import ProfileFormDialog from "../../components/ProfileFormDialog";
import { useAuth } from "../../context/AuthContext";
import { useLoading } from "../../context/LoadingContext";
import { useSuccessAnimation } from "../../context/SuccessAnimationContext";
import { useUser } from "../../context/UserContext";
import { updateUserEmail, updateUserName, updateUserPassword } from "../../services/SupaBaseService";
import { supabase } from '../../supabase/supabase-client';

export default function ProfileScreen() {
    const { userName, setUserName } = useUser();
    const { user } = useAuth();
    const { setSuccessAnimation } = useSuccessAnimation();
    const { setLoading } = useLoading();
    const navigation = useNavigation();
    const [inputName, setInputName] = useState("");
    const [submitFunction, setSubmitFunction] = useState<(value: string) => Promise<string | undefined>>(() => async (value: string) => {return ""});
    const [isDialogVisible, setDialogVisible] = useState(false);
    const [isPwdDialogVisible, setPwdDialogVisible] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    
    function handlePress() {
        supabase.auth.signOut();
        navigation.popTo("App");
    }

    function toggleDialog() {
        setDialogVisible(!isDialogVisible);
    }

    function togglePwdDialog() {
        setPwdDialogVisible(!isPwdDialogVisible);
    }

    async function handleUpdateUserName(value: string) {
        if(!user) return
        setLoading(true);
        const error = await updateUserName(user.id, value);
        if(!error){ 
            setUserName(value);
            setSuccessAnimation(true);
        } else {
            setSubmitError(error.message);
        }
        setLoading(false);
        return error?.message
        
    }

    async function handleUpdateUserEmail(value: string) {
        if(!user) return
        setLoading(true);
        const error = await updateUserEmail(user.id, value);
        if(!error){ 
            setUserName(value);
            setSuccessAnimation(true);
        } else {
            setSubmitError(error.message);
        }
        setLoading(false);
        return error?.message
    }

    async function handleUpdateUserPassword(value: string) {
        if(!user) return
        setLoading(true);
        const error = await updateUserPassword(value);
        if(!error){ 
            setSuccessAnimation(true);
        } else {
            console.log(error)
            setSubmitError(error.message);
        }
        setLoading(false);
        return error?.message
    }

    function openNameDialog() {
        setInputName("Nombre");
        setSubmitFunction(() => handleUpdateUserName);
        setDialogVisible(true);
    }

    function openEmailDialog() {
        if(!user) return
        setInputName("Email");
        setSubmitFunction(() => handleUpdateUserEmail);
        setDialogVisible(true);
    }

    function openPasswordDialog() {
        if(!user) return
        setInputName("Contraseña");
        setSubmitFunction(() => handleUpdateUserPassword);
        setPwdDialogVisible(true);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Perfil</Text>
            <Pressable onPress={openNameDialog} pressEffect="highlight" style={styles.settingsRow}>
                <View style={styles.setting}>
                    <Text style={styles.settingTitle}>Nombre</Text>
                    <Text style={styles.settingValue}>{userName}</Text>
                </View>
            </Pressable>
            <Pressable onPress={openEmailDialog} pressEffect="highlight" style={styles.settingsRow}>
                <View style={styles.setting}>
                    <Text style={styles.settingTitle}>Email</Text>
                    <Text style={styles.settingValue}>{user?.email}</Text>
                </View>
            </Pressable>
            <Pressable onPress={openPasswordDialog} pressEffect="highlight" style={styles.settingsRow}>
                <View style={styles.setting}>
                    <Text style={styles.settingTitle}>Contraseña</Text>
                    <Text style={styles.settingValue}>*********</Text>
                </View>
            </Pressable>
            <Pressable pressEffect="highlight" style={styles.settingsRow}>
                <View style={styles.setting}>
                    <CustomButton  title="Cerrar Sesión" handlePress={handlePress} />
                </View>
            </Pressable>

            <ProfileFormDialog isDialogVisible={isDialogVisible} toggleDialog={toggleDialog} inputName={inputName} handleSubmit={async (value) => await submitFunction(value) } />
            <ChangePasswordDialog isDialogVisible={isPwdDialogVisible} toggleDialog={togglePwdDialog} handleSubmit={handleUpdateUserPassword} />
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 36,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        verticalAlign: "middle",
        marginTop: 20,
        flex: 1,
        width: '100%',
        color: 'white',
        borderBottomColor: '#000000ff',
        borderBottomWidth: 1,
        backgroundColor: '#4f46e5',
    },
    settingsRow: {
      borderTopColor: '#ccc',
      borderTopWidth: 1,
      width: '100%',
      flexDirection: 'column',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    setting: {
        fontWeight: 'bold',
        flex: 1,
        verticalAlign: "middle",
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    settingTitle: {
      fontSize: 24,  
      fontWeight: 'bold',
    },
    settingValue: {
      fontSize: 24,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
});