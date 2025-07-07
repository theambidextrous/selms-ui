import { useSelector } from "react-redux";
import { Link } from "react-router";
import { langSelector, selectWordTranslation } from "../../stores/translation";
import { textAlign } from "../../util";

interface BreadcrumbProps {
  pageTitle: string;
  subTitle?: string;
}

const PageBreadcrumb: React.FC<BreadcrumbProps> = ({ pageTitle , subTitle}) => {
  const currentLang = useSelector(langSelector);
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
      <div className="min-w-xs">
        <h2
          className={`${textAlign(currentLang)} text-xl font-semibold text-gray-800 dark:text-white/90`}
          x-text="pageName"
        >
          {useSelector(selectWordTranslation(pageTitle))}
        </h2>
        <p className={` ${textAlign(currentLang)} text-sm text-gray-800 dark:text-white/70 my-2`}>
          {useSelector(selectWordTranslation(subTitle as string))} 
        </p>
      </div>
      <nav>
        <ol className="flex items-center gap-1.5">
          <li>
            <Link
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
              to="/"
            >
               {useSelector(selectWordTranslation('Home'))}
              <svg
                className="stroke-current"
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                  stroke=""
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </li>
          <li className="text-sm text-gray-800 dark:text-white/90">
            {useSelector(selectWordTranslation(pageTitle))}
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default PageBreadcrumb;
