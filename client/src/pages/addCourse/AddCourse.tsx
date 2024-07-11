import { useState } from "react";
import { useDataContext } from "../../contexts/dataContext";

const AddCoursePage = () => {
  const { add } = useDataContext();

  const [courseCode, setCourseCode] = useState<string>('');
  const [courseName, setCourseName] = useState<string>('');

  const handleSubmit = () => {
    add(courseCode, courseName);
    setCourseCode('');
    setCourseName('');
  };

  return (
    <div>
      <div className="flex flex-col grid-cols-1 w-56 items-center">
        <div>
          <input
            className="col-span-1 m-2 border-2 border-black"
            placeholder="Course Code"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
          />
          <input
            className="col-span-1 m-2 border-2 border-black"
            placeholder="Course Name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
        </div>
        <button
          className="col-span-1 m-2 w-24 border-2 border-black"
          onClick={handleSubmit}
        >
          Add Course
        </button>
      </div>
    </div>
  )
};

export default AddCoursePage;
