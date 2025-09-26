'use server'

import { getLoggedInUser } from "@/lib/loggedin-user";
import { Course } from "@/model/course-model";
import { create } from "@/queries/courses";



export async function createCourse(data) {
    try {
        const loggedinUser = await getLoggedInUser();
        data["instructor"] = loggedinUser?.id;
        const course = await create(data);
    } catch (error) {
        throw new Error(error);
    }
}

export async function updateCourse(courseId,dataToUpdate) {
    try {
        await Course.findByIdAndUpdate(courseId,dataToUpdate);
    } catch (error) {
        throw new Error(error);
    }
}


// export async function changePassword(email,oldPassword,newPassword,confirmPassword) {
//     const isMatch = await validatePassword(email,oldPassword);
//     if(!isMatch){
//         throw new Error("Please enter a valid current password");
//     }

//     if(newPassword !== confirmPassword){
//         throw new Error(`Error: Password and Confirm Password not Match.`);
//     }

//     const filter = {email:email};
//     const hashedPassword = await bcrypt.hash(newPassword, 5);

//     const dataToUpdate = {
//         password : hashedPassword
//     }

//     try {
//         await User.findOneAndUpdate(filter,dataToUpdate);
//         revalidatePath('/account')
//     } catch (error) {
//         throw new Error(error);
//     }
// }