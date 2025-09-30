"use client";

import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { changeLessonPublishState, deleteLesson } from "@/app/actions/lesson";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export const LessonActions = ({ lesson, moduleId, onDelete, courseId }) => {

  const [action, setAction] = useState(null);
  const [published, setPublished] = useState(lesson?.active);
  const router = useRouter();

  
  async function handleSubmit(e) {
    e.preventDefault();
    // console.log(action);
    try {
      switch (action) {
        case "change-active": {
              const activeState = await changeLessonPublishState(lesson?.id);
              setPublished(!activeState);
              toast.success("The lesson has been updated successfully.");
              router.refresh();
              break
            }
        case "delete": {
              if (published) {
                toast.error("Please unpublish lesson can not be deleted. First unpublish it, then delete it.");
              }else{
                await deleteLesson(lesson?.id, moduleId);
                toast.success("Lesson deleted successfully!");
                onDelete();
                router.push(`/dashboard/courses/${courseId}/modules/${moduleId}`);
              }
              break;
            }
        default:
          throw toast.error("Invalid Lesson action.");
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-x-2">
        <Button variant="outline" size="sm" onClick={() => setAction("change-active")}>
          {published ? "Unpublish" : "Publish"}
        </Button>

        <Button size="sm" onClick={() => setAction("delete")}>
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};
