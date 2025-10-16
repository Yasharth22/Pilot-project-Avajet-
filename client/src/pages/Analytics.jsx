import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis
} from "recharts";

// --- Sample Data ---
const maintenanceData = [
  { name: 'A Check', downtime: 40 },
  { name: 'B Check', downtime: 55 },
  { name: 'C Check', downtime: 180 },
  { name: 'D Check', downtime: 150 },
];
const failureData = [
  { name: 'Engine #1', rate: 95 },
  { name: 'APU', rate: 85 },
  { name: 'Landing Gear', rate: 40 },
  { name: 'Avionics', rate: 35 },
];
const complianceData = [
  { name: 'AD Completed', value: 75 },
  { name: 'SB Outstanding', value: 15 },
  { name: 'EO Outstanding', value: 10 },
];
const complianceColors = ['#22C55E', '#F97316', '#EF4444'];
const defectsData = [
    { reg: 'N12345', desc: 'Engine Oil Leak', days: 15, cat: 'CAT B' },
    { reg: 'N54321', desc: 'Cracked window pane', days: 12, cat: 'CAT C' },
    { reg: 'N67890', desc: 'Landing gear sensor fail', days: 8, cat: 'CAT A' },
];
// Data for the Stat Card Gauges
const airworthyData = [{ name: 'Airworthy', value: 98.5 }];
const aogData = [{ name: 'AOG', value: 20 }];
const defectsGaugeData = [{ name: 'Defects', value: 45 }];
const checksData = [{ name: 'Checks', value: 75 }];


const Analytics = () => {
  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* Maintenance Due Forecast */}
        <Card className="lg:col-span-2 shadow-lg rounded-xl border border-gray-200 flex flex-col h-[350px]">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">Maintenance Due Forecast</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={maintenanceData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip />
                <Legend wrapperStyle={{fontSize: "14px"}} />
                <Bar dataKey="downtime" name="Estimated Downtime (Hours)" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top 5 Components by High Failure Rate */}
        <Card className="lg:col-span-2 shadow-lg rounded-xl border border-gray-200 flex flex-col h-[350px]">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">Top 5 Components by High Failure Rate</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
             <ResponsiveContainer width="100%" height="100%">
              <BarChart data={failureData} layout="vertical" margin={{ top: 20, right: 20, left: 30, bottom: 5 }}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" stroke="#6b7280" fontSize={12} width={100} />
                <Tooltip />
                <Bar dataKey="rate" name="Failure Rate" fill="#EF4444" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Mandatory Compliance Status */}
        <Card className="lg:col-span-2 shadow-lg rounded-xl border border-gray-200 flex flex-col h-[350px]">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">Mandatory Compliance Status</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                    <Pie data={complianceData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={5}>
                        {complianceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={complianceColors[index % complianceColors.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend wrapperStyle={{fontSize: "14px"}} />
                </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {/* Top 10 Open Deferred Defects List */}
        <Card className="lg:col-span-2 shadow-lg rounded-xl border border-gray-200 flex flex-col h-[350px]">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">Top 10 Open Deferred Defects List</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow overflow-y-auto">
             <table className="w-full text-sm text-left text-gray-600">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
                    <tr>
                        <th scope="col" className="px-4 py-3">Aircraft Reg</th>
                        <th scope="col" className="px-4 py-3">Description</th>
                        <th scope="col" className="px-4 py-3">Days Open</th>
                        <th scope="col" className="px-4 py-3">Category</th>
                    </tr>
                </thead>
                <tbody>
                    {defectsData.map((defect, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-3 font-medium">{defect.reg}</td>
                            <td className="px-4 py-3">{defect.desc}</td>
                            <td className="px-4 py-3">{defect.days}</td>
                            <td className="px-4 py-3">{defect.cat}</td>
                        </tr>
                    ))}
                </tbody>
             </table>
          </CardContent>
        </Card>
        
        {/* Fleet Airworthy % */}
        <Card className="text-center shadow-lg rounded-xl border border-gray-200">
          <CardHeader>
            <CardTitle className="text-md font-medium text-gray-600">Fleet Airworthy %</CardTitle>
          </CardHeader>
          <CardContent className="relative h-[150px]">
             <ResponsiveContainer width="100%" height="100%">
                 <RadialBarChart 
                    cx="50%" cy="70%" innerRadius="80%" outerRadius="100%" 
                    barSize={15} data={airworthyData} startAngle={180} endAngle={0}>
                    <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                    <RadialBar background clockWise dataKey="value" fill="#22C55E" cornerRadius={10} />
                  </RadialBarChart>
             </ResponsiveContainer>
             <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-gray-800">98.5%</p>
          </CardContent>
        </Card>

        {/* Aircraft On Ground */}
        <Card className="text-center shadow-lg rounded-xl border border-gray-200">
          <CardHeader>
            <CardTitle className="text-md font-medium text-gray-600">Aircraft On Ground (AOG)</CardTitle>
          </CardHeader>
          <CardContent className="relative h-[150px]">
            <ResponsiveContainer width="100%" height="100%">
                 <RadialBarChart 
                    cx="50%" cy="70%" innerRadius="80%" outerRadius="100%" 
                    barSize={15} data={aogData} startAngle={180} endAngle={0}>
                    <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                    <RadialBar background clockWise dataKey="value" fill="#EF4444" cornerRadius={10} />
                  </RadialBarChart>
             </ResponsiveContainer>
            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-red-600">2+</p>
          </CardContent>
        </Card>

        {/* Open Deferred Defects */}
        <Card className="text-center shadow-lg rounded-xl border border-gray-200">
          <CardHeader>
            <CardTitle className="text-md font-medium text-gray-600">Open Deferred Defects (DD)</CardTitle>
          </CardHeader>
          <CardContent className="relative h-[150px]">
            <ResponsiveContainer width="100%" height="100%">
                 <RadialBarChart 
                    cx="50%" cy="70%" innerRadius="80%" outerRadius="100%" 
                    barSize={15} data={defectsGaugeData} startAngle={180} endAngle={0}>
                    <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                    <RadialBar background clockWise dataKey="value" fill="#F97316" cornerRadius={10} />
                  </RadialBarChart>
             </ResponsiveContainer>
            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-orange-500">45+</p>
          </CardContent>
        </Card>

        {/* Major Check Deadline */}
        <Card className="text-center shadow-lg rounded-xl border border-gray-200">
          <CardHeader>
            <CardTitle className="text-md font-medium text-gray-600">Major Check Deadline (30 Days)</CardTitle>
          </CardHeader>
          <CardContent className="relative h-[150px]">
            <ResponsiveContainer width="100%" height="100%">
                 <RadialBarChart 
                    cx="50%" cy="70%" innerRadius="80%" outerRadius="100%" 
                    barSize={15} data={checksData} startAngle={180} endAngle={0}>
                    <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                    <RadialBar background clockWise dataKey="value" fill="#3B82F6" cornerRadius={10} />
                  </RadialBarChart>
             </ResponsiveContainer>
            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-blue-600">3</p>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default Analytics;