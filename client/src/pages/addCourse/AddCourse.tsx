import { useState } from "react";
import { useDataContext } from "../../contexts/dataContext";

const AddCoursePage = () => {
  const { add } = useDataContext();

  const [courseCode, setCourseCode] = useState<string>('');
  const [courseName, setCourseName] = useState<string>('');

  const handleClear = () => {
    setCourseCode('');
    setCourseName('');
  };

  const handleSubmit = () => {
    add(courseCode, courseName);
    handleClear();
  };

  return (
    <div className="flex flex-col mt-4  mx-6">
      <div className="text-gray-700 text-2xl font-semibold mb-4">
        Add New Course
      </div>
      <div className="flex flex-col w-full">
        <input
          className="mb-4 border-2 border-gray-300 text-gray-600 focus:outline-gray-400 rounded px-3 py-2"
          placeholder="Course Code"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
        />
        <input 
          className="mb-6 border-2 border-gray-300 text-gray-600 focus:outline-gray-400 rounded px-3 py-2"
          placeholder="Course Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
        <div className="flex flex-col md:flex-row">
          <button
            className="mb-2 mr-5 w-full md:w-44 bg-gray-600 hover:bg-gray-500 py-2 rounded text-white border-none"
            onClick={handleSubmit}
          >
            Add Course
          </button>
          <button
            className="mb-2 border-2 w-full md:w-44 border-gray-600 bg-gray-100 hover:bg-gray-200 py-2 rounded text-gray-700"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  )
};

export default AddCoursePage;
