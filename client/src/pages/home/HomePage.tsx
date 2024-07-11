import { useNavigate } from "react-router-dom";
import CourseCard from "../../components/card/CourseCard";
import Loading from "../../components/loading/Loading";
import { useDataContext } from "../../contexts/dataContext";

const HomePage = () => {
    const navigate = useNavigate();
    const { user, isLoading } = useDataContext();

    if (isLoading)
        return <Loading />;

    return (
        <div>
            <div className="border-gray-700 border-b-2">
                <button
                    onClick={() => navigate('/add')}
                >
                    Add Course
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 justify-items-center md:justify-start p-5">
                {user?.courses && user.courses.map((course, index) => (
                    <CourseCard key={index} index={index} course={course} />
                ))}
            </div>
        </div>
    );
};

export default HomePage;