import { Routes, Route } from "react-router";
import NotFound from "../pages/OtherPage/NotFound";
import AppLayout from "../layout/AppLayout";
import { useDispatch, useSelector } from "react-redux";
import { selectIsParentUser, userLogout } from "../stores/user";
import { useEffect } from "react";
import Blank from "../pages/Blank";
import UserProfiles from "../pages/UserProfiles";
import { ParentHome } from "../pages/Dashboard/ParentHome";

export const ParentUserRoutes = () => {
    const dispatch = useDispatch();
     const isParentuser = useSelector(selectIsParentUser);
    useEffect(() => {
        if(!isParentuser){
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
                <Route index path="/" element={<ParentHome />} />
                <Route path="/profile" element={<UserProfiles />} />
                <Route path="/blank" element={<Blank />} />
            </Route>

            {/* Fallback Route */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}