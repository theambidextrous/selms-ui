import { Routes, Route } from "react-router";
import NotFound from "../pages/OtherPage/NotFound";
import UserProfiles from "../pages/UserProfiles";
import Students from "../pages/Students";
import Videos from "../pages/UiElements/Videos";
import Images from "../pages/UiElements/Images";
import Alerts from "../pages/UiElements/Alerts";
import Badges from "../pages/UiElements/Badges";
import Avatars from "../pages/UiElements/Avatars";
import Buttons from "../pages/UiElements/Buttons";
import LineChart from "../pages/Charts/LineChart";
import BarChart from "../pages/Charts/BarChart";
import Calendar from "../pages/Calendar";
import BasicTables from "../pages/Tables/BasicTables";
import Blank from "../pages/Blank";
import AppLayout from "../layout/AppLayout";
import Home from "../pages/Dashboard/Home";
import Teachers from "../pages/Teachers";
import Terms from "../pages/Academics/Terms";
import Forms from "../pages/Academics/Forms";
import Streams from "../pages/Academics/Streams";
import Enrollment from "../pages/Academics/Enrollment";

export const SuperUser = () => (
   <Routes>
        {/* Dashboard Layout */}
        <Route element={<AppLayout />}>
        <Route index path="/" element={<Home />} />
        {/* Others Page */}
        <Route path="/students" element={<Students />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/profile" element={<UserProfiles />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/blank" element={<Blank />} />
        {/* Academics */}
        <Route path="/terms" element={<Terms />} />
        <Route path="/forms" element={<Forms />} />
        <Route path="/forms-streams" element={<Streams />} />
        <Route path="/enrollments" element={<Enrollment />} />
        {/* Tables */}
        <Route path="/basic-tables" element={<BasicTables />} />
        {/* Ui Elements */}
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/avatars" element={<Avatars />} />
        <Route path="/badge" element={<Badges />} />
        <Route path="/buttons" element={<Buttons />} />
        <Route path="/images" element={<Images />} />
        <Route path="/videos" element={<Videos />} />
        {/* Charts */}
        <Route path="/line-chart" element={<LineChart />} />
        <Route path="/bar-chart" element={<BarChart />} />
        </Route>
        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
    </Routes>
)