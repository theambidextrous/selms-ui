import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { MoreDotIcon } from "../../icons";
import { useSelector } from "react-redux";
import { selectWordTranslation } from "../../stores/translation";
import { selectDashboardStats } from "../../stores/stats";
import { DashboardStatObject, RangeItem } from "../../service";

export default function PeriodicEnrollmentsChart() {
  const dashboardStats = useSelector(selectDashboardStats);
  const periodicTarget = 1000;

  const getPeriodicSeriesPercent = (segment: RangeItem) => 
    parseFloat(((segment.current/periodicTarget) * 100).toFixed(2));
  
  const options: ApexOptions = {
    colors: ["#465FFF"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "radialBar",
      height: 330,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -85,
        endAngle: 85,
        hollow: {
          size: "80%",
        },
        track: {
          background: "#E4E7EC",
          strokeWidth: "100%",
          margin: 5,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontSize: "36px",
            fontWeight: "600",
            offsetY: -40,
            color: "#1D2939",
            formatter: function (val) {
              return val + "%";
            },
          },
        },
      },
    },
    fill: {
      type: "solid",
      colors: ["#465FFF"],
    },
    stroke: {
      lineCap: "round",
    },
    labels: [useSelector(selectWordTranslation("Progress"))],
  };
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  const chartPercentVal = (segment: RangeItem) => {
    return segment.ratio > 0 ? `+${segment.ratio}%` : `-${segment.ratio}`;
  }

  const chartPercentClass = (stat: DashboardStatObject) => {
    if(!stat || stat.enrollment.ratio >= 0 ){
      return 'absolute left-1/2 top-full -translate-x-1/2 -translate-y-[95%] rounded-full bg-success-50 px-3 py-1 text-xs font-medium text-success-600 dark:bg-success-500/15 dark:text-success-500';
    }
    return `absolute left-1/2 top-full -translate-x-1/2 -translate-y-[95%] rounded-full bg-error-50 px-3 py-1 text-xs font-medium text-error-600 dark:bg-error-500/15 dark:text-error-500`
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 dark:bg-gray-900 sm:px-6 sm:pt-6">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
             { useSelector(selectWordTranslation("Enrollment Trends"))}
            </h3>
            <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
              { useSelector(selectWordTranslation("Learner enrollment over time"))}
            </p>
          </div>
          <div className="relative inline-block">
            <button className="dropdown-toggle" onClick={toggleDropdown}>
              <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
            </button>
            <Dropdown
              isOpen={isOpen}
              onClose={closeDropdown}
              className="w-40 p-2"
            >
              <DropdownItem
                onItemClick={closeDropdown}
                className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                { useSelector(selectWordTranslation("View More"))}
              </DropdownItem>
            </Dropdown>
          </div>
        </div>
        <div className="relative ">
          <div className="max-h-[330px]" id="chartDarkStyle">
          { dashboardStats && (
              <Chart
                options={options}
                series={[getPeriodicSeriesPercent(dashboardStats.enrollment)]}
                type="radialBar"
                height={330}
              />
            )}
          </div>

          <span className={chartPercentClass(dashboardStats as any)}>
            { useSelector(selectWordTranslation(
              dashboardStats ? (chartPercentVal(dashboardStats.enrollment)) : '+0%'
            ))}
          </span>
        </div>
        <p className="mx-auto mt-10 w-full max-w-[380px] text-center text-sm text-gray-500 sm:text-base">
          { useSelector(selectWordTranslation(
            `You enrolled ${ dashboardStats ? dashboardStats.enrollment.current as any : '0'} learners this period, it's a good progress. Keep up your good work`
          ))}
        </p>
      </div>

      <div className="flex items-center justify-center gap-5 px-6 py-3.5 sm:gap-8 sm:py-5">
        <div>
          <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
            { useSelector(selectWordTranslation("Total"))}
          </p>
          <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
            { useSelector(selectWordTranslation(
              dashboardStats ? dashboardStats.enrollment.total as any : '0'
            ))}

            { dashboardStats && dashboardStats.enrollment.ratio < 0  ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.39859 13.6632C8.26115 13.8192 8.0599 13.9176 7.83565 13.9176C7.83525 13.9176 7.83484 13.9176 7.83444 13.9176C7.64227 13.9178 7.45002 13.8447 7.30336 13.6981L3.3032 9.70076C3.0102 9.40797 3.0101 8.9331 3.30289 8.6401C3.59563 8.3471 4.0705 8.34694 4.3635 8.63973L7.08565 11.36L7.08565 2.5C7.08565 2.08579 7.42144 1.75 7.83565 1.75C8.24987 1.75 8.58565 2.08579 8.58565 2.5L8.58565 11.3556L11.3032 8.63975C11.5962 8.34695 12.0711 8.3471 12.3639 8.64008C12.6567 8.93307 12.6565 9.40794 12.3635 9.70074L8.39859 13.6632Z"
                  fill="#f13b04ff"
                />
              </svg>
            ) : (
               <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.60141 2.33683C7.73885 2.18084 7.9401 2.08243 8.16435 2.08243C8.16475 2.08243 8.16516 2.08243 8.16556 2.08243C8.35773 2.08219 8.54998 2.15535 8.69664 2.30191L12.6968 6.29924C12.9898 6.59203 12.9899 7.0669 12.6971 7.3599C12.4044 7.6529 11.9295 7.65306 11.6365 7.36027L8.91435 4.64004L8.91435 13.5C8.91435 13.9142 8.57856 14.25 8.16435 14.25C7.75013 14.25 7.41435 13.9142 7.41435 13.5L7.41435 4.64442L4.69679 7.36025C4.4038 7.65305 3.92893 7.6529 3.63613 7.35992C3.34333 7.06693 3.34348 6.59206 3.63646 6.29926L7.60141 2.33683Z"
                    fill="#039855"
                  />
                </svg>
            )}
          </p>
        </div>

        <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

        <div>
          <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
            { useSelector(selectWordTranslation("Last Period"))}
          </p>
          <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
            { useSelector(selectWordTranslation(
              dashboardStats ? dashboardStats.enrollment.previous as any : '0'
            ))}
            { dashboardStats && dashboardStats.enrollment.ratio < 0  ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.39859 13.6632C8.26115 13.8192 8.0599 13.9176 7.83565 13.9176C7.83525 13.9176 7.83484 13.9176 7.83444 13.9176C7.64227 13.9178 7.45002 13.8447 7.30336 13.6981L3.3032 9.70076C3.0102 9.40797 3.0101 8.9331 3.30289 8.6401C3.59563 8.3471 4.0705 8.34694 4.3635 8.63973L7.08565 11.36L7.08565 2.5C7.08565 2.08579 7.42144 1.75 7.83565 1.75C8.24987 1.75 8.58565 2.08579 8.58565 2.5L8.58565 11.3556L11.3032 8.63975C11.5962 8.34695 12.0711 8.3471 12.3639 8.64008C12.6567 8.93307 12.6565 9.40794 12.3635 9.70074L8.39859 13.6632Z"
                  fill="#f13b04ff"
                />
              </svg>
            ) : (
               <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.60141 2.33683C7.73885 2.18084 7.9401 2.08243 8.16435 2.08243C8.16475 2.08243 8.16516 2.08243 8.16556 2.08243C8.35773 2.08219 8.54998 2.15535 8.69664 2.30191L12.6968 6.29924C12.9898 6.59203 12.9899 7.0669 12.6971 7.3599C12.4044 7.6529 11.9295 7.65306 11.6365 7.36027L8.91435 4.64004L8.91435 13.5C8.91435 13.9142 8.57856 14.25 8.16435 14.25C7.75013 14.25 7.41435 13.9142 7.41435 13.5L7.41435 4.64442L4.69679 7.36025C4.4038 7.65305 3.92893 7.6529 3.63613 7.35992C3.34333 7.06693 3.34348 6.59206 3.63646 6.29926L7.60141 2.33683Z"
                    fill="#039855"
                  />
                </svg>
            )}
          </p>
        </div>

        <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

        <div>
          <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
            { useSelector(selectWordTranslation("This Period"))}
          </p>
          <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
            { useSelector(selectWordTranslation(
              dashboardStats ? dashboardStats.enrollment.current as any : '0'
            ))}
           { dashboardStats && dashboardStats.enrollment.ratio < 0  ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.39859 13.6632C8.26115 13.8192 8.0599 13.9176 7.83565 13.9176C7.83525 13.9176 7.83484 13.9176 7.83444 13.9176C7.64227 13.9178 7.45002 13.8447 7.30336 13.6981L3.3032 9.70076C3.0102 9.40797 3.0101 8.9331 3.30289 8.6401C3.59563 8.3471 4.0705 8.34694 4.3635 8.63973L7.08565 11.36L7.08565 2.5C7.08565 2.08579 7.42144 1.75 7.83565 1.75C8.24987 1.75 8.58565 2.08579 8.58565 2.5L8.58565 11.3556L11.3032 8.63975C11.5962 8.34695 12.0711 8.3471 12.3639 8.64008C12.6567 8.93307 12.6565 9.40794 12.3635 9.70074L8.39859 13.6632Z"
                  fill="#f13b04ff"
                />
              </svg>
            ) : (
               <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.60141 2.33683C7.73885 2.18084 7.9401 2.08243 8.16435 2.08243C8.16475 2.08243 8.16516 2.08243 8.16556 2.08243C8.35773 2.08219 8.54998 2.15535 8.69664 2.30191L12.6968 6.29924C12.9898 6.59203 12.9899 7.0669 12.6971 7.3599C12.4044 7.6529 11.9295 7.65306 11.6365 7.36027L8.91435 4.64004L8.91435 13.5C8.91435 13.9142 8.57856 14.25 8.16435 14.25C7.75013 14.25 7.41435 13.9142 7.41435 13.5L7.41435 4.64442L4.69679 7.36025C4.4038 7.65305 3.92893 7.6529 3.63613 7.35992C3.34333 7.06693 3.34348 6.59206 3.63646 6.29926L7.60141 2.33683Z"
                    fill="#039855"
                  />
                </svg>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
