import { Dialog } from "@rneui/themed";
import React from "react";


const LoadingContext = React.createContext({loading: false, setLoading: (loading: boolean) => {}});

export default function LoadingContextProvider({children}: {children: React.ReactNode}) {
    const [loading, setLoading] = React.useState(false);
    return (
        <LoadingContext.Provider value={{loading, setLoading}}>
            {children}
                  
            <Dialog isVisible={loading}>
                <Dialog.Loading />
            </Dialog>
        </LoadingContext.Provider>
    )
}


export const useLoading = () => React.useContext(LoadingContext);