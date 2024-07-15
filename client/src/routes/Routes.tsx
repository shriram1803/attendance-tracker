import { Route } from "react-router-dom";
import EditCoursePage from "../pages/editCourse/EditCoursePage";
import HomePage from "../pages/home/HomePage";
import AddCoursePage from "../pages/addCourse/AddCourse";
import ProfilePage from "../pages/profile/ProfilePage";

export interface RouteType {
    path: string;
    key: string;
    component: React.ReactElement;
    index?: boolean;
};

const appRoutes: RouteType[] = [
    {
        path: '/',
        key: 'home',
        component: <HomePage />,
        index: true
    },
    {
        path: 'edit/:courseId',
        key: 'editcourse',
        component: <EditCoursePage />
    },
    {
        path: 'add',
        key: 'addcourse',
        component: <AddCoursePage />
    },
    {
        path: 'profile',
        key: 'profile',
        component: <ProfilePage />
    }
];

const RoutesProvider = (routes: RouteType[]): React.ReactNode => {
    return routes.map((route) => (
        <Route key={route.key} path={route.path} element={route.component} />
    ));
};

const routes: React.ReactNode = RoutesProvider(appRoutes);

export default routes;