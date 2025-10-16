import ConfirmDialog from "@/components/ConfirmDialog";
import CustomButton from "@/components/CustomButton";
import UpsertExpenseModal, { Expense } from "@/components/UpsertExpenseModal";
import { useLoading } from "@/context/LoadingContext";
import { deleteExpense, getExpenseById, updateExpense } from "@/services/SupaBaseService";
import { Divider } from "@rneui/themed";
import { useLocalSearchParams, useRouter } from "expo-router/build/hooks";
import Moment from 'moment';
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
export interface ExpenseVO {
    id: string;
    name: string;
    userName: string;
    method_id: string;
    method: string;
    amount: number;
    description: string;
    category_id: string;
    category: string;
    date: string;
}

export default function ExpenseDetails() {
    const router = useRouter();
    const { expenseId } : { expenseId: string } = useLocalSearchParams();
    const [expense, setExpense] = useState<ExpenseVO>();
    const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
    const [updateDialogVisible, setUpdateDialogVisible] = useState(false);
    const { setLoading } = useLoading();

    useEffect(() => {
        setLoading(true);
        getExpenseById(expenseId).then((data) => {
            setExpense(transformDataToVO(data));
            setLoading(false);
        });
    }, [expenseId])

    function transformDataToVO(data: any) {
        const expenseVO: ExpenseVO = {
            id: data.id,
            name: data.name,
            userName: data.profiles.name,
            method_id: data.method_id,
            method: data.payment_method.name,
            amount: data.amount,
            description: data.description,
            category_id: data.category_id,
            category: data.category.name,
            date: Moment(data.created_at).format("DD/MM/YYYY HH:mm"),
        }

        return expenseVO
    }

    function handleDelete() {
        setLoading(true);
        deleteExpense(expenseId).then((error) => {
            setLoading(false); 
            if(!error) {
                setConfirmDialogVisible(false);
                router.back();
            }
        })
    }   

    function handleUpdate(expense: Expense) {
        setLoading(true);
        updateExpense(expenseId, expense).then((error) => {
            setLoading(false);
            if(!error) {
                setUpdateDialogVisible(false);
                router.back();
            }
        })
    }

    return (
        <>
        <ScrollView>
            <View style={styles.expenseContainer}>
                <View style={styles.expenseDetails}>
                    <Text style={styles.expenseTitle}>{expense?.name}</Text>
                    <Divider />
                    <View style={styles.expenseRow}>
                        <Text style={styles.expenseLabel}>Pagado por</Text>
                        <Text style={styles.expenseValue}>{expense?.userName}</Text>
                    </View>
                    <View style={styles.expenseRow}>
                        <Text style={styles.expenseLabel}>Método de pago</Text>
                        <Text style={styles.expenseValue}>{expense?.method}</Text>
                    </View>
                    <View style={styles.expenseRow}>
                        <Text style={styles.expenseLabel}>Monto</Text>
                        <Text style={styles.expenseValue}>${expense?.amount?.toLocaleString("es-AR")}</Text>
                    </View>
                    <View style={styles.expenseRow}>
                        <Text style={styles.expenseLabel}>Descripción</Text>
                        <Text style={styles.expenseValue}>{expense?.description}</Text>
                    </View>
                    <View style={styles.expenseRow}>
                        <Text style={styles.expenseLabel}>Categoría</Text>
                        <Text style={styles.expenseValue}>{expense?.category}</Text>
                    </View>
                    <View style={styles.expenseRow}>
                        <Text style={styles.expenseLabel}>Fecha</Text>
                        <Text style={styles.expenseValue}>{expense?.date}</Text>
                    </View>
                </View>
                <View style={styles.expenseActions}>
                    <CustomButton icon="edit" title="Editar" handlePress={() => setUpdateDialogVisible(true)} />
                    <CustomButton icon="delete" title="Eliminar" handlePress={() => setConfirmDialogVisible(true)} />
                </View>
            </View>
        </ScrollView>
        {expense && <UpsertExpenseModal title='Modificar gasto' visible={updateDialogVisible} setVisible={setUpdateDialogVisible} handleSubmit={handleUpdate} 
                                        expense={{name: expense.name, description: expense.description, category: {id: expense.category_id, name: expense.category}, method: {id: expense.method_id, name: expense.method}, amount: expense.amount}} />}
        <ConfirmDialog visible={confirmDialogVisible} setVisible={setConfirmDialogVisible} message="Estas seguro de eliminar el gasto?" handleConfirm={handleDelete} />
        </>
    );
}

const styles = StyleSheet.create({
    expenseContainer: {
        padding: 20,
        margin: 20,
        backgroundColor: "#fff",
        borderRadius: 20,
        elevation: 1,
    },
    expenseDetails: {
        marginBottom: 20,
    },
    expenseTitle: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 10,
    },
    expenseRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        marginTop: 1,
        backgroundColor: "#f0f0f0ff",
    },
    expenseLabel: {
        fontWeight: "bold",
        fontSize: 16,
    },
    expenseValue: {
        marginLeft: 10,
        fontSize: 16,
    },
    expenseActions: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
});