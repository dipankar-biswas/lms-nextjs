'use client'
import { Button } from "@/components/ui/button"
import { getCourses } from "@/queries/courses";
import { toast } from "sonner"


export default async function Home() {
  const handleClick = (mode) => {
    mode ? toast.success('Test Success') : toast.error('Test Error');
  }
  const courses = await getCourses();
  console.log(courses);
  
  return (
    <div>
      <h1 className="bg-black text-white text-center text-5xl font-bold">Dipankar Biswas</h1>
      <Button variant="destructive" onClick={()=>handleClick(true)}>Destructive</Button>
    </div>
  );
}
