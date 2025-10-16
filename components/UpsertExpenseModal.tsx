import { useStatics } from "@/context/StaticsContext";
import { BottomSheet, ButtonGroup, Dialog, Input, ListItem } from "@rneui/themed";
import { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";


interface UpsertExpenseModalProps {
    title: string
    visible: boolean
    setVisible: (visible: boolean) => void
    handleSubmit: (newExpense: Expense) => void
    expense?: Expense
}

interface Category {
    id: string | null
    name: string
}

export interface Method {
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

export default function UpsertExpenseModal({ title, visible, setVisible, handleSubmit, expense }: UpsertExpenseModalProps) {
    const {categories, paymentMethods} = useStatics();
    const [expenseName, setExpenseName] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
    const [amount, setAmount] = useState(0);
    const [selectedMethod, setSelectedMethod] = useState<Method>(paymentMethods[0]);
    const [selectedCategory, setSelectedCategory] = useState<Category>({id: null, name: 'Elegir categoría'});
    const [expenseDescription, setExpenseDescription] = useState('');


    useEffect(() => {
        if(expense) {
            console.log(expense);
            setSelectedCategory(expense.category);
            setSelectedMethod(expense.method);
            setExpenseName(expense.name);
            setExpenseDescription(expense.description);
            setAmount(expense.amount);
            setSelectedIndex(paymentMethods.findIndex(method => method.id === expense.method.id));
        }
    }, [expense, paymentMethods]);

    function cleanForm() {
        setSelectedCategory({id: null, name: 'Elegir categoría'});
        setSelectedMethod(paymentMethods[0]);
        setExpenseName('');
        setExpenseDescription('');
        setAmount(0);
        setSelectedIndex(0);
    }

    return (
            <Dialog isVisible={visible} animationType="fade" onBackdropPress={() => {setVisible(false); cleanForm();}} >
                <Dialog.Title title={title} />
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
                <CustomInput value={expenseName} placeholder="Nombre" onChangeText={(value) => {setExpenseName(value)}} />
                
                <CustomInput value={expenseDescription} placeholder="Descripción (opcional)" onChangeText={(value) => {setExpenseDescription(value)}} />
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
                    value={amount ? amount.toString() : ''}
                    placeholder="Gastado" 
                    leftIcon={{ type: 'font-awesome', name: 'usd' }}
                    keyboardType="numeric"
                    onChangeText={(value) => {setAmount(parseFloat(value))}} />
                <Dialog.Actions>
                    <CustomButton title="Guardar" handlePress={() => handleSubmit({ name: expenseName, description: expenseDescription, category: selectedCategory, method: selectedMethod!, amount: amount })} />
                </Dialog.Actions>
            </Dialog>
    );
}