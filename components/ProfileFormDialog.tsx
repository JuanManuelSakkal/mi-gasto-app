import { Dialog, Input } from "@rneui/themed";
import { useEffect, useState } from "react";
import CustomButton from "./CustomButton";

interface ProfileFormDialogProps {
    isDialogVisible: boolean;
    toggleDialog: () => void;
    inputName: string;
    handleSubmit: (value: string) => Promise<string | undefined>;
}

export default function ProfileFormDialog({ isDialogVisible, toggleDialog, inputName, handleSubmit}: ProfileFormDialogProps) {
    const [inputValue, setInputValue] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | undefined>("");

    useEffect(() => {
        setInputValue("");
        setErrorMessage("");
    }, [isDialogVisible])

    return (
        <Dialog
            isVisible={isDialogVisible}
            animationType="fade"
            onBackdropPress={toggleDialog}
        >
            <Dialog.Title title={"Cambiar " + inputName} />
            <Input
                placeholder={inputName}
                onChangeText={setInputValue}
                errorMessage={errorMessage}
            />
            <CustomButton title="Guardar" handlePress={async () => {
                    const error = await handleSubmit(inputValue)
                    setErrorMessage(error);
                    if(!error) toggleDialog();
                }} />

        </Dialog>
    )
}