import React, { ReactNode, useEffect } from "react";
import { getUserHomes, getUserName } from "../services/SupaBaseService";
import { useAuth } from "./AuthContext";
import { useLoading } from "./LoadingContext";

export interface Home {
    id: string,
    name: string
}

interface UserContextType {
    userName: string,
    setUserName: (name: string) => void,
    homes: Home[],
    setHomes: (homes: Home[]) => void,
    selectedHome: Home,
    setSelectedHome: (home: Home) => void
}

const UserContext = React.createContext<UserContextType>({
    userName: "",
    setUserName: (name: string) => {},
    homes: [],
    setHomes: (homes: Home[]) => {},
    selectedHome: {
        id: "",
        name: ""
    },
    setSelectedHome: (home: Home) => {}
});


export const UserProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useAuth();
    const { setLoading } = useLoading() ;
    const [userName, setUserName] = React.useState('');
    const [homes, setHomes] = React.useState<Home[]>([]);
    const [selectedHome, setSelectedHome] = React.useState<Home>(homes[0]);

    useEffect(()=>{
        if(user){
            setLoading(true);
            const nameP = getUserName(user.id).then(dbUserName =>
                setUserName(dbUserName)
            )
            const homesP = getUserHomes(user.id).then(dbHomes =>{
                console.log(dbHomes)
                setHomes(dbHomes.map(home => ({id: home.home_id, name: home.homes.name})))
                setSelectedHome({    
                    id: dbHomes[0].home_id,
                    name: dbHomes[0].homes.name
                })
            
            }
            )

            Promise.all([nameP, homesP]).then(() => {setLoading(false)});

        }
    }, [user])

    return (
        <UserContext.Provider value={{ userName, setUserName, homes, setHomes, selectedHome, setSelectedHome }} >
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => React.useContext(UserContext);