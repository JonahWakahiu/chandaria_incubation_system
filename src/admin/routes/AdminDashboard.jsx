import React, { useState, useEffect, PureComponent } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";

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
    <div className="container-fluid">
      <div className="row ms-2 me-5 my-3">
        <div
          className="col-md-4 col-lg-2 border rounded shadow me-2"
          style={{ height: "150px" }}
        >
          <h6>Incubate Registered</h6>
          {dashboard && dashboard.registeredIncubate}
        </div>
        <div
          className="col-md-4 col-lg-2 border rounded shadow me-2"
          style={{ height: "150px" }}
        >
          <h6>Ku Students</h6>
          {dashboard && dashboard.kuStudent}
          <h6>Non Ku Student</h6>
          {dashboard && dashboard.nonKuStudent}
        </div>
        <div
          className="col-md-4 col-lg-2 border rounded me-2 shadow"
          style={{ height: "150px" }}
        >
          <h6>mentors</h6>
          {dashboard && dashboard.mentors}
        </div>
        <div
          className="col-md-4 col-lg-2 border rounded me-2 shadow"
          style={{ height: "150px" }}
        >
          <h6>Registered companies</h6>
          {dashboard && dashboard.registeredCompanies}
        </div>
        <div
          className="col-md-4 col-lg-2 border rounded rounded me-2 shadow"
          style={{ height: "150px" }}
        >
          <h6>Commercialized companies</h6>
          {dashboard && dashboard.commercializedCompanies}
        </div>
        <div
          className="col-md-4 col-lg border rounded me-2 shadow"
          style={{ height: "150px" }}
        >
          <h6>Patent filed</h6>
          {dashboard && dashboard.patentFilled}
        </div>
      </div>

      <div className="row ms-2 me-5 my-3 g-2">
        <div
          className="col-lg-7 shadow border rounded me-2"
          style={{ height: "60vh" }}
        >
          <ResponsiveBar
            data={graphData}
            keys={[
              "Business and Professional Services",
              "Information and Communication Technology",
              "Marketing and Communication",
              "Manufacturing and Construction",
              "Transport and logistics",
              "Bio and Nano-Technology",
              "Health and Nutrition",
              "Green and ecological business",
              "Tourism and eco-tourism",
              "Fine and Performing Arts",
              "Sports, Leisure and Entertainment",
              "Water and Sanitation",
              "Energy",
              "Media and Entertainment",
            ]}
            indexBy="country"
            margin={{ top: 50, right: 270, bottom: 50, left: 60 }}
            padding={0.25}
            innerPadding={2}
            groupMode="grouped"
            valueScale={{ type: "linear" }}
            indexScale={{ type: "band", round: true }}
            colors={{ scheme: "paired" }}
            borderColor={{
              from: "color",
              modifiers: [["darker", 1.6]],
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,

              legendPosition: "middle",
              legendOffset: 32,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Number in each Category",
              legendPosition: "middle",
              legendOffset: -40,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
              from: "color",
              modifiers: [["darker", 1.6]],
            }}
            legends={[
              {
                dataFrom: "keys",
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: "left-to-right",
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
            role="application"
            ariaLabel="innovation Category"
          />
        </div>
        {/* piechart */}
        <div className="col shadow border rounded" style={{ height: "60vh" }}>
          <ResponsivePie
            data={pieData}
            margin={{ top: 40, right: 120, bottom: 80, left: 100 }}
            startAngle={0}
            activeOuterRadiusOffset={8}
            colors={{ scheme: "paired" }}
            borderWidth={1}
            borderColor={{
              from: "color",
              modifiers: [["darker", 0.2]],
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: "color" }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
              from: "color",
              modifiers: [["darker", 2]],
            }}
            defs={[
              {
                id: "dots",
                type: "patternDots",
                background: "inherit",
                color: "rgba(255, 255, 255, 0.3)",
                size: 4,
                padding: 1,
                stagger: true,
              },
              {
                id: "lines",
                type: "patternLines",
                background: "inherit",
                color: "rgba(255, 255, 255, 0.3)",
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
