import React, { useState, useEffect, PureComponent } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";

import "../components/Navbar.css";

function AdminDashboard() {
  const [registeredIncubate, setRegisteredIncubate] = useState(0);

  useEffect(() => {
    async function getRegisteredIncubatee() {
      try {
        const response = await fetch(
          "http://localhost/incubation_system_rest_api/Admin/notification.php",
          {
            method: "GET",
            header: {
              "Content-Type": "application/json",
            },
          }
        );

        const responseData = await response.json();
        const reading = responseData.registeredIncubate;
        setRegisteredIncubate(reading);
      } catch (error) {
        console.error("Error:".error);
      }
    }
    getRegisteredIncubatee();

    const interval = setInterval(() => {
      getRegisteredIncubatee();
    }, 3000);

    // Clear the interval when the component unmounts or when the dependencies change
    return () => {
      clearInterval(interval);
    };
  }, []);

  // function showSidebar() {
  //   setSidebar(!sidebar);
  // }
  return (
    <div className="container-fluid">
      <div className="row ms-2 me-5 my-3">
        <div
          className="col-md-4 col-lg-2 border rounded shadow me-2"
          style={{ height: "150px" }}
        >
          <h6>Incubate Registered</h6>
        </div>
        <div
          className="col-md-4 col-lg-2 border rounded shadow me-2"
          style={{ height: "150px" }}
        >
          <h6>Number of Ku students and Non KU students</h6>
        </div>
        <div
          className="col-md-4 col-lg-2 border rounded me-2 shadow"
          style={{ height: "150px" }}
        >
          <h6>Number of mentors</h6>
        </div>
        <div
          className="col-md-4 col-lg-2 border rounded me-2 shadow"
          style={{ height: "150px" }}
        >
          <h6>Registered companies</h6>
        </div>
        <div
          className="col-md-4 col-lg-2 border rounded rounded me-2 shadow"
          style={{ height: "150px" }}
        >
          <h6>Commercialized companies</h6>
        </div>
        <div
          className="col-md-4 col-lg border rounded me-2 shadow"
          style={{ height: "150px" }}
        >
          <h6>Patent filed</h6>
        </div>
      </div>

      <div className="row ms-2 me-5 my-3 g-2">
        <div
          className="col-lg-7 shadow border rounded me-2"
          style={{ height: "60vh" }}
        >
          <ResponsiveBar
            data={data}
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
const data = [
  {
    country: "Innovation Per category",
    "Business and Professional Services": 35,
    "Information and Communication Technology": 100,
    "Marketing and Communication": 50,
    "Manufacturing and Construction": 67,
    "Transport and logistics": 39,
    "Bio and Nano-Technology": 45,
    "Health and Nutrition": 12,
    "Green and ecological business": 86,
    "Tourism and eco-tourism": 78,
    "Fine and Performing Arts": 88,
    "Sports, Leisure and Entertainment": 7,
    "Water and Sanitation": 19,
    Energy: 22,
    "Media and Entertainment": 46,
  },
];

const pieData = [
  {
    id: "Research and development",
    label: "Research",
    value: 194,
    color: "hsl(251, 70%, 50%)",
  },
  {
    id: "Prototype",
    label: "Prototype phase",
    value: 369,
    color: "hsl(185, 70%, 50%)",
  },
  {
    id: "Start-up",
    label: "Start-up",
    value: 493,
    color: "hsl(50, 70%, 50%)",
  },
  {
    id: "Scaling-up",
    label: "Scaling-up phase",
    value: 45,
    color: "hsl(47, 70%, 50%)",
  },
  {
    id: "Other",
    label: "Other (Specify)",
    value: 376,
    color: "hsl(209, 70%, 50%)",
  },
];

export default AdminDashboard;
