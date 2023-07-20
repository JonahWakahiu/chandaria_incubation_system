import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar, GridValueGetterParams } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { Box, Stack, Divider, Avatar } from "@mui/material";
import MoreHorizSharpIcon from "@mui/icons-material/MoreHorizSharp";
import PendingIcon from "@mui/icons-material/Pending";
import AirplanemodeInactiveSharpIcon from "@mui/icons-material/AirplanemodeInactiveSharp";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import AirplanemodeActiveSharpIcon from "@mui/icons-material/AirplanemodeActiveSharp";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { ToastContainer, toast } from "react-toastify";

function AdminInnovator() {
  const [innovators, setInnovators] = useState(false);

  useEffect(() => {
    async function getRegistrationData() {
      try {
        const response = await fetch(
          "http://localhost/incubation_system_rest_api/Admin/handleInnovators.php",
          {
            method: "GET",
            header: {
              "Content-Type": "application/json",
            },
          }
        );

        const responseData = await response.json();
        const innovators = responseData.data;
        if (responseData.status === 200) {
          setInnovators(innovators);
        } else {
          setInnovators([]);
        }
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

  // send an id to the API to make the changes
  async function handleDelete(id, email) {
    const deleteData = new FormData();
    deleteData.append("id", id);
    deleteData.append("email", email);
    console.log([...deleteData.entries()]);
    try {
      const response = await fetch(
        "http://localhost/incubation_system_rest_api/Admin/handleDelete.php",
        {
          method: "POST",
          header: {
            "Content-Type": "application/json",
          },
          body: deleteData,
        }
      );

      const responseData = await response.json();
      if (responseData.success === true) {
        toast.success(responseData.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.warning(responseData.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error("Server not found", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  async function handlePending(id, email, firstName) {
    const pendingData = new FormData();
    pendingData.append("id", id);
    pendingData.append("email", email);
    pendingData.append("firstName", firstName);
    try {
      const response = await fetch(
        "http://localhost/incubation_system_rest_api/Admin/handlePending.php",
        {
          method: "POST",
          header: {
            "Content-Type": "application/json",
          },
          body: pendingData,
        }
      );

      const responseData = await response.json();
      if (responseData.status === 200) {
        toast.success(responseData.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.warning(responseData.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error("Server not found", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  async function handleInactive(id, email) {
    const inActiveData = new FormData();
    inActiveData.append("id", id);
    inActiveData.append("email", email);
    console.log([...inActiveData.entries()]);
    try {
      const response = await fetch(
        "http://localhost/incubation_system_rest_api/Admin/handleInactive.php",
        {
          method: "POST",
          header: {
            "Content-Type": "application/json",
          },
          body: inActiveData,
        }
      );

      const responseData = await response.json();
      if (responseData.status === 200) {
        toast.success(responseData.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.warning(responseData.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error("Server not found", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  function getFullName(params: GridValueGetterParams) {
    return `${params.row.firstName || ""} ${params.row.lastName || ""}`;
  }

  const columns = [
    {
      field: "id",
      headerName: "ID",
    },
    {
      field: "Image",
      headerName: "Image",
      renderCell: ({ row }) => <Avatar src={row.photo} />,
    },
    {
      field: "Full Name",
      headerName: "First Name",
      valueGetter: getFullName,
      flex: 1,
    },

    { field: "email", headerName: "Email", flex: 1 },
    { field: "phoneNumber", header: "mobile Number" },
    { field: "nationalId", header: "National Id" },
    { field: "ipRegistered", header: "Registered Ip" },
    { field: "incubationDate", header: "Incubation Date" },
    { field: "partnerNames", header: "Partner Names" },
    { field: "innovationCategory", headerName: "Innovation Category", flex: 1 },
    { field: "innovationStage", headerName: "Innovation Stage", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      renderCell: (params) => {
        const status = params.value;

        let color;
        if (status === "active") {
          color = "green";
        } else if (status === "pending") {
          color = "orange";
        } else if (status === "inactive") {
          color = "red";
        }

        return <span style={{ color }}>{status}</span>;
      },
    },
    {
      field: "delete",
      headerName: "Action",
      flex: 1,
      renderCell: ({ row }) => (
        <>
          <DeleteOutlineOutlinedIcon
            onClick={() => handleDelete(row.id, row.email)}
            style={{ cursor: "pointer", color: "red" }}
          />
          <Divider orientation="vertical" flexItem />
          {row.status === "pending" ? (
            <AutorenewRoundedIcon
              onClick={() => handlePending(row.id, row.email, row.firstName)}
              style={{ cursor: "pointer" }}
            />
          ) : row.status === "active" ? (
            <CheckIcon style={{ cursor: "pointer", color: "green" }} />
          ) : row.status === "inactive" ? (
            <ClearIcon
              onClick={() => handleInactive(row.id, row.email)}
              style={{ cursor: "pointer" }}
            />
          ) : null}
        </>
      ),
    },
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
            rows={innovators && innovators}
            columns={columns}
            slots={{ toolbar: GridToolbar }}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminInnovator;
