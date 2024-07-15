import React, { useEffect, useState } from 'react';
import { useDataContext } from '../../contexts/dataContext';
import { Course } from '../../types/courseType';
import { useNavigate, useParams } from 'react-router-dom';


const EditCoursePage: React.FC = () => {
  const navigate = useNavigate();

  const { user, edit } = useDataContext();

  const { courseId } = useParams<{ courseId: string }>();


  const currentCourse: Course = user?.courses ? user.courses.filter((course) => course._id === courseId)[0] : {} as Course;

  const [course, setCourse] = useState<Course>(currentCourse);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCourse((prevCourse: Course) => ({
      ...prevCourse,
      [name]: name.includes('Hours') ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    edit(course);
  };

  const handleReset = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setCourse(currentCourse);
  };

  useEffect(() => {
    setCourse(currentCourse);
  }, [user]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-gray-700 text-2xl font-semibold mb-4">Edit Course</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col md:flex-row md:items-center">
          <label className="block text-gray-600 w-48 text-md font-bold mb-2" htmlFor="courseCode">
            Course Code
          </label>
          <input
            type="text"
            id="courseCode"
            name="courseCode"
            value={course.courseCode}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4 flex flex-col md:flex-row md:items-center">
          <label className="block text-gray-600 w-48 text-md font-bold mb-2" htmlFor="courseName">
            Course Name
          </label>
          <input
            type="text"
            id="courseName"
            name="courseName"
            value={course.courseName}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4 flex flex-col md:flex-row md:items-center">
          <label className="block text-gray-600 w-48 text-md font-bold mb-2" htmlFor="attendedHours">
            Attended Hours
          </label>
          <input
            type="number"
            id="attendedHours"
            name="attendedHours"
            value={course.attendedHours}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4 flex flex-col md:flex-row md:items-center">
          <label className="block text-gray-600 w-48 text-md font-bold mb-2" htmlFor="missedHours">
            Missed Hours
          </label>
          <input
            type="number"
            id="missedHours"
            name="missedHours"
            value={course.missedHours}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4 flex flex-col md:flex-row md:items-center">
          <label className="block text-gray-600 w-48 text-md font-bold mb-2" htmlFor="unknownHours">
            Unknown Hours
          </label>
          <input
            type="number"
            id="unknownHours"
            name="unknownHours"
            value={course.unknownHours}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-3 bg-gray-600 hover:bg-gray-500 text-white py-2 w-full md:w-40 rounded focus:outline-none focus:shadow-outline"
        >
          Update Course
        </button>
        <button
          type="submit"
          className="mt-3 md:ml-3 border-2 border-gray-600 bg-gray-100 hover:bg-gray-200 text-gray-600 py-2 w-full md:w-40 rounded focus:outline-none focus:shadow-outline"
          onClick={handleReset}
        >
          Reset 
        </button>
      </form>
    </div>
  );
};

export default EditCoursePage;
