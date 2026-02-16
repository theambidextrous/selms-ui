import { useEffect } from "react";
import PageMeta from "../../components/common/PageMeta";



export const ParentHome: React.FC = () => {

  const onLoadPageData = async () => { }

  useEffect(() => {
    async function LoadDefaults() {
      await onLoadPageData();
    }
    LoadDefaults();
  }, [])

  return (
    <>
      <PageMeta
        title="School LMS - SELMS"
        description="School LMS - SELMS"
      />
      <div className="">

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">My Students</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">STU001</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">John Smith</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">john.smith@email.com</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">10th</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">STU002</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Emma Watson</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">emma.w@email.com</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">11th</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">STU003</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Michael Chen</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">m.chen@email.com</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">10th</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">STU004</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Sarah Johnson</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">s.johnson@email.com</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">12th</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">STU005</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">David Brown</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">d.brown@email.com</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">9th</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mt-5">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Performance</h2>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Student</label>
            <select id="student-select" className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="" disabled selected>Choose a student...</option>
              <option value="STU001">John Smith (10th Grade)</option>
              <option value="STU002">Emma Watson (11th Grade)</option>
              <option value="STU003">Michael Chen (10th Grade)</option>
              <option value="STU004">Sarah Johnson (12th Grade)</option>
              <option value="STU005">David Brown (9th Grade)</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Term</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Mathematics</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">95%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">A</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Term 1</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Science</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">88%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">B+</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Term 1</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">English</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">92%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">A-</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Term 1</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">History</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">85%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">B</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Term 1</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Computer Science</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">98%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">A+</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Term 1</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
            <div className="bg-gray-50 p-3 rounded-lg">
              <span className="text-gray-500 block">Average</span>
              <span className="text-xl font-semibold text-gray-900">91.6%</span>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <span className="text-gray-500 block">Highest</span>
              <span className="text-xl font-semibold text-gray-900">98%</span>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <span className="text-gray-500 block">Lowest</span>
              <span className="text-xl font-semibold text-gray-900">85%</span>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};