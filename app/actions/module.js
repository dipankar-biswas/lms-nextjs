'use server'

import { replaceMongoIdInObject } from "@/lib/convertData";
import { Course } from "@/model/course-model";
import { Lesson } from "@/model/lesson-model";
import { Module } from "@/model/module-model";
import { create } from "@/queries/modules";
import mongoose from "mongoose";


export async function createModule(data) {
    try {
        const title = data.get('title');
        const slug = data.get('slug');
        const courseId = data.get('courseId');
        const order = data.get('order');
        
        const createdModule = await create({title,slug,course:courseId,order});
        const course = await Course.findById(courseId);
        course.modules.push(createdModule._id);
        course.save();
        
        return createModule;
    } catch (error) {
        throw new Error(error);
    }
}

export async function reorderModules(modules) {
    try {
        await new Promise.all(modules.map(async(mod) => {
            await Module.findByIdAndUpdate(mod?.id, { order: mod.position });
        }));
    } catch (error) {
        throw new Error(error);
    }
}

export async function getModule(moduleId) {
    try {
        const module = await Module.findById(moduleId)
        .populate({
            path: 'lessonIds',
            model: Lesson
        }).lean();
        return replaceMongoIdInObject(module);
    } catch (error) {
        throw new Error(error);
    }
}


export async function updateModule(moduleId,dataToUpdate) {
    try {
        await Module.findByIdAndUpdate(moduleId,dataToUpdate);
    } catch (error) {
        throw new Error(error);
    }
}



export async function changeModulePublishState(moduleId) {
    const module = await Module.findById(moduleId);
    try {
        const res = await Module.findByIdAndUpdate(moduleId,{ active: !module.active },{lean:true});
        return res.active;
    } catch (error) {
        throw new Error(error);
    }
}

export async function deleteModule(moduleId, courseId) {
    try {
        const course = await Course.findById(courseId);
        course.modules.pull(new mongoose.Types.ObjectId(moduleId));
        await Module.findByIdAndDelete(moduleId);
        course.save();
    } catch (error) {
        throw new Error(error);
    }
}