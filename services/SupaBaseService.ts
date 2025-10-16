
import { Expense } from "../components/UpsertExpenseModal";
import { Income } from "../components/UpsertIncomeModal";
import { supabase } from "../supabase/supabase-client";

export const createUser = async (email: string, password: string, name: string) => {
    const { error, data } = await supabase.auth.signUp({ email, password });
    if (error) {
        return error
    } else {
      let id = data.user?.id
      const error = (await supabase.from('profiles').insert({ id, name, email })).error;
      if (error) {
        return error
      }
    }
    return error;
};


export const createHome = async (name: string) => {
    console.log("creating home with name: ", name);
    const { data, error } = await supabase.from('homes').insert({ name }).select();
    const home = data ? data[0] : null ;
    return { error, homeId: home?.id }; 
}

export const createUserHome = async (userId: string, homeName: string) => {
    const home = await createHome(homeName);
    if(home.error || !home.homeId) return {error: home.error, homeId: null}

    console.log("creating user home with homeId: ", home.homeId);
    const { error } = await supabase.from('home_members').insert({ home_id: home.homeId, user_id: userId });

    return { error, homeId: home.homeId };
}

export const createExpense = async (userId: string, homeId: string, expense: Expense) => {
  console.log(expense)
    const { error } = await supabase.from('expenses').insert({ user_id: userId, home_id: homeId, name: 
        expense.name, description: expense.description, method_id: expense.method.id, category_id: expense.category.id, amount: expense.amount });
    console.log(error);
    return error
}

export const createInvite = async (homeId: string, code: string, email: string, createdBy: string) => {
    const { data, error } = await supabase.from('invites').insert({ home_id: homeId, code, email, created_by: createdBy }).select();
    return { data, error}
}

export const authUser = async (email: string, password: string) => {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  return error;
};

export const getUserName = async (id: string) => {
  const { data } = await supabase.from('profiles').select('name').eq('id', id).single();
  return data?.name;
};

export const getHomeIdByUserId = async (id: string) => {
    const { data } = await supabase.from('home_members').select('home_id').eq('user_id', id).single();
    
    return data?.home_id
}

export const getUserHome = async (id: string) => {
    const home_id = await getHomeIdByUserId(id)
    const { data } = await supabase.from('homes').select('name').eq('id', home_id)
    if(!data) return;
    return {name: data[0].name, home_id}
};

export const getUserHomes = async (id: string) => {
  const { data, error } = await supabase.from('home_members').select('home_id, homes(name)').eq('user_id', id);
  if(error) return [];
  return data;
};

export const getMembersIdsByHome = async (homeId: string) => {
  const { data, error } = await supabase.from('home_members').select('user_id').eq('home_id', homeId);
  if(error) return [];
  return data;
};

export const getUsersByHome = async (homeId: string) => {
    const homeMembersIds = await getMembersIdsByHome(homeId); 
    const users: { id: string, name: string }[] = [];
    for(let i = 0; i < homeMembersIds.length; i++) {
        const userName = await getUserName(homeMembersIds[i].user_id);
        users.push({
            id: homeMembersIds[i].user_id,
            name: userName
        })
    }
    return users;
};

export const getExpensesByHome = async (homeId: string) => {
  const { data, error } = await supabase.from('expenses').select("id, name, profiles(name), description, category(name), payment_method(name), amount, created_at").eq('home_id', homeId).order('created_at', { ascending: false });
  if(error) return [];
  return data;
};

export const getExpenseById = async (id: string) => {
  const { data, error } = await supabase.from('expenses').select("id, name, profiles(name), description, category_id, category(name), method_id, payment_method(name), amount, created_at").eq('id', id).single();
  if(error) return null;
  return data;
}

export const getCategories = async () => {
  const { data, error } = await supabase.from('category').select("id, name");
  console.log(error);
  if(error) return [];
  return data;
};

export const getPaymentMethods = async () => {
  const { data, error } = await supabase.from('payment_method').select("id, name");
  if(error) return [];
  return data;
};

export const updateUserName = async (id: string, name: string) => {
  const { error } = await supabase.from('profiles').update({ name }).eq('id', id);
  return error;
};

export const updateUserEmail = async (id: string, email: string) => {
  const { data, error: authError } = await supabase.auth.updateUser({
      email: email
    });
  if(authError) return authError

  const { error } = await supabase.from('profiles').update({ email }).eq('id', id);
  return error;
}

export const checkUserPassword = async (email: string, password: string) => {
  const { error } = await supabase.auth.signInWithPassword({email, password });
  return error;
}

export const updateUserPassword = async (password: string) => {
  console.log("calling updateUserPassword: " + password);
  const { error } = await supabase.auth.updateUser({
      password: password
    });
  return error;
}

export const getIncomesByHome = async (homeId: string) => {
  const { data, error } = await supabase.from('incomes').select("id, name, profiles(name), description, amount, earning_method(name), created_at").eq('home_id', homeId).order('created_at', { ascending: false });
  console.log("incomes error", error);
  if(error) return [];
  return data;
};

export const getIncomeById = async (id: string) => {
  const { data, error } = await supabase.from('incomes').select("id, name, profiles(name), description, amount, method_id, earning_method(name), created_at").eq('id', id).single();
  if(error) return null;
  return data;
}

export const createIncome = async (userId: string, homeId: string, income: Income) => {
    const { error } = await supabase.from('incomes').insert({ user_id: userId, home_id: homeId, name: 
        income.name, description: income.description, amount: income.amount });
    console.log(error);
    return error
}

export const getEarningMethods = async () => {
  const { data, error } = await supabase.from('earning_method').select("id, name");
  if(error) return [];
  return data;
};

export const deleteExpense = async (id: string) => {
    const { error } = await supabase.from('expenses').delete().eq('id', id)
    return error
};

export const updateExpense = async (id: string, expense: Expense) => {
  const { error } = await supabase.from('expenses').update({ name: expense.name, category_id: expense.category.id, method_id: expense.method.id, description: expense.description, amount: expense.amount }).eq('id', id);
  return error
}

export const deleteIncome = async (id: string) => {
    const { error } = await supabase.from('incomes').delete().eq('id', id)
    return error
};

export const updateIncome = async (id: string, income: Income) => { 
  const { error } = await supabase.from('incomes').update({ name: income.name, method_id: income.method.id, description: income.description, amount: income.amount }).eq('id', id);
  return error
}