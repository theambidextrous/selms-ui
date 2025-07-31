import { useSelector } from "react-redux";
import { selectIsSuperUser, selectIsTeacherUser } from "../stores/user";
import { SuperUserRoutes } from "./SuperUserRoutes";
import { TeacherUserRoutes } from "./TeacherUserRoutes";

export const MainNavigation = () => {
    const isSuperUser = useSelector(selectIsSuperUser);
    const isTeacherUser = useSelector(selectIsTeacherUser);

    if(isSuperUser) return ( <SuperUserRoutes />);

    if(isTeacherUser) return ( <TeacherUserRoutes />);
    
}