import { useDataContext } from "../../contexts/dataContext";

const HomePage = () => {
    const { user, logout } = useDataContext();

    return (
        <>
            {user?.courses.map((course, index) => (
                <div key={index}>
                    <p>{course.courseCode}</p>                    
                </div>
            ))}
            <button value={'logout'} onClick={logout} >
                logout
            </button>
        </>
    );
};

export default HomePage;