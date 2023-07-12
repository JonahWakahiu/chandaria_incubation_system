import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

function AdminInnovator() {
  const [innovators, setInnovators] = useState([]);

  useEffect(() => {
    async function getRegistrationData() {
      try {
        const response = await fetch(
          "http://192.168.15.19/incubation_system_rest_api/Admin/getInnovators.php",
          {
            method: "GET",
            header: {
              "Content-Type": "application/json",
            },
          }
        );

        const responseData = await response.json();
        const innovators = responseData.data;
        setInnovators(innovators);
      } catch (error) {
        // console.error("Error:".error);
      }
    }
    getRegistrationData();

    const interval = setInterval(() => {
      getRegistrationData();
    }, 3000);

    // Clear the interval when the component unmounts or when the dependencies change
    return () => {
      clearInterval(interval);
    };
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "ID",
    },
    { field: "firstName", headerName: "First Name" },
    { field: "lastName", headerName: "Last Name" },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "innovationCategory", headerName: "Innovation Category", flex: 1 },
    { field: "innovationStage", headerName: "Innovation Stage", flex: 1 },
    { field: "status", headerName: "Status" },
  ];
  return (
    <>
      <div style={{ height: 400, width: "75%" }}>
        {innovators && (
          <DataGrid
            rows={innovators}
            columns={columns}
            slots={{ toolbar: GridToolbar }}
          />
        )}
      </div>
    </>
  );
}

export default AdminInnovator;
