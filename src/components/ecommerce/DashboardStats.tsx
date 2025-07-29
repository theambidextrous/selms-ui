import { useSelector } from "react-redux";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  FolderIcon,
  GroupIcon,
  UserCircleIcon,
} from "../../icons";
import { langSelector, selectWordTranslation } from "../../stores/translation";
import Badge from "../ui/badge/Badge";
import { textAlign } from "../../util";
import { selectDashboardStats } from "../../stores/stats";
import { useNavigate } from "react-router";

export default function DashboardStats() {
  const currentLang = useSelector(langSelector);
  const dashboardStats = useSelector(selectDashboardStats);
  const navigate = useNavigate();
  const onItemClicked = (to: string) => navigate(to);
  
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
      {/* <!-- Metric Item Start --> */}
      <div onClick={() => onItemClicked('/students')} className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 cursor-pointer">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className={`${textAlign(currentLang)} text-sm text-gray-500 dark:text-gray-400`}>
              {useSelector(selectWordTranslation("Students"))}
            </span>
            <h4 className={`${textAlign(currentLang)} mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90`}>
              { dashboardStats && dashboardStats.students.current}
            </h4>
          </div>
          {
            dashboardStats && dashboardStats.students.ratio < 0  ? (
              <Badge color="error">
                <ArrowDownIcon />
                { dashboardStats ? dashboardStats.students?.ratio as any : '0.0'  }%
              </Badge>
            ):
            (
              <Badge color="success">
                <ArrowUpIcon />
                { dashboardStats ? dashboardStats.students?.ratio as any : '0.0'  }%
              </Badge>
            )
          }
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div onClick={() => onItemClicked('/subjects')} className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 cursor-pointer">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <FolderIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className={`${textAlign(currentLang)} text-sm text-gray-500 dark:text-gray-400 `}>
              {useSelector(selectWordTranslation("Programs"))}
            </span>
            <h4 className={`${textAlign(currentLang)} mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90`}>
              { dashboardStats && dashboardStats.programs }
            </h4>
          </div>

          <Badge color="success">
            <ArrowUpIcon />
            {useSelector(selectWordTranslation("0.00%"))}
          </Badge>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

           {/* <!-- Metric Item Start --> */}
      <div onClick={() => onItemClicked('/teachers')} className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 cursor-pointer">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <UserCircleIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className={`${textAlign(currentLang)} text-sm text-gray-500 dark:text-gray-400`}>
              {useSelector(selectWordTranslation("Teachers"))}
            </span>
            <h4 className={`${textAlign(currentLang)} mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90`}>
              { dashboardStats && dashboardStats.teachers.current}
            </h4>
          </div>
          {
            dashboardStats && dashboardStats.teachers.ratio < 0  ? (
              <Badge color="error">
                <ArrowDownIcon />
                { dashboardStats ? dashboardStats.teachers?.ratio as any : '0.0'  }%
              </Badge>
            ):
            (
              <Badge color="success">
                <ArrowUpIcon />
                { dashboardStats ? dashboardStats.teachers?.ratio as any : '0.0'  }%
              </Badge>
            )
          }
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
    
    </div>
  );
}
