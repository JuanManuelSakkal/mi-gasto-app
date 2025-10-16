import { Dialog } from '@rneui/themed';
import { useState } from "react";
import CustomButton from "./CustomButton";
import CustomInput from './CustomInput';

interface NewHomeModalProps {
    visible: boolean
    setVisible: (visible: boolean) => void,
    handleCreate: (homeName: string) => void
}

export default function NewHomeModal({ visible, setVisible, handleCreate }: NewHomeModalProps) {
    const [homeName, setHomeName] = useState('');


    return (
            <Dialog isVisible={visible} onBackdropPress={() => setVisible(false)} >
                <Dialog.Title title="Crear hogar" />
                <CustomInput placeholder="Nombre del hogar" onChangeText={(value) => {setHomeName(value)}} />
                <Dialog.Actions>
                    <CustomButton title="Crear" handlePress={() => handleCreate(homeName)} />
                </Dialog.Actions>
            </Dialog>
    );
}