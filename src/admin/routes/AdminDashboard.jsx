import React, { useState, useEffect } from "react";

import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import "../components/Navbar.css";

function AdminDashboard() {
  const [dashboard, setDashboard] = useState("");
  const [graphData, setGraphData] = useState([]);
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    async function getDashboardData() {
      try {
        const response = await fetch(
          "http://localhost/incubation_system_rest_api/Admin/handleAdminDashboard.php",
          {
            method: "GET",
            header: {
              "Content-Type": "application/json",
            },
          }
        );

        const responseData = await response.json();
        const dashboardData = responseData.data;
        const graph = responseData.graph;
        const pieData = responseData.pieData;
        setDashboard(dashboardData);
        setGraphData(graph);
        setPieData(pieData);
      } catch (error) {
        console.error("Error:".error);
      }
    }
    getDashboardData();

    const interval = setInterval(() => {
      getDashboardData();
    }, 3000);

    // Clear the interval when the component unmounts or when the dependencies change
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="container-fluid mt-0">
      <div className="row ms-2 me-5 my-3">
        <div
          className="col-md-4 col-lg-2 border rounded bg-light shadow me-2"
          style={{ height: "150px" }}
        >
          <h6>Incubate Registered</h6>
          {dashboard && dashboard.registeredIncubate}
        </div>
        <div
          className="col-md-4 col-lg-2 border rounded bg-light shadow me-2"
          style={{ height: "150px" }}
        >
          <h6>Ku Students</h6>
          {dashboard && dashboard.kuStudent}
          <h6>Non Ku Student</h6>
          {dashboard && dashboard.nonKuStudent}
        </div>
        <div
          className="col-md-4 col-lg-2 border rounded bg-light me-2 shadow"
          style={{ height: "150px" }}
        >
          <h6>mentors</h6>
          {dashboard && dashboard.mentors}
        </div>
        <div
          className="col-md-4 col-lg-2 border rounded me-2 shadow bg-light"
          style={{ height: "150px" }}
        >
          <h6>Registered companies</h6>
          {dashboard && dashboard.registeredCompanies}
        </div>
        <div
          className="col-md-4 col-lg-2 border rounded rounded me-2 shadow bg-light"
          style={{ height: "150px" }}
        >
          <h6>Commercialized companies</h6>
          {dashboard && dashboard.commercializedCompanies}
        </div>
        <div
          className="col-md-4 col-lg border rounded me-2 shadow bg-light"
          style={{ height: "150px" }}
        >
          <h6>Patent filed</h6>
          {dashboard && dashboard.patentFilled}
        </div>
      </div>

      <div className="row ms-2 me-5 my-3 g-2 justify-between">
        <div className="card col-lg-8 me-2">
          <div className="card-header">Innovation Category</div>
          <div className="card-body">
            <ResponsiveContainer width={"100%"} height={450}>
              <BarChart data={graphData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count">
                  {graphData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* piechart */}
        <div className="card col">
          <div className="card-header">Innovation per Stage</div>
          <div className="card-body">
            <ResponsiveContainer>
              <PieChart width={730} height={250}>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  fill="#8884d8"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
const colors = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AF19FF",
  "#FF19AF",
];
