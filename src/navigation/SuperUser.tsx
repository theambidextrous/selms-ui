import { Routes, Route } from "react-router";
import NotFound from "../pages/OtherPage/NotFound";
import UserProfiles from "../pages/UserProfiles";
import Students from "../pages/Students";
import Blank from "../pages/Blank";
import AppLayout from "../layout/AppLayout";
import Home from "../pages/Dashboard/Home";
import Teachers from "../pages/Teachers";
import Terms from "../pages/Academics/Terms";
import Forms from "../pages/Academics/Forms";
import Streams from "../pages/Academics/Streams";
import Enrollment from "../pages/Academics/Enrollment";
import Subjects from "../pages/Academics/Subjects";
import AssessmentGroups from "../pages/Performance/AssessmentGroups";
import Scales from "../pages/Performance/Scales";
import Performances from "../pages/Performance/Performances";
import TeacherSubjects from "../pages/TeacherSubjects";
import TimeTableCalendarView from "../pages/TimeTabling/TimeTableCalendarView";
import TimeTableGridView from "../pages/TimeTabling/TimeTableGridView";
import Attendances from "../pages/Performance/Attendances";
import Expenses from "../pages/Performance/Expenses";
import Revenue from "../pages/Performance/Revenue";
import Setups from "../pages/Performance/Setups";
import UsersManagement from "../pages/Performance/UsersManagement";
import Translations from "../pages/Performance/Translations";
import Catalogues from "../pages/Performance/Catalogues";
import Books from "../pages/Performance/Books";
import BooksBorrowing from "../pages/Performance/BooksBorrowing";
import Sports from "../pages/Performance/Sports";

export const SuperUser = () => (
   <Routes>
        {/* Dashboard Layout */}
        <Route element={<AppLayout />}>
        <Route index path="/" element={<Home />} />
        {/* Others Page */}
        <Route path="/students" element={<Students />} />
        {/* Teachers */}
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/teacher-subjects" element={<TeacherSubjects />} />
        <Route path="/profile" element={<UserProfiles />} />
        <Route path="/blank" element={<Blank />} />
        {/* Academics */}
        <Route path="/terms" element={<Terms />} />
        <Route path="/forms" element={<Forms />} />
        <Route path="/forms-streams" element={<Streams />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/enrollments" element={<Enrollment />} />
        {/* Performance */}
        <Route path="/assessments" element={<AssessmentGroups />} />
        <Route path="/grading-scales" element={<Scales />} />
        <Route path="/performances" element={<Performances />} />
        <Route path="/attendance" element={<Attendances />} />
        {/* Time tabling */}
        <Route path="/time-tabling" element={<TimeTableGridView />} />
        <Route path="/time-table-view" element={<TimeTableCalendarView />} />
        {/* Finance */}
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/revenue" element={<Revenue />} />
        {/* Administration */}
        <Route path="/setups" element={<Setups />} />
        <Route path="/translations" element={<Translations />} />
        <Route path="/user-management" element={<UsersManagement />} />
        {/* Library */}
        <Route path="/catalogues" element={<Catalogues />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books-borrowing" element={<BooksBorrowing />} />
        {/* Sports */}
        <Route path="/sports" element={<Sports />} />    
        </Route>
        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
    </Routes>
)