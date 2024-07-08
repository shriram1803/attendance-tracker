import CourseCard from "../../components/card/CourseCard";
import { useDataContext } from "../../contexts/dataContext";

const HomePage = () => {
    const { user, isLoading } = useDataContext();

    return (
        <>
            {isLoading ? (
                <div> 
                    <h2>Loading......</h2> 
                </div>
            ) : (
                <div className="grid grid-cols-4 p-5">
                    {user?.courses && user.courses.map((course, index) => (
                        <CourseCard index={index} course={course} />
                    ))}
                </div>
            )}
        </>
    );
};

export default HomePage;