import { useSelector } from "react-redux";
import { selectIsParentUser, selectIsSuperUser, selectIsTeacherUser } from "../stores/user";
import { SuperUserRoutes } from "./SuperUserRoutes";
import { TeacherUserRoutes } from "./TeacherUserRoutes";
import { ParentUserRoutes } from "./ParentUserRoutes";

export const MainNavigation = () => {
    const isSuperUser = useSelector(selectIsSuperUser);
    const isTeacherUser = useSelector(selectIsTeacherUser);
    const isParentUser = useSelector(selectIsParentUser);

    if(isSuperUser) return ( <SuperUserRoutes />);

    if(isTeacherUser) return ( <TeacherUserRoutes />);

    if(isParentUser) return ( <ParentUserRoutes /> )
    
}