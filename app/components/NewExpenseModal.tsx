import { BottomSheet, ButtonGroup, Dialog, Input, ListItem } from "@rneui/themed";
import { useEffect, useState } from "react";
import { getCategories, getPaymentMethods } from "../services/SupaBaseService";
import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";


interface NewExpenseModalProps {
    visible: boolean
    setVisible: (visible: boolean) => void
    handleCreate: (newExpense: Expense) => void
}

interface Category {
    id: string | null
    name: string
}

interface Method {
    id: string
    name: string
}

export interface Expense {
    name: string
    description: string
    category: Category
    method: Method
    amount: number
}

export default function NewExpenseModal({ visible, setVisible, handleCreate }: NewExpenseModalProps) {

    const [expenseName, setExpenseName] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
    const [amount, setAmount] = useState(0);
    const [paymentMethods, setPaymentMethods] = useState<Method[]>([]);
    const [selectedMethod, setSelectedMethod] = useState<Method>();
    const [selectedCategory, setSelectedCategory] = useState<Category>({id: null, name: 'Elegir categoría'});
    const [categories, setCategories] = useState<Category[]>([]);
    const [expenseDescription, setExpenseDescription] = useState('');

    useEffect(() => {
        getCategories().then(dbCategories => setCategories(dbCategories));
    }, []);

    
    useEffect(() => {
        getPaymentMethods().then(dbPaymentMethods => setPaymentMethods(dbPaymentMethods));
    }, []);

    useEffect(() => {
        setSelectedMethod(paymentMethods[0]);
    }, [paymentMethods]);

    return (
            <Dialog isVisible={visible} onBackdropPress={() => setVisible(false)} >
                <Dialog.Title title="Nuevo gasto" />
                <BottomSheet 
                    isVisible={bottomSheetVisible}
                    onBackdropPress={() => setBottomSheetVisible(false)}
                >
                    {categories.map((category, i) => (
                        <ListItem
                        key={i}
                        onPress={() => {
                            setSelectedCategory(category)
                            setBottomSheetVisible(false)
                        }} 
                        >
                        <ListItem.Content>
                            <ListItem.Title
                            >
                                {category.name}
                            </ListItem.Title>
                        </ListItem.Content>
                        </ListItem>
                    ))}
                </BottomSheet>
                    
                <CustomButton title={selectedCategory.name} handlePress={() => setBottomSheetVisible(true)} />
                <CustomInput placeholder="Nombre" onChangeText={(value) => {setExpenseName(value)}} />
                
                <CustomInput placeholder="Descripción (opcional)" onChangeText={(value) => {setExpenseDescription(value)}} />
                    <ButtonGroup 
                        buttons={paymentMethods.map(method => method.name)} 
                        selectedIndex={selectedIndex} 
                        onPress={(value) => {
                            setSelectedIndex(value);
                            setSelectedMethod(paymentMethods[value]);
                        }}
                        selectedButtonStyle={{backgroundColor: "#4f46e5"}}
                        containerStyle={{ marginVertical: 10, marginHorizontal: 0 }} />
                <Input 
                    placeholder="Gastado" 
                    leftIcon={{ type: 'font-awesome', name: 'usd' }}
                    keyboardType="numeric"
                    onChangeText={(value) => {setAmount(parseFloat(value))}} />
                <Dialog.Actions>
                    <CustomButton title="Crear" handlePress={() => handleCreate({ name: expenseName, description: expenseDescription, category: selectedCategory, method: selectedMethod!, amount: amount })} />
                </Dialog.Actions>
            </Dialog>
    );
}