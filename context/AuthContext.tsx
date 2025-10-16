import { Session, User } from '@supabase/supabase-js';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { getUserName } from '../services/SupaBaseService';
import { supabase } from '../supabase/supabase-client';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  userName: string;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  userName: '',
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      if(data.session && data.session.user){
        getUserName(data.session.user.id).then(dbUserName =>
          setUserName(dbUserName)
        )
      }
      setLoading(false);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription?.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ session, user, userName, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);