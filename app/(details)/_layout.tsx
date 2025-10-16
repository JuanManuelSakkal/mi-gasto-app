import { AuthProvider } from "@/context/AuthContext";
import { HomeProvider } from "@/context/HomeContext";
import LoadingContextProvider from "@/context/LoadingContext";
import StaticsProvider from "@/context/StaticsContext";
import SuccessAnimationContextProvider from "@/context/SuccessAnimationContext";
import { UserProvider } from "@/context/UserContext";
import { Stack } from "expo-router";
import React from "react";



export default function DetailsLayout() {
    return (
        <LoadingContextProvider>
            <SuccessAnimationContextProvider>
            <AuthProvider>
                <UserProvider>
                    <StaticsProvider>
                    <HomeProvider>
                        <Stack screenOptions={{ headerShown: true, headerTintColor: 'white', headerTitleStyle: { color: 'white' }, headerStyle: {backgroundColor: '#4f46e5' } }}>
                            <Stack.Screen options={{ headerTitle: 'Detalles'}} name="expenses/[expenseId]" />
                            <Stack.Screen options={{ headerTitle: 'Detalles'}} name="incomes/[incomeId]" />
                        </Stack>
                    </HomeProvider>
                    </StaticsProvider>
                </UserProvider>
            </AuthProvider>
            </SuccessAnimationContextProvider>
        </LoadingContextProvider>
    );
}