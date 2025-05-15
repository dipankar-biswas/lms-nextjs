import { getCourseDetails } from "@/queries/courses";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { ENROLLMENT_DATA, getInstructorDashboardData } from "@/lib/dashboard-helper";
import { ObjectId } from "mongoose";


const EnrollmentsPage = async ({ params: { courseId } }) => {

  const course = await getCourseDetails(courseId);
  const allEnrollments = await getInstructorDashboardData(ENROLLMENT_DATA);
  const EnrollmentData = sanitizeData(allEnrollments);
  const enrollmentDataForCourse = EnrollmentData.filter((enrollment) => enrollment?.course?.toString() === courseId);
  

  return (
    <div className="p-6">
      <h2 className="text-2xl text-gray-900">{course?.title}</h2>
      <DataTable columns={columns} data={enrollmentDataForCourse} />
    </div>
  );
};


// Sanitize function for handle ObjectId and Buffer
function sanitizeData(data){
  return JSON.parse(
    JSON.stringify(data,(key,value) => {
      if(value instanceof ObjectId){
        return value.toString();
      }
      if(Buffer.isBuffer(value)){
        return value.toString("base64");
      }
      return value;
    })
  )
}


export default EnrollmentsPage;
