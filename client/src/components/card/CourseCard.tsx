import { useState } from "react";
import { Course } from "../../types/courseType";
import { removeCourse } from "../../apis/courseApi";
import { useDataContext } from "../../contexts/dataContext";

interface CourseCardProps {
    index: number;
    course: Course;
};

const CourseCard = (props: CourseCardProps): React.ReactElement => {
    const { remove } = useDataContext();

    const course: Course = props.course;

    const percent: number = course.totalHours ? Math.round(course.attendedHours / course.totalHours) : 0;

    const [percentage, setPercentage] = useState<string>(String(percent));
    
    const handleEdit = () => {

    };

    const handleDelete = () => {
        remove(course._id || '');
    };


    return (

        <div key={props.index} className="col-span-1 w-64 lg:w-72 h-64 lg:h-48 rounded-lg bg-gradient-to-b  from-green-100 to-green-200 mx-4   border-b-4 border-r-2 border-gray-500   shadow-xl">
            <div className="text-center text-sm font-medium border-b-2 border-gray-300 p-2">{course.courseName}</div>


            <div className="flex w-full">
                <div className="mx-2 w-full grid grid-cols-2 items-center px-4">
                    <div className="col-span-2 lg:col-span-1"><span className="text-xs text-gray-700  my-4">Attended Hours: </span></div>
                    <div className="col-span-2 lg:col-span-1  flex rounded border-2 border-gray-300">
                        <button className="rounded-sm px-4 bg-gradient-to-b from-white to-gray-300 font-medium w-full">-</button>
                        <input className="w-12 bg-white text-center" type="text" value={course.attendedHours} onChange={(e) => {}}></input>
                        <button className="rounded-sm px-4 w-full  bg-gradient-to-b from-white to-gray-300 font-medium">+</button>
                    </div>

                </div>
            </div>
            <div className="flex w-full">
                <div className="mx-2 w-full grid grid-cols-2 items-center px-4">
                    <div className="col-span-2 lg:col-span-1"><span className="text-xs text-gray-700  my-4">Attended Hours: </span></div>
                    <div className="col-span-2 lg:col-span-1  flex rounded border-2 border-gray-300">
                        <button className="rounded-sm px-4 bg-gradient-to-b from-white to-gray-300 font-medium w-full">-</button>
                        <input className="w-12 bg-white text-center" type="text" value={course.attendedHours} onChange={(e) => {}}></input>
                        <button className="rounded-sm px-4 w-full  bg-gradient-to-b from-white to-gray-300 font-medium">+</button>
                    </div>

                </div>
            </div>
            <div className="flex w-full">
                <div className="mx-2 w-full grid grid-cols-2 items-center px-4">
                    <div className="col-span-2 lg:col-span-1"><span className="text-xs text-gray-700  my-4">Attended Hours: </span></div>
                    <div className="col-span-2 lg:col-span-1  flex rounded border-2 border-gray-300">
                        <button className="rounded-sm px-4 bg-gradient-to-b from-white to-gray-300 font-medium w-full">-</button>
                        <input className="w-12 bg-white text-center" type="text" value={course.attendedHours} onChange={(e) => {}}></input>
                        <button className="rounded-sm px-4 w-full  bg-gradient-to-b from-white to-gray-300 font-medium">+</button>
                    </div>

                </div>
            </div>
            

            <div className="w-full text-center">
                <input
                    className="w-8"
                    type="text"
                    disabled={true}
                    value={percentage}
                    onChange={(e) => setPercentage(e.target.value)}
                />
                {/* <button
                    hidden={!allowPercentageEdit}
                    onClick={handlePercentageChange}
                >
                    OK
                </button> */}
            </div>

            {/* <div className="w-full text-center">
                <label className="flex items-center text-sm">
                    <input
                        className="w-6 mr-2"
                        type="checkbox"
                        // value={allowPercentageEdit}
                        checked={allowPercentageEdit}
                        onClick={(e) => setPercentageEdit(!allowPercentageEdit)}
                    />
                    Allow Percentage Edit
                </label>
            </div> */}



            <div className="flex flex-row grid-cols-2 w-full text-center">
                <div className="row-span-1">
                    <button
                        onClick={handleEdit}
                    >
                        Edit
                    </button>
                </div>
                <div className="row-span-1">
                    <button
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                </div>
            </div>

        </div>
    );
};

export default CourseCard;