import { Course } from "../../types/courseType";

interface CourseCardProps {
    index: number;
    course: Course;
};

const CourseCard = (props: CourseCardProps): React.ReactElement => {
    const course: Course = props.course;

    return (

        <div key={props.index} className="col-span-1 h-48 rounded-lg bg-gradient-to-b  from-green-100 to-green-200 mx-4   border-b-4 border-r-2 border-gray-500   shadow-xl">
            <div className="text-center text-sm font-medium border-b-2 border-gray-300 p-2">{course.courseName}</div>


            <div className="flex w-full">
                <div className="mx-2 w-full grid grid-cols-2 items-center">
                    <div className="col-span-1"><span className="text-xs text-gray-700  my-4">Attended Hours: </span></div>
                    <div className="col-span-1 flex rounded border-2 border-gray-300">
                        <button className="rounded-sm px-4 bg-gradient-to-b from-white to-gray-300 font-medium w-full">-</button>
                        <input className="w-12 bg-white text-center" type="text" value={course.attendedHours}></input>
                        <button className="rounded-sm px-4 w-full  bg-gradient-to-b from-white to-gray-300 font-medium">+</button>
                    </div>

                </div>
            </div>
            <div className="flex w-full">
                <div className="mx-2 w-full grid grid-cols-2 items-center">
                    <div className="col-span-1"><span className="text-xs text-gray-700  my-4">Attended Hours: </span></div>
                    <div className="col-span-1 flex rounded border-2 border-gray-300">
                        <button className="rounded-sm px-4 bg-gradient-to-b from-white to-gray-300 font-medium w-full">-</button>
                        <input className="w-12 bg-white text-center" type="text" value={course.attendedHours}></input>
                        <button className="rounded-sm px-4 w-full  bg-gradient-to-b from-white to-gray-300 font-medium">+</button>
                    </div>

                </div>
            </div>


        </div>
    );
};

export default CourseCard;