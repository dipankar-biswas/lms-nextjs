"use client";

import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { changeModulePublishState, deleteModule } from "@/app/actions/module";

export const ModuleActions = ({ module, courseId }) => {

  const [action, setAction] = useState(null);
  const [published, setPublished] = useState(module?.active);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    // console.log(action);
    try {
      switch (action) {
        case "change-active": {
              const activeState = await changeModulePublishState(module?.id);
              setPublished(!activeState);
              toast.success("The module has been updated successfully.");
              router.refresh();
              break
            }
        case "delete": {
              if (published) {
                toast.error("Please unpublish module can not be deleted. First unpublish it, then delete it.");
              }else{
                await deleteModule(module?.id, courseId);
                toast.success("Module deleted successfully!");
                router.push(`/dashboard/courses/${courseId}`);
              }
              break;
            }
        default:
          throw toast.error("Invalid Module action.");
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
