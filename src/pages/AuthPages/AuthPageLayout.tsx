import React from "react";
import GridShape from "../../components/common/GridShape";
import { Link } from "react-router";
import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";
import { keepLang, langSelector } from "../../stores/translation";
import { useDispatch, useSelector } from "react-redux";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const currentLang = useSelector(langSelector);
  const handleLangChange = (e:any) => {
    const lang: string = e.target.value;
    dispatch(keepLang(lang));
  };

  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
        <p className="px-5 py-5">
          <select value={currentLang} onChange={handleLangChange} name="lang" className="">
            <option value={'en'}>EN</option>
            <option value={'ar'}>AR</option>
          </select>
        </p>
        {children}
        <div className="items-center hidden w-full h-full lg:w-1/2 bg-gray-200 dark:bg-white/5 lg:grid">
          <div className="relative flex items-center justify-center z-1">
            {/* <!-- ===== Common Grid Shape Start ===== --> */}
            <GridShape />
            <div className="flex flex-col items-center max-w-xs">
              <Link to="/" className="block mb-4">
                <img
                  width={231}
                  height={48}
                  src="/images/selms-logo.png"
                  alt="Logo"
                />
              </Link>
              <p className="text-center text-gray-400 dark:text-white/60">
                School LMS - SELMS
              </p>
            </div>
          </div>
        </div>
        <div className="fixed z-50 hidden bottom-6 right-6 sm:block">
          <ThemeTogglerTwo />
        </div>
      </div>
    </div>
  );
}
