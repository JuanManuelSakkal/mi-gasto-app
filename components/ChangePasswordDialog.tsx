import { Dialog, Input } from "@rneui/themed";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { checkUserPassword } from "../services/SupaBaseService";
import CustomButton from "./CustomButton";

interface ChangePasswordDialogProps {
    isDialogVisible: boolean;
    toggleDialog: () => void;
    handleSubmit: (value: string) => Promise<string | undefined>;
}

export default function ChangePasswordDialog({ isDialogVisible, toggleDialog, handleSubmit }: ChangePasswordDialogProps) {
    const [oldPwd, setOldPwd] = useState("");
    const [newPwd, setNewPwd] = useState("");
    const { user } = useAuth();
    const [confirmationPwd, setConfirmationPwd] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | undefined>("");

    useEffect(() => {
        setOldPwd("");
        setNewPwd("");
        setConfirmationPwd("");
        setErrorMessage("");
    }, [isDialogVisible])

    return (
        <Dialog
            isVisible={isDialogVisible}
            animationType="fade"
            onBackdropPress={toggleDialog}
        >
            <Dialog.Title title={"Cambiar contraseña"} />
            <Input
                placeholder={"Contraseña actual"}
                onChangeText={setOldPwd}
                secureTextEntry={true}
            />
            <Input
                placeholder={"Nueva contraseña"}
                onChangeText={setNewPwd}
                secureTextEntry={true}
            />
            <Input
                placeholder={"Confirmar contraseña"}
                onChangeText={setConfirmationPwd}
                secureTextEntry={true}
                errorMessage={errorMessage}
            />
            <CustomButton title="Guardar" handlePress={async () => {
                    if(!user || !user.email) return
                    let error = (await checkUserPassword(user.email, oldPwd))?.message;
                    if (error){ 
                        setErrorMessage(error);
                        return
                    }
                    if(newPwd !== confirmationPwd) 
                        setErrorMessage("Las contraseñas no coinciden");
                    else {
                        error = await handleSubmit(newPwd);
                        setErrorMessage(error);
                        if(!error) toggleDialog();
                    } 
                }} />

        </Dialog>
    )
}