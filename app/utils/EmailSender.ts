import { supabase } from "../supabase/supabase-client";


export const sendEmail = async (to: string, subject: string, html: string) => {
    console.log("sending email to: ", to);
    const { data, error } = await supabase.functions.invoke('resend-email', { body:{ to, subject, html }});
    return error;
}