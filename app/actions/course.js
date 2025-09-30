'use server'

import { getLoggedInUser } from "@/lib/loggedin-user";
import { Course } from "@/model/course-model";
import { create } from "@/queries/courses";



export async function createCourse(data) {
    try {
        const loggedinUser = await getLoggedInUser();
        data["instructor"] = loggedinUser?.id;
        const course = await create(data);
        return course;
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



export async function changeCoursePublishState(courseId) {
    const course = await Course.findById(courseId);
    try {
        const res = await Course.findByIdAndUpdate(courseId,{ active: !course.active },{lean:true});
        return res.active;
    } catch (error) {
        throw new Error(error);
    }
}

export async function deleteCourse(courseId) {
    try {
        await Course.findByIdAndDelete(courseId);
    } catch (error) {
        throw new Error(error);
    }
}