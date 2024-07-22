import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { AttendaceFieldType, Course } from "../../types/courseType";
import { useDataContext } from "../../contexts/dataContext";

interface CourseCardProps {
    index: number;
    course: Course;
};

const CourseCard = (props: CourseCardProps): React.ReactElement => {
    const navigate = useNavigate();
    const { user, edit, remove } = useDataContext();

    const [course, setCourse] = useState<Course>(props.course);

    const totalHours: number = course.attendedHours + course.missedHours + course.unknownHours;

    const percent: number = Number((course.attendedHours * 100 / totalHours).toFixed(2)) || 0;

    const pseudoPercent: number = Number(((course.attendedHours + course.unknownHours) * 100 / totalHours).toFixed(2)) || 0;

    const safe: number = Number(user?.safePercentage || '75');


    const handleEdit = (course: Course) => {
        edit(course);
    };

    const handleDelete = () => {
        const isConfirmed = window.confirm("Are you sure you want to delete this course?");
        if (isConfirmed) {
            remove(course._id);
        }
    };


    const debounceHandler = useCallback(debounce(handleEdit, 1000), []);

    const setChange = (updatedCourse: Course) => {
        setCourse(updatedCourse);
        debounceHandler(updatedCourse);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {  
        if(!isNaN(Number(e.target.value)))      
            setChange({
                ...course,
                [e.target.name]: Number(e.target.value)
            });
    };

    const handleIncrement = (targetField: AttendaceFieldType) => {
        setChange({
            ...course,
            [targetField]: course[targetField] + 1
        });
    };

    const handleDecrement = (targetField: AttendaceFieldType) => {
        if(course[targetField] > 0)
            setChange({
                ...course,
                [targetField]: course[targetField] - 1
            });
    };

    const displayColor: string = (percent >= safe)
        ? 'bg-lime-400'
        : (pseudoPercent >= safe)
            ? 'bg-yellow-500'
            : 'bg-red-500';


    return (
        <div key={props.index} className="col-span-1 grid grid-rows-18 md:grid-rows-6 w-64 lg:w-72 h-72 lg:h-56 rounded-lg mx-4 border-b-4 border-r-2 border-gray-600 shadow-xl">
            <div className="row-span-3 md:row-span-1 flex flex-row justify-between text-sm font-medium border-b-2 border-gray-600 p-2 bg-gray-200 rounded-t-lg">
                <div className="text-left">
                    <p className="cursor-default hover:text-gray-700" title={course.courseName}>
                        {course.courseCode + ' - ' + course.courseName.slice(0, 20)}
                        {course.courseName.length > 20 && '...'}
                    </p>
                </div>
                <div className="text-right flex flex-row">
                    <div>
                        <svg
                            className="h-5 w-5 text-gray-500 mr-2 cursor-pointer hover:scale-110 transform duration-200 "
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none" stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            onClick={() => navigate(`/edit/${course._id}`)}
                        >
                            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                        </svg>
                    </div>
                    <svg
                        className="h-5 w-5 text-red-500 hover:scale-110 cursor-pointer transform duration-200"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        onClick={handleDelete}
                    >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
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
                                onClick={() => handleDecrement('attendedHours')}
                            >
                                -  
                            </button>
                            <input
                                className="w-12 bg-white text-center"
                                name="attendedHours"
                                type="text"
                                value={course.attendedHours}
                                onChange={handleChange}
                            />
                            <button
                                className="rounded-sm px-4 w-full bg-gradient-to-b from-white to-gray-300 font-medium"
                                onClick={() => handleIncrement('attendedHours')}
                            >
                                +
                            </button>
                        </div>

                    </div>
                </div>
                <div className="flex w-full">
                    <div className="w-full grid grid-cols-2 items-center">
                        <div className="col-span-2 lg:col-span-1"><span className="text-xs text-gray-700 my-4">Missed Hours: </span></div>
                        <div className="col-span-2 lg:col-span-1 flex rounded border-2 border-gray-300">
                            <button
                                className="rounded-sm px-4 bg-gradient-to-b from-white to-gray-300 font-medium w-full"
                                onClick={() => handleDecrement('missedHours')}
                            >
                                -
                            </button>
                            <input
                                className="w-12 bg-white text-center"
                                type="text"
                                name="missedHours"
                                value={course.missedHours}
                                onChange={handleChange}
                            />
                            <button
                                className="rounded-sm px-4 w-full bg-gradient-to-b from-white to-gray-300 font-medium"
                                onClick={() => handleIncrement('missedHours')}
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
                                onClick={() => handleDecrement('unknownHours')}
                            >
                                -
                            </button>
                            <input
                                className="w-12 bg-white text-center"
                                type="text"
                                name="unknownHours"
                                value={course.unknownHours}
                                onChange={handleChange}
                            />
                            <button
                                className="rounded-sm px-4 w-full bg-gradient-to-b from-white to-gray-300 font-medium"
                                onClick={() => handleIncrement('unknownHours')}
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