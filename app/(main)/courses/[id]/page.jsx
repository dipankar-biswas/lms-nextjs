import React from 'react';
import CourseDetails from "./_components/CourseDetails";
import CourseDetailsIntro from "./_components/CourseDetailsIntro";
import Testimonials from "./_components/Testimonials";
import RelatedCourse from "./_components/RelatedCourse";
import { getCourseDetails } from '@/queries/courses';
import { replaceMongoIdInArray } from '@/lib/convertData';

const SingleCoursePage = async ({params}) => {

  const course = await getCourseDetails(params.id);
  
  
  return (
    <>

      <CourseDetailsIntro  course={course} />

      <CourseDetails course={course} />

      {course?.testimonials && <Testimonials testimonials={replaceMongoIdInArray(course?.testimonials)} />}
      
      <RelatedCourse/>
      
    </>
  );
};
export default SingleCoursePage;
