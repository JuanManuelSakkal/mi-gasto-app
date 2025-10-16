import { useStatics } from "@/context/StaticsContext"
import { ButtonGroup, Dialog, Input } from "@rneui/themed"
import { useEffect, useState } from "react"
import CustomButton from "./CustomButton"
import CustomInput from "./CustomInput"
import { Method } from "./UpsertExpenseModal"


interface UpsertIncomeModalProps {
    visible: boolean
    setVisible: (visible: boolean) => void
    handleSubmit: (newIncome: Income) => void
    income?: Income
}

export interface Income {
    name: string
    description?: string
    amount: number
    method: Method
}

export default function UpsertIncomeModal({ visible, setVisible, handleSubmit, income }: UpsertIncomeModalProps) {
    const {earningMethods} = useStatics();
    const [incomeName, setIncomeName] = useState('');
    const [incomeDescription, setIncomeDescription] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedMethod, setSelectedMethod] = useState<Method>(earningMethods[0]);
    const [amount, setAmount] = useState(0);

    useEffect(() => {
            setSelectedMethod(earningMethods[0])
    }, [earningMethods]);

    useEffect(() => {
        if(income) {
            setIncomeName(income.name);
            setIncomeDescription(income.description || '');
            setSelectedIndex(earningMethods.findIndex(method => method.name === income.method.name));
            setSelectedMethod(income.method);
            setAmount(income.amount);
        }
    }, [income, earningMethods]);

    return (
        <Dialog isVisible={visible} onBackdropPress={() => setVisible(false)} >
            <Dialog.Title title="Nuevo ingreso" />
            <CustomInput value={incomeName} placeholder="Nombre" onChangeText={(value) => {setIncomeName(value)}} />
            <CustomInput value={incomeDescription} placeholder="Descripcion" onChangeText={(value) => {setIncomeDescription(value)}} />
            <ButtonGroup 
                        buttons={earningMethods.map(method => method.name)} 
                        selectedIndex={selectedIndex} 
                        onPress={(value) => {
                            setSelectedIndex(value);
                            setSelectedMethod(earningMethods[value]);
                        }}
                        selectedButtonStyle={{backgroundColor: "#4f46e5"}}
                        containerStyle={{ marginVertical: 10, marginHorizontal: 0 }} />
                <Input 
                    value={amount ? amount.toString() : ''}
                    placeholder="Ingreso" 
                    leftIcon={{ type: 'font-awesome', name: 'usd' }}
                    keyboardType="numeric"
                    onChangeText={(value) => {setAmount(parseFloat(value))}} />
            <Dialog.Actions>
                <CustomButton title="Crear" handlePress={() => handleSubmit({name: incomeName, description: incomeDescription, method: selectedMethod!, amount})} />
            </Dialog.Actions>
        </Dialog>
    );
}