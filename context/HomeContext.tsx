import Moment from 'moment';
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { getExpensesByHome, getIncomesByHome, getUsersByHome } from "../services/SupaBaseService";
import { generateRandomHexColor } from '../utils/RandomColorGenerator';
import { useLoading } from "./LoadingContext";
import { useUser } from "./UserContext";


interface HomeContextType {
    fetchExpenses: () => Promise<void>;
    fetchIncomes: () => void;
    expenses: Expense[];
    incomes: Income[];
    members: User[];
    memberExpenses: MemberExpenses;
    memberIncomes: MemberIncomes;
    userColors: UserColors
}

export interface Expense {
    id: string;
    name: string;
    payer: string;
    description: string;
    method: string;
    category: string;
    amount: number;
    created_at: string;
}

export interface Income {
    id: string;
    name: string;
    depositor: string;
    description: string;
    method: string;
    amount: number;
    created_at: string;
}

interface User {
    id: string;
    name: string;
}

export interface MemberExpenses {
    [key: string]: Expense[]
}

export interface MemberIncomes {
    [key: string]: Income[]
}

export interface UserColors {
    [key: string]: string
}

const HomeContext = createContext<HomeContextType>({
    fetchExpenses: () => Promise.resolve(),
    fetchIncomes: () => { },
    expenses: [],
    incomes: [],
    members: [],
    memberExpenses: {},
    memberIncomes: {},
    userColors: {}
});

export const HomeProvider = ({ children }: { children: ReactNode }) => {
    const [userColors, setUserColors] = useState<UserColors>({});
    const { selectedHome } = useUser();
    const { setLoading } = useLoading() ;
    const [members, setMembers] = useState<User[]>([]);
    const [memberExpenses, setMemberExpenses] = useState<MemberExpenses>({});
    const [memberIncomes, setMemberIncomes] = useState<MemberIncomes>({});
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [incomes, setIncomes] = useState<Income[]>([]);
    
    useEffect(() => {
        if(!selectedHome) return 
        setLoading(true);
        getUsersByHome(selectedHome.id).then(data => {
            if(!data) return
            setMembers(data);
            const colors: UserColors = {};
            data.forEach(homeMember => {
                colors[homeMember.name] = generateRandomHexColor();
            });
            setUserColors(colors);
            setLoading(false);
        }); 
    }, [selectedHome]);
    
    useEffect(() => {
        if(!selectedHome) return 
        fetchExpenses();
        fetchIncomes();
    }, [selectedHome]);

    
    useEffect(() => {
        const memberExpenses: MemberExpenses = {};
            expenses.forEach(expense => {
                const userId = members.find(member => member.name === expense.payer)?.id;
                if(!userId) return
                if(!memberExpenses[userId]) {
                    memberExpenses[userId] = [];
                }
                memberExpenses[userId].push(expense);
            });
            setMemberExpenses(memberExpenses);
    }, [expenses, members]);
    
    useEffect(() => {
        const memberIncomes: MemberIncomes = {};
            incomes.forEach(income => {
                const userId = members.find(member => member.name === income.depositor)?.id;
                if(!userId) return
                if(!memberIncomes[userId]) {
                    memberIncomes[userId] = [];
                }
                memberIncomes[userId].push(income);
            });
            setMemberIncomes(memberIncomes);
    }, [incomes, members]);

    async function fetchExpenses() {
        setLoading(true);
        return getExpensesByHome(selectedHome.id).then(data => {
            if(!data) return
            setExpenses(data.map((expense) => {
                return {
                    id: expense.id,
                    name: expense.name,
                    payer: expense.profiles.name,
                    description: expense.description,
                    method: expense.payment_method.name,
                    category: expense.category.name,
                    amount: expense.amount,
                    created_at: Moment(expense.created_at).format('DD/MM/YYYY HH:mm')
                }
            }));
            setLoading(false);
        })
    }

    function fetchIncomes() {
        setLoading(true);
        getIncomesByHome(selectedHome.id).then(data => {
            if(!data) return
            setIncomes(data.map((income) => {
                return {
                    id: income.id,
                    name: income.name,
                    depositor: income.profiles.name,
                    description: income.description,
                    method: income.earning_method.name,
                    amount: income.amount,
                    created_at: Moment(income.created_at).format('DD/MM/YYYY HH:mm')
                }
            }));
            setLoading(false);
        })
    }


    return (
        <HomeContext.Provider value={{ fetchExpenses, fetchIncomes, expenses, incomes, members, memberExpenses, memberIncomes, userColors }} >
            {children}
        </HomeContext.Provider>
    )
}

export const useHome = () => useContext(HomeContext);