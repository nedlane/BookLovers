// create authService with .login and .logout methods in react native
import { postRequest } from "./postRequest";
export const authService = {
    signIn: async (email: string, password: string) => {
        const submit: { email: string, password: string } = { email: email.toLowerCase(), password: password };
        return await postRequest('/mobile/mobilelogin.php', submit);

    },
    signUp: async (submit: { email: string, password: string, fname: string, sname: string, pcode: string }) => {
        return await postRequest('/mobile/mobileregister.php', submit);
    }
};