import { AttendanceItem } from "../service";

export const formatAttendanceData = (data: AttendanceItem[]): { series: any[], categories: string[] } => {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  const processedData = data.map(item => ({
    month: item.month,
    year: item.year,
    present: parseInt(item.present) || 0,
    absent: parseInt(item.absent) || 0
  }));

  processedData.sort((a, b) => {
    return new Date(a.year, a.month - 1).getTime() - new Date(b.year, b.month - 1).getTime();
  });

  const earliestDate = processedData.length > 0 
    ? new Date(processedData[0].year, processedData[0].month - 1)
    : new Date();

  const result = [...processedData];
  while (result.length < 6) {
    earliestDate.setMonth(earliestDate.getMonth() - 1);
    result.unshift({
      month: earliestDate.getMonth() + 1,
      year: earliestDate.getFullYear(),
      present: 0,
      absent: 0
    });
  }

  const categories = result.map(item => {
    const date = new Date(item.year, item.month - 1);
    return `${monthNames[date.getMonth()]}`;
  });

  const presentData = result.map(item => item.present);
  const absentData = result.map(item => item.absent);

  const series = [
    {
      name: 'Present',
      data: presentData
    },
    {
      name: 'Absent',
      data: absentData
    }
  ];

  return { series, categories };
}