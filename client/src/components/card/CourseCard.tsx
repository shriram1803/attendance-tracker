import { useState } from "react";
import { AttendaceFieldType, Course } from "../../types/courseType";
import { useDataContext } from "../../contexts/dataContext";

interface CourseCardProps {
    index: number;
    course: Course;
};

const CourseCard = (props: CourseCardProps): React.ReactElement => {
    const { user, edit, remove, increment, decrement } = useDataContext();

    const course: Course = props.course;

    const percent: number = course.totalHours ? Number((course.attendedHours * 100 / course.totalHours).toFixed(2)) : 0;

    const pseudoPercent: number = course.totalHours ? Number(((course.attendedHours + course.unknownHours) * 100 / course.totalHours).toFixed(2)) : 0;

    const [attendedHours, setAttendedHours] = useState<number>(course.attendedHours);
    const [unknownHours, setUnknownHours] = useState<number>(course.unknownHours);
    const [totalHours, setTotalHours] = useState<number>(course.totalHours);


    const handleEdit = () => {
        const updatedCourse: Course = {
            _id: course._id,
            courseCode: course.courseCode,
            courseName: course.courseName,
            attendedHours: attendedHours,
            totalHours: totalHours,
            unknownHours: unknownHours
        } as Course;
        edit(updatedCourse);
    };

    const handleIncrement = (targetField: AttendaceFieldType) => {
        increment(course._id, targetField);
    };

    const handleDecrement = (targetField: AttendaceFieldType) => {
        decrement(course._id, targetField);
    };

    const handleDelete = () => {
        const isConfirmed = window.confirm("Are you sure you want to delete this course?");
        if (isConfirmed) {
            remove(course._id);
        }
    };

    
    const displayColor: string = (percent >= (user?.safePercentage || 75))
        ? 'bg-lime-400'
        : (pseudoPercent >= (user?.safePercentage || 75))
            ? 'bg-yellow-500'
            : 'bg-red-500';

    
    return (
        <div key={props.index} className="col-span-1 grid grid-rows-18 md:grid-rows-6 w-64 lg:w-72 h-72 lg:h-56 rounded-lg mx-4 border-b-4 border-r-2 border-gray-600 shadow-xl">
            <div className="row-span-3 md:row-span-1 flex flex-row justify-between text-sm font-medium border-b-2 border-gray-600 p-2 bg-gray-200 rounded-t-lg">
                <div className="text-left">
                    {course.courseName}
                </div>
                <div className="text-right flex flex-row">
                    <svg
                        className="h-6 w-6 text-indigo-500 mr-2 cursor-pointer"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none" stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        onClick={() => { alert("feature still in dev") }}
                    >
                        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                    </svg>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="#EF0107"
                        className="h-6 w-6 cursor-pointer"
                        onClick={handleDelete}
                    >
                        <path
                            d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375z" />
                        <path
                            fillRule="evenodd"
                            d="M3.087 9l.54 9.176A3 3 0 006.62 21h10.757a3 3 0 002.995-2.824L20.913 9H3.087zm6.163 3.75A.75.75 0 0110 12h4a.75.75 0 010 1.5h-4a.75.75 0 01-.75-.75z"
                            clipRule="evenodd" />
                    </svg>
                </div>
            </div>

            <div className="row-span-11 md:row-span-3 p-2 md:space-y-2">
                <div className="flex w-full">
                    <div className="w-full grid grid-cols-2 items-center">
                        <div className="col-span-2 lg:col-span-1"><span className="text-xs text-gray-700 my-4">Attended Hours: </span></div>
                        <div className="col-span-2 lg:col-span-1 flex rounded border-2 border-gray-300">
                            <button
                                className="rounded-sm px-4 bg-gradient-to-b from-white to-gray-300 font-medium w-full"
                                onClick={() => {
                                    handleDecrement('attendedHours');
                                    setAttendedHours(attendedHours - 1);
                                }}
                            >
                                -
                            </button>
                            <input
                                className="w-12 bg-white text-center"
                                type="text"
                                value={attendedHours}
                                onChange={(e) => setAttendedHours(Number(e.target.value))}
                                onBlur={handleEdit}
                            />
                            <button
                                className="rounded-sm px-4 w-full bg-gradient-to-b from-white to-gray-300 font-medium"
                                onClick={() => {
                                    handleIncrement('attendedHours');
                                    setAttendedHours(attendedHours + 1);
                                }}
                            >
                                +
                            </button>
                        </div>

                    </div>
                </div>
                <div className="flex w-full">
                    <div className="w-full grid grid-cols-2 items-center">
                        <div className="col-span-2 lg:col-span-1"><span className="text-xs text-gray-700 my-4">Total Hours: </span></div>
                        <div className="col-span-2 lg:col-span-1 flex rounded border-2 border-gray-300">
                            <button
                                className="rounded-sm px-4 bg-gradient-to-b from-white to-gray-300 font-medium w-full"
                                onClick={() => {
                                    handleDecrement('totalHours');
                                    setTotalHours(totalHours - 1);
                                }}
                            >
                                -
                            </button>
                            <input
                                className="w-12 bg-white text-center"
                                type="text"
                                value={totalHours}
                                onChange={(e) => setTotalHours(Number(e.target.value))}
                                onBlur={handleEdit}
                            />
                            <button
                                className="rounded-sm px-4 w-full bg-gradient-to-b from-white to-gray-300 font-medium"
                                onClick={() => {
                                    handleIncrement('totalHours');
                                    setTotalHours(totalHours + 1);
                                }}
                            >
                                +
                            </button>
                        </div>

                    </div>
                </div>
                <div className="flex w-full">
                    <div className="w-full grid grid-cols-2 items-center">
                        <div className="col-span-2 lg:col-span-1"><span className="text-xs text-gray-700 my-4">Unknown Hours: </span></div>
                        <div className="col-span-2 lg:col-span-1 flex rounded border-2 border-gray-300">
                            <button
                                className="rounded-sm px-4 bg-gradient-to-b from-white to-gray-300 font-medium w-full"
                                onClick={() => {
                                    handleDecrement('unknownHours');
                                    setUnknownHours(unknownHours - 1);
                                }}
                            >
                                -
                            </button>
                            <input
                                className="w-12 bg-white text-center"
                                type="text"
                                value={unknownHours}
                                onChange={(e) => setUnknownHours(Number(e.target.value))}
                                onBlur={handleEdit}
                            />
                            <button
                                className="rounded-sm px-4 w-full bg-gradient-to-b from-white to-gray-300 font-medium"
                                onClick={() => {
                                    handleIncrement('unknownHours');
                                    setUnknownHours(unknownHours + 1);
                                }}
                            >
                                +
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            <div className={`row-span-4 w-full text-center h-full flex flex-col justify-center ${displayColor}`}>
                <div className="text-sm font-medium text-gray-700"> Attendance Percentage</div>
                <div className="text-2xl font-semibold" >{percent} %</div>
            </div>

        </div>
    );
};

export default CourseCard;