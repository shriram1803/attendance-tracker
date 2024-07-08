import { Route } from "react-router-dom";
import EditCoursePage from "../pages/editCourse/EditCoursePage";
import HomePage from "../pages/home/HomePage";

export interface RouteType {
    path: string;
    component: React.ReactElement;
    index?: boolean;
};

const appRoutes: RouteType[] = [
    {
        path: '/',
        component: <HomePage />,
        index: true
    },
    {
        path: 'editcourse',
        component: <EditCoursePage />
    }
];

const RoutesProvider = (routes: RouteType[]): React.ReactNode => {
    return routes.map((route) => (
        <Route path={route.path} element={route.component} />
    ));
};

const routes: React.ReactNode = RoutesProvider(appRoutes);

export default routes;