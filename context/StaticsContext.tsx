


import { getCategories, getEarningMethods, getPaymentMethods } from "@/services/SupaBaseService";
import React, { useEffect } from "react";
import { useLoading } from "./LoadingContext";

interface Category {
    id: string,
    name: string,
}
interface PaymentMethod {
    id: string,
    name: string,
}
interface EarningMethod {
    id: string,
    name: string,
}

interface StaticsContextType {
    categories: Category[],
    paymentMethods: PaymentMethod[],
    earningMethods: EarningMethod[],
}


const StaticsContext = React.createContext<StaticsContextType>({categories: [], paymentMethods: [], earningMethods: []});

export default function StaticsProvider({children}: {children: React.ReactNode}) {
    const {setLoading} = useLoading();
    const [categories , setCategories] = React.useState<Category[]>([]);
    const [paymentMethods, setPaymentMethods] = React.useState<PaymentMethod[]>([]);
    const [earningMethods, setEarningMethods] = React.useState<EarningMethod[]>([]);

    useEffect(() => {
        setLoading(true);
        Promise.all([
            getCategories().then(dbCategories => setCategories(dbCategories)),
            getPaymentMethods().then(dbPaymentMethods => setPaymentMethods(dbPaymentMethods)),
            getEarningMethods().then(dbEarningMethods => setEarningMethods(dbEarningMethods)),
        ]).then(() => {setLoading(false)});
    }, []);

    return (
        <StaticsContext.Provider value={{categories, paymentMethods, earningMethods}}>
            {children}
        </StaticsContext.Provider>
    )
}


export const useStatics = () => React.useContext(StaticsContext);