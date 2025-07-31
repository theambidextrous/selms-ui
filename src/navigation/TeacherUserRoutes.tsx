import { Routes, Route } from "react-router";
import NotFound from "../pages/OtherPage/NotFound";
import AppLayout from "../layout/AppLayout";
import { useDispatch, useSelector } from "react-redux";
import { selectIsTeacherUser, userLogout } from "../stores/user";
import { useEffect } from "react";
import {TeacherHome} from "../pages/Dashboard/TeacherHome";
import Blank from "../pages/Blank";
import UserProfiles from "../pages/UserProfiles";

export const TeacherUserRoutes = () => {
    const dispatch = useDispatch();
     const isTeacherUser = useSelector(selectIsTeacherUser);
    useEffect(() => {
        if(!isTeacherUser){
            dispatch(userLogout())
            return;
        }
        return () => {

        }
    }, []);

    return (
        <Routes>
            {/* Dashboard Layout */}
            <Route element={<AppLayout />}>
                <Route index path="/" element={<TeacherHome />} />
                <Route path="/profile" element={<UserProfiles />} />
                <Route path="/blank" element={<Blank />} />
            </Route>

            {/* Fallback Route */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}