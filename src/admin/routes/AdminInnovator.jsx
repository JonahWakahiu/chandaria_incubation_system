import React, { useState, useEffect } from "react";
import {
  DataGrid,
  GridToolbar,
  GridValueGetterParams,
  GridActionsCellItem,
  GridRowModes,
} from "@mui/x-data-grid";
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
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";

function AdminInnovator() {
  const [innovators, setInnovators] = useState(false);
  const [mentors, setMentors] = useState("");
  //   //const [rowModesModel, setRowModesModel] = useState < GridRowModesModel > {};

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
        const mentorsInfo = responseData.mentorsInfo;
        if (responseData.status === 200) {
          setInnovators(innovators);
          setMentors(mentorsInfo);
        } else {
          setInnovators([]);
        }
      } catch (error) {
        // console.error("Error:".error);
      }
    }
    getRegistrationData();

    // const interval = setInterval(() => {
    //   getRegistrationData();
    // }, 3000);

    // Clear the interval when the component unmounts or when the dependencies change
    // return () => {
    //   clearInterval(interval);
    // };
  }, []);

  //   // send an id to the API to make the changes
  //   // async function handleDelete(id, email) {
  //   //   const deleteData = new FormData();
  //   //   deleteData.append("id", id);
  //   //   deleteData.append("email", email);
  //   //   console.log([...deleteData.entries()]);
  //   //   try {
  //   //     const response = await fetch(
  //   //       "http://localhost/incubation_system_rest_api/Admin/handleDelete.php",
  //   //       {
  //   //         method: "POST",
  //   //         header: {
  //   //           "Content-Type": "application/json",
  //   //         },
  //   //         body: deleteData,
  //   //       }
  //   //     );

  //   //     const responseData = await response.json();
  //   //     if (responseData.success === true) {
  //   //       toast.success(responseData.message, {
  //   //         position: "top-right",
  //   //         autoClose: 5000,
  //   //         hideProgressBar: true,
  //   //         closeOnClick: true,
  //   //         pauseOnHover: true,
  //   //         draggable: true,
  //   //         progress: undefined,
  //   //         theme: "light",
  //   //       });
  //   //     } else {
  //   //       toast.warning(responseData.message, {
  //   //         position: "top-right",
  //   //         autoClose: 5000,
  //   //         hideProgressBar: true,
  //   //         closeOnClick: true,
  //   //         pauseOnHover: true,
  //   //         draggable: true,
  //   //         progress: undefined,
  //   //         theme: "light",
  //   //       });
  //   //     }
  //   //   } catch (error) {
  //   //     toast.error("Server not found", {
  //   //       position: "top-right",
  //   //       autoClose: 5000,
  //   //       hideProgressBar: true,
  //   //       closeOnClick: true,
  //   //       pauseOnHover: true,
  //   //       draggable: true,
  //   //       progress: undefined,
  //   //       theme: "light",
  //   //     });
  //   //   }
  //   // }

  // async function handlePending(id, email, firstName) {
  //   try {
  //     const response = await fetch(
  //       "http://localhost/incubation_system_rest_api/Admin/handlePending.php",
  //       {
  //         method: "POST",
  //         header: {
  //           "Content-Type": "application/json",
  //         },
  //         body: pendingData,
  //       }
  //     );

  //     const responseData = await response.json();
  //     if (responseData.status === 200) {
  //       toast.success(responseData.message, {
  //         position: "top-right",
  //         autoClose: 5000,
  //         hideProgressBar: true,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "light",
  //       });
  //     } else {
  //       toast.warning(responseData.message, {
  //         position: "top-right",
  //         autoClose: 5000,
  //         hideProgressBar: true,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "light",
  //       });
  //     }
  //   } catch (error) {
  //     toast.error("Server not found", {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: true,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });
  //   }
  // }

  async function handleEditedData(updatedRow) {
    try {
      const response = await fetch(
        "http://localhost/incubation_system_rest_api/Admin/handleEditedData.php",
        {
          method: "POST",
          header: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedRow),
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

  //   function handlePending(updatedRow) {
  //     console.log(updatedRow);
  //   }

  //   // async function handleInactive(id, email) {
  //   //   const inActiveData = new FormData();
  //   //   inActiveData.append("id", id);
  //   //   inActiveData.append("email", email);
  //   //   console.log([...inActiveData.entries()]);
  //   //   try {
  //   //     const response = await fetch(
  //   //       "http://localhost/incubation_system_rest_api/Admin/handleInactive.php",
  //   //       {
  //   //         method: "POST",
  //   //         header: {
  //   //           "Content-Type": "application/json",
  //   //         },
  //   //         body: inActiveData,
  //   //       }
  //   //     );

  //   //     const responseData = await response.json();
  //   //     if (responseData.status === 200) {
  //   //       toast.success(responseData.message, {
  //   //         position: "top-right",
  //   //         autoClose: 5000,
  //   //         hideProgressBar: true,
  //   //         closeOnClick: true,
  //   //         pauseOnHover: true,
  //   //         draggable: true,
  //   //         progress: undefined,
  //   //         theme: "light",
  //   //       });
  //   //     } else {
  //   //       toast.warning(responseData.message, {
  //   //         position: "top-right",
  //   //         autoClose: 5000,
  //   //         hideProgressBar: true,
  //   //         closeOnClick: true,
  //   //         pauseOnHover: true,
  //   //         draggable: true,
  //   //         progress: undefined,
  //   //         theme: "light",
  //   //       });
  //   //     }
  //   //   } catch (error) {
  //   //     toast.error("Server not found", {
  //   //       position: "top-right",
  //   //       autoClose: 5000,
  //   //       hideProgressBar: true,
  //   //       closeOnClick: true,
  //   //       pauseOnHover: true,
  //   //       draggable: true,
  //   //       progress: undefined,
  //   //       theme: "light",
  //   //     });
  //   //   }
  //   // }

  //   function getFullName(params: GridValueGetterParams) {
  //     return `${params.row.firstName || ""} ${params.row.lastName || ""}`;
  //   }

  //   const columns = [
  //     {
  //       field: "id",
  //       headerName: "ID",
  //     },
  //     {
  //       field: "Image",
  //       headerName: "Image",
  //       renderCell: ({ row }) => <Avatar src={row.photo} />,
  //     },
  //     {
  //       field: "Full Name",
  //       headerName: "First Name",
  //       valueGetter: getFullName,
  //       flex: 1,
  //     },

  //     { field: "email", headerName: "Email", flex: 1 },
  //     { field: "phoneNumber", header: "mobile Number" },
  //     { field: "nationalId", header: "National Id" },
  //     { field: "ipRegistered", header: "Registered Ip" },
  //     { field: "incubationDate", header: "Incubation Date" },
  //     { field: "partnerNames", header: "Partner Names" },
  //     { field: "innovationCategory", headerName: "Innovation Category", flex: 1 },
  //     { field: "innovationStage", headerName: "Innovation Stage", flex: 1 },
  //     // {
  //     //   field: "status",
  //     //   headerName: "Status",
  //     //   width: 220,
  //     //   editable: true,
  //     //   // type: "singleSelect",
  //     //   // valueOptions: ["active", "pending", "inactive"],
  //     //   renderCell: (params) => {
  //     //     const status = params.value;
  //     //     let color;
  //     //     if (status === "active") {
  //     //       color = "green";
  //     //     } else if (status === "pending") {
  //     //       color = "orange";
  //     //     } else if (status === "inactive") {
  //     //       color = "red";
  //     //     }

  //     //     return <span style={{ color }}>{status}</span>;
  //     //   },
  //     // },

  //     // {
  //     //   field: "actions",
  //     //   type: "actions",
  //     //   headerName: "Actions",
  //     //   width: 100,
  //     //   cellClassName: "actions",
  //     //   getActions: ({ id }) => {
  //     //     return [
  //     //       <GridActionsCellItem
  //     //         icon={<EditIcon />}
  //     //         label="Edit"
  //     //         className="textPrimary"
  //     //         //onClick={handleEditClick(id)}
  //     //         color="inherit"
  //     //       />,
  //     //       <GridActionsCellItem
  //     //         icon={<DeleteIcon />}
  //     //         label="Delete"
  //     //         //onClick={handleDeleteClick(id)}
  //     //         color="inherit"
  //     //       />,
  //     //     ];
  //     //   },
  //     // },
  //     {
  //       field: "status",
  //       headerName: "Status",
  //       editable: true,
  //       renderCell: (params) => {
  //         const status = params.value;
  //         let color;
  //         if (status === "active") {
  //           color = "green";
  //         } else if (status === "pending") {
  //           color = "orange";
  //         } else if (status === "inactive") {
  //           color = "red";
  //         }

  //         return <span style={{ color }}>{status}</span>;
  //       },
  //     },
  //     {
  //       field: "delete",
  //       headerName: "Action",
  //       flex: 1,
  //       renderCell: ({ row }) => (
  //         <>
  //           <DeleteOutlineOutlinedIcon
  //             //onClick={() => handleDelete(row.id, row.email)}
  //             style={{ cursor: "pointer", color: "red" }}
  //           />
  //           <Divider orientation="vertical" flexItem />
  //           {row.status === "pending" ? (
  //             <AutorenewRoundedIcon
  //               //onClick={() => handlePending(row.id, row.email, row.firstName)}
  //               style={{ cursor: "pointer" }}
  //             />
  //           ) : row.status === "active" ? (
  //             <CheckIcon style={{ cursor: "pointer", color: "green" }} />
  //           ) : row.status === "inactive" ? (
  //             <ClearIcon
  //               //onClick={() => handleInactive(row.id, row.email)}
  //               style={{ cursor: "pointer" }}
  //             />
  //           ) : null}
  //         </>
  //       ),
  //     },
  //   ];
  //   return (
  //     <div className="container-fluid">
  //       <div className="row">
  //         <ToastContainer
  //           position="top-right"
  //           autoClose={5000}
  //           hideProgressBar
  //           newestOnTop={false}
  //           closeOnClick
  //           rtl={false}
  //           pauseOnFocusLoss
  //           draggable
  //           pauseOnHover
  //           theme="light"
  //         />
  //         <div style={{ height: "88vh" }} className="col-12 mt-2">
  //           <DataGrid
  //             sx={{
  //               boxShadow: 2,
  //               border: 2,
  //               borderColor: "primary.light",
  //               "& .MuiDataGrid-cell:hover": {
  //                 color: "primary.main",
  //               },
  //             }}
  //             rows={innovators && innovators}
  //             editMode="row"
  //             columns={columns}
  //             slots={{ toolbar: GridToolbar }}
  //             processRowUpdate={(updatedRow, originalRow) =>
  //               handlePending(updatedRow)
  //             }
  //           />
  //         </div>
  //       </div>
  //     </div>
  //   );
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: "50",
    },
    {
      field: "Image",
      headerName: "Image",
      renderCell: ({ row }) => <Avatar src={row.photo} />,
    },
    {
      field: "fullName",
      flex: 1,
      headerName: "Full Name",
      valueGetter: (params) => {
        return `${params.row.firstName || ""} ${params.row.lastName}`;
      },
    },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phoneNumber", headerName: "Phone Number" },
    { field: "nationalId", headerName: "National Id" },
    { field: "innovationCategory", headerName: "Innovation Category", flex: 1 },
    {
      field: "mentor",
      headerName: "Mentor",
      editable: "true",
      type: "singleSelect",
      valueOptions: mentors,
      valueGetter: (params) => {
        return `${params.row.mentor || null}`;
      },
    },
    {
      field: "date",
      headerName: "Date Applied",
    },
    {
      field: "status",
      headerName: "Status",
      type: "singleSelect",
      editable: true,
      valueOptions: ["pending", "active"],
      renderCell: (params) => {
        const status = params.value;
        let color;
        if (status === "active") {
          color = "green";
        } else if (status === "pending") {
          color = "#FF7200";
        } else if (status === "inactive") {
          color = "red";
        }

        return <span style={{ color }}>{status}</span>;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem icon={<EditIcon />} label="edit" />,
        <GridActionsCellItem icon={<DeleteIcon />} label="Delete" />,
      ],
    },
  ];
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col" style={{ minHeight: "87vh" }}>
          <legend>Innovators</legend>
          <DataGrid
            editMode="row"
            sx={{
              boxShadow: 2,
              border: 2,
              borderColor: "primary.light",
              "&.MuiDataGrid-cell:hover": { color: "primary.main" },
            }}
            columns={columns}
            rows={innovators && innovators}
            slots={{ toolbar: GridToolbar }}
            processRowUpdate={
              (updatedRow, originalRow) => handleEditedData(updatedRow)
              //console.log(updatedRow)
            }
            onProcessRowUpdateError={console.log("error")}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminInnovator;
