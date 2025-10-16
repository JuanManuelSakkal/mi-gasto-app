import ConfirmDialog from "@/components/ConfirmDialog";
import CustomButton from "@/components/CustomButton";
import UpsertIncomeModal, { Income } from "@/components/UpsertIncomeModal";
import { useLoading } from "@/context/LoadingContext";
import { deleteIncome, getIncomeById, updateIncome } from "@/services/SupaBaseService";
import { Divider } from "@rneui/themed";
import { useLocalSearchParams, useRouter } from "expo-router/build/hooks";
import Moment from 'moment';
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
export interface IncomeVO {
    id: string;
    name: string;
    userName: string;
    method_id: string;
    method: string;
    amount: number;
    description: string;
    date: string;
}

export default function IncomeDetails() {
    const router = useRouter();
    const { incomeId } : { incomeId: string } = useLocalSearchParams();
    const [income, setIncome] = useState<IncomeVO>();
    const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
    const [updateDialogVisible, setUpdateDialogVisible] = useState(false);
    const { setLoading } = useLoading();

    useEffect(() => {
        setLoading(true);
        getIncomeById(incomeId).then((data) => {
            setIncome(transformDataToVO(data));
            setLoading(false);
        });
    }, [incomeId])

    function transformDataToVO(data: any) {
        const incomeVO: IncomeVO = {
            id: data.id,
            name: data.name,
            userName: data.profiles.name,
            method_id: data.method_id,
            method: data.earning_method.name,
            amount: data.amount,
            description: data.description,
            date: Moment(data.created_at).format("DD/MM/YYYY HH:mm"),
        }

        return incomeVO
    }

    function handleDelete() {
        setLoading(true);
        deleteIncome(incomeId).then((error) => {
            setLoading(false); 
            if(!error) {
                setConfirmDialogVisible(false);
                router.back();
            }
        })
    }   

    function handleUpdate(income: Income) {
        setLoading(true);
        updateIncome(incomeId, income).then((error) => {
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
            <View style={styles.incomeContainer}>
                <View style={styles.incomeDetails}>
                    <Text style={styles.incomeTitle}>{income?.name}</Text>
                    <Divider />
                    <View style={styles.incomeRow}>
                        <Text style={styles.incomeLabel}>Pagado por</Text>
                        <Text style={styles.incomeValue}>{income?.userName}</Text>
                    </View>
                    <View style={styles.incomeRow}>
                        <Text style={styles.incomeLabel}>Método de pago</Text>
                        <Text style={styles.incomeValue}>{income?.method}</Text>
                    </View>
                    <View style={styles.incomeRow}>
                        <Text style={styles.incomeLabel}>Monto</Text>
                        <Text style={styles.incomeValue}>${income?.amount?.toLocaleString("es-AR")}</Text>
                    </View>
                    <View style={styles.incomeRow}>
                        <Text style={styles.incomeLabel}>Descripción</Text>
                        <Text style={styles.incomeValue}>{income?.description}</Text>
                    </View>
                    <View style={styles.incomeRow}>
                        <Text style={styles.incomeLabel}>Fecha</Text>
                        <Text style={styles.incomeValue}>{income?.date}</Text>
                    </View>
                </View>
                <View style={styles.incomeActions}>
                    <CustomButton icon="edit" title="Editar" handlePress={() => setUpdateDialogVisible(true)} />
                    <CustomButton icon="delete" title="Eliminar" handlePress={() => setConfirmDialogVisible(true)} />
                </View>
            </View>
        </ScrollView>
        {income && <UpsertIncomeModal title='Modificar gasto' visible={updateDialogVisible} setVisible={setUpdateDialogVisible} handleSubmit={handleUpdate} 
                                        income={{name: income.name, description: income.description, method: {id: income.method_id, name: income.method}, amount: income.amount}} />}
        <ConfirmDialog visible={confirmDialogVisible} setVisible={setConfirmDialogVisible} message="Estas seguro de eliminar el gasto?" handleConfirm={handleDelete} />
        </>
    );
}

const styles = StyleSheet.create({
    incomeContainer: {
        padding: 20,
        margin: 20,
        backgroundColor: "#fff",
        borderRadius: 20,
        elevation: 1,
    },
    incomeDetails: {
        marginBottom: 20,
    },
    incomeTitle: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 10,
    },
    incomeRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        marginTop: 1,
        backgroundColor: "#f0f0f0ff",
    },
    incomeLabel: {
        fontWeight: "bold",
        fontSize: 16,
    },
    incomeValue: {
        marginLeft: 10,
        fontSize: 16,
    },
    incomeActions: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
});