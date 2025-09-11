'use server'
import { signIn } from "@/auth"

export async function credentialLogin(formData) {    
    try {
        const response = await signIn("credentials",{
            email:formData.get("email")?.toString(),
            password:formData.get("password")?.toString(),
            redirect:false
        })
        
        return response;
    } catch (error) {
        throw new Error(error);
    }
}