'use server'

import { User } from "@/model/user-model";
import { validatePassword } from "@/queries/users";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

export async function updateUserInfo(email,updatedData) {
    try {
        const filter = {email:email};
        await User.findOneAndUpdate(filter,updatedData);
        revalidatePath('/account')
    } catch (error) {
        throw new Error(error);
    }
}


export async function changePassword(email,oldPassword,newPassword,confirmPassword) {
    const isMatch = await validatePassword(email,oldPassword);
    if(!isMatch){
        throw new Error("Please enter a valid current password");
    }

    if(newPassword !== confirmPassword){
        throw new Error(`Error: Password and Confirm Password not Match.`);
    }

    const filter = {email:email};
    const hashedPassword = await bcrypt.hash(newPassword, 5);

    const dataToUpdate = {
        password : hashedPassword
    }

    try {
        await User.findOneAndUpdate(filter,dataToUpdate);
        revalidatePath('/account')
    } catch (error) {
        throw new Error(error);
    }
}