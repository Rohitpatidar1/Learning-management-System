import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetPurchasedCoursesQuery } from "@/features/api/purchaseApi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const { data, isSuccess, isError, isLoading } = useGetPurchasedCoursesQuery();

  if (isLoading)
    return (
      <h1 className="text-xl text-center my-10 font-semibold">Loading...</h1>
    );
  if (isError)
    return (
      <h1 className="text-red-500 text-center my-10">Failed to load data</h1>
    );

  const purchasedCourse = data?.purchasedCourse || [];

  const courseData = purchasedCourse.map((course) => ({
    name: course?.courseId?.courseTitle || "Untitled",
    price: course?.courseId?.coursePrice || 0,
  }));

  const totalRevenue = purchasedCourse.reduce(
    (acc, element) => acc + (element?.amount || 0),
    0
  );
  const totalSales = purchasedCourse.length;

  return (
    <div className="max-w-7xl mx-auto p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {/* Total Sales */}
      <Card className="shadow-md hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-gray-700 text-lg">Total Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold text-blue-600">{totalSales}</p>
        </CardContent>
      </Card>

      {/* Total Revenue */}
      <Card className="shadow-md hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-gray-700 text-lg">Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold text-green-600">₹{totalRevenue}</p>
        </CardContent>
      </Card>

      {/* Empty space for responsiveness */}
      <div className="hidden lg:block"></div>

      {/* Line Chart */}
      <Card className="col-span-1 sm:col-span-2 lg:col-span-4 shadow-md hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-gray-700 text-lg">
            Course Price Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={courseData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="name"
                stroke="#9ca3af"
                angle={-30}
                textAnchor="end"
                interval={0}
              />
              <YAxis stroke="#9ca3af" />
              <Tooltip formatter={(value) => [`₹${value}`]} />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ stroke: "#3b82f6", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
