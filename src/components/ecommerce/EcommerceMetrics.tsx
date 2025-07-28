import { useSelector } from "react-redux";
import {
  ArrowUpIcon,
  BoxIconLine,
  GroupIcon,
} from "../../icons";
import { langSelector, selectWordTranslation } from "../../stores/translation";
import Badge from "../ui/badge/Badge";
import { textAlign } from "../../util";

export default function EcommerceMetrics() {
  const currentLang = useSelector(langSelector);
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className={`${textAlign(currentLang)} text-sm text-gray-500 dark:text-gray-400`}>
              {useSelector(selectWordTranslation("Students"))}
            </span>
            <h4 className={`${textAlign(currentLang)} mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90`}>
              {useSelector(selectWordTranslation("1,782"))}
            </h4>
          </div>
          <Badge color="success">
            <ArrowUpIcon />
            {useSelector(selectWordTranslation("2.01%"))}
          </Badge>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className={`${textAlign(currentLang)} text-sm text-gray-500 dark:text-gray-400 `}>
              {useSelector(selectWordTranslation("Programs"))}
            </span>
            <h4 className={`${textAlign(currentLang)} mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90`}>
              {useSelector(selectWordTranslation("11"))}
            </h4>
          </div>

          <Badge color="success">
            <ArrowUpIcon />
            {useSelector(selectWordTranslation("0.05%"))}
          </Badge>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
    </div>
  );
}
