import { Outlet } from "react-router-dom";
import Login from "./components/login";

const useAuth = () => {
    const userToken = localStorage.getItem("token")
    return userToken;
};

const ProtectedRoutes = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Login />;
};

export default ProtectedRoutes;