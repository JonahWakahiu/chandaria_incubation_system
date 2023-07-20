import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar, GridValueGetterParams } from "@mui/x-data-grid";
import { ToastContainer, toast } from "react-toastify";

function IncubateExpectation() {
  const [expectationData, setExpectationData] = useState([]);
  // get expectationData on page load
  useEffect(() => {
    async function getExpectationData() {
      try {
        const response = await fetch(
          "http://localhost/incubation_system_rest_api/mentor/getExpectationData.php",
          {
            method: "GET",
            header: {
              "Content-Type": "application/json",
            },
          }
        );

        const responseData = await response.json();
        const expectationData = responseData.data;
        if (responseData.status === 200) {
          setExpectationData(expectationData);
        } else {
          setExpectationData([]);
        }
      } catch (error) {
        // console.error("Error:".error);
      }
    }
    getExpectationData();

    const interval = setInterval(() => {
      getExpectationData();
    }, 3000);

    // Clear the interval when the component unmounts or when the dependencies change
    return () => {
      clearInterval(interval);
    };
  }, []);

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "email", headerName: "Email" },
    { field: "nationalId", headerName: "National Id" },
    { field: "userExpectation", headerName: "User Expectation" },
    { field: "stageEnterPricePyramid", headerName: "Stage EnterpricePyramid" },
    { field: "projectBasedService", headerName: "Project Based Service" },
  ];
  return (
    <div className="container-fluid">
      <div className="row">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div style={{ height: "88vh" }} className="col-12 mt-2">
          <DataGrid
            sx={{
              boxShadow: 2,
              border: 2,
              borderColor: "primary.light",
              "& .MuiDataGrid-cell:hover": {
                color: "primary.main",
              },
            }}
            rows={expectationData && expectationData}
            columns={columns}
            slots={{ toolbar: GridToolbar }}
          />
        </div>
      </div>
    </div>
  );
}

export default IncubateExpectation;
