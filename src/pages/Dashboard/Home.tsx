import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
import RecentOrders from "../../components/ecommerce/RecentOrders";
import PageMeta from "../../components/common/PageMeta";
import { useEffect, useState } from "react";
import { StudentObject } from "../Students";
import { fetchAllStudents } from "../../service";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../stores/user";

export default function Home() {
  const [recentStudents, setRecentStudents] = useState<StudentObject[]>([]);
  const bearerToken = useSelector(selectAccessToken) as string;
  useEffect(() => {
    let mounted = true;
    async function loadRecents(){
      if(mounted){
        const {success, data } = await fetchAllStudents(bearerToken, 1, 3);
        if(success){
          setRecentStudents(data.data);
        }
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
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics />

          <MonthlySalesChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget />
        </div>

        <div className="col-span-12">
          <RecentOrders data={recentStudents}/>
        </div>
      </div>
    </>
  );
}
