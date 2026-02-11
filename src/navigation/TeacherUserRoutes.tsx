import { Routes, Route } from "react-router";
import NotFound from "../pages/OtherPage/NotFound";
import AppLayout from "../layout/AppLayout";
import { useDispatch, useSelector } from "react-redux";
import { selectIsTeacherUser, userLogout } from "../stores/user";
import { useEffect } from "react";
import {TeacherHome} from "../pages/Dashboard/TeacherHome";
import Blank from "../pages/Blank";
import UserProfiles from "../pages/UserProfiles";
import TeacherAttendances from "../pages/Performance/TeacherAttendances";
import TeacherPerformanceByStudent from "../pages/Report/TeacherPerformanceByStudent";
import TeacherPerformanceByForm from "../pages/Report/TeacherPerformanceByForm";
import TeacherPerformanceByStream from "../pages/Report/TeacherPerformanceByStream";
import TeacherPerformances from "../pages/Performance/TeacherPerformances";

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

                {/* Attendance */}
                <Route path="/teacher/performances" element={<TeacherPerformances />} />
                <Route path="/teacher/attendance" element={<TeacherAttendances />} />
    
                {/* Performance */}
                <Route path="/teacher/by-student" element={<TeacherPerformanceByStudent />} />
                <Route path="/teacher/by-level" element={<TeacherPerformanceByForm />} />
                <Route path="/teacher/by-stream" element={<TeacherPerformanceByStream />} />
            </Route>

            {/* Fallback Route */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}