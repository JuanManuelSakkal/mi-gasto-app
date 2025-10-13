import { ButtonGroup, Dialog, Input } from "@rneui/themed"
import { useEffect, useState } from "react"
import { getEarningMethods } from "../services/SupaBaseService"
import CustomButton from "./CustomButton"
import CustomInput from "./CustomInput"
import { Method } from "./NewExpenseModal"


interface NewIncomeModalProps {
    visible: boolean
    setVisible: (visible: boolean) => void
    handleCreate: (newIncome: Income) => void
}

export interface Income {
    name: string
    description?: string
    amount: number
    method: Method
}

export default function NewIncomeModal({ visible, setVisible, handleCreate }: NewIncomeModalProps) {

    const [incomeName, setIncomeName] = useState('');
    const [incomeDescription, setIncomeDescription] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedMethod, setSelectedMethod] = useState<Method>();
    const [methods, setMethods] = useState<Method[]>([]);
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        getEarningMethods().then(dbMethods => {
            setSelectedMethod(dbMethods[0])
            setMethods(dbMethods);
        })
    }, []);

    return (
        <Dialog isVisible={visible} onBackdropPress={() => setVisible(false)} >
            <Dialog.Title title="Nuevo ingreso" />
            <CustomInput placeholder="Nombre" onChangeText={(value) => {setIncomeName(value)}} />
            <CustomInput placeholder="Descripcion" onChangeText={(value) => {setIncomeDescription(value)}} />
            <ButtonGroup 
                        buttons={methods.map(method => method.name)} 
                        selectedIndex={selectedIndex} 
                        onPress={(value) => {
                            setSelectedIndex(value);
                            setSelectedMethod(methods[value]);
                        }}
                        selectedButtonStyle={{backgroundColor: "#4f46e5"}}
                        containerStyle={{ marginVertical: 10, marginHorizontal: 0 }} />
                <Input 
                    placeholder="Ingreso" 
                    leftIcon={{ type: 'font-awesome', name: 'usd' }}
                    keyboardType="numeric"
                    onChangeText={(value) => {setAmount(parseFloat(value))}} />
            <Dialog.Actions>
                <CustomButton title="Crear" handlePress={() => handleCreate({name: incomeName, description: incomeDescription, method: selectedMethod!, amount})} />
            </Dialog.Actions>
        </Dialog>
    );
}