import { Dialog } from "@rneui/themed"
import { Text, View } from "react-native"
import CustomButton from "./CustomButton"

interface ConfirmDialogProps {
    visible: boolean,
    message: string,
    setVisible: (visible: boolean) => void,
    handleConfirm: () => void
}

export default function ConfirmDialog({ visible, message, setVisible, handleConfirm }: ConfirmDialogProps) {


    return (
        <Dialog isVisible={visible} onBackdropPress={() => setVisible(false)} >
            <Dialog.Title title="Confirmar" />
            <View style={{ paddingVertical: 10, marginBottom: 10 }}>
                <Text>{message}</Text>
            </View>
            <Dialog.Actions>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '100%' }}>
                    <CustomButton extraStyles={{ marginRight: 10 }} title="Cancelar" handlePress={() => setVisible(false)} />
                    <CustomButton title="Confirmar" handlePress={() => handleConfirm()} />
                </View>
            </Dialog.Actions>
        </Dialog>
    )

}