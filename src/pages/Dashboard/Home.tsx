/* eslint-disable react-hooks/exhaustive-deps */
import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import PeriodicAttendanceChart from "../../components/ecommerce/PeriodicAttendanceChart";
import PeriodicEnrollmentsChart from "../../components/ecommerce/PeriodicEnrollmentsChart";
import RecentOrders from "../../components/ecommerce/RecentOrders";
import PageMeta from "../../components/common/PageMeta";
import { useEffect, useState } from "react";
import { StudentObject } from "../Students";
import { fetchAllStudents, fetchDashboardStat } from "../../service";
import { useDispatch, useSelector } from "react-redux";
import { selectAccessToken } from "../../stores/user";
import { keepStats } from "../../stores/stats";
import { onErrorToast } from "../../util";
import DashboardStats from "../../components/ecommerce/DashboardStats";

export default function Home() {
  const dispatch = useDispatch();
  const [recentStudents, setRecentStudents] = useState<StudentObject[]>([]);
  const bearerToken = useSelector(selectAccessToken) as string;

  const loadCurrentPageData = async () => {
    const {success, data, message } = await fetchAllStudents(bearerToken, 1, 3);
    if(success){
      setRecentStudents(data.data);
    }else {
      onErrorToast(message);
    }

    const statResponse = await fetchDashboardStat(6, bearerToken);
    if(statResponse.success){
      dispatch(keepStats(statResponse.data.data));
    }else{
      onErrorToast(statResponse.message);
    }

  }

  useEffect(() => {
    let mounted = true;
    async function loadRecents(){
      if(mounted){
        await loadCurrentPageData();
      }
    }
    loadRecents();
    return () => {mounted = false};
  }, [])

  return (
    <>
      <PageMeta
        title="School LMS - SELMS"
        description="School LMS - SELMS"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12">
          <DashboardStats />
        </div>

        <div className="col-span-12 space-y-6 xl:col-span-8">
          <EcommerceMetrics />

          <PeriodicAttendanceChart />
        </div>

        <div className="col-span-12 xl:col-span-4">
          <PeriodicEnrollmentsChart />
        </div>

        <div className="col-span-12">
          <RecentOrders data={recentStudents}/>
        </div>
      </div>
    </>
  );
}
