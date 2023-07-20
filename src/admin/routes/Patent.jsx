import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";

const url =
  "http://localhost/incubation_system_rest_api/Admin/handlePatent.php";
async function sendPatentData(formData, actions) {
  try {
    const response = await fetch(url, {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: formData,
    });

    const responseData = await response.json();
    if (responseData.status === 202) {
      toast.info(responseData.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (responseData.status === 200) {
      actions.resetForm();
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
    toast.error("Server connection failed!", {
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

function Patent() {
  const [patents, setPatents] = useState(false);

  // get mentors on page load
  useEffect(() => {
    async function getPatentsData() {
      try {
        const response = await fetch(
          "http://localhost/incubation_system_rest_api/Admin/handlePatent.php",
          {
            method: "GET",
            header: {
              "Content-Type": "application/json",
            },
          }
        );

        const responseData = await response.json();
        const patents = responseData.data;
        if (responseData.status === 200) {
          setPatents(patents);
        } else {
          setPatents([]);
        }
      } catch (error) {
        // console.error("Error:".error);
      }
    }
    getPatentsData();

    const interval = setInterval(() => {
      getPatentsData();
    }, 3000);

    // Clear the interval when the component unmounts or when the dependencies change
    return () => {
      clearInterval(interval);
    };
  }, []);

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "patentName", fieldName: "Patent Name" },
    { field: "patentOwner", headerName: "Patent Owner" },
    { field: "patentNumber", headerName: "Patent Number" },
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
      </GridToolbarContainer>
    );
  }
  return (
    <div className="container-fluid">
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
      <div className="row vh-100">
        <div className="col-12 col-md-8 me-2">
          <DataGrid
            sx={{
              boxShadow: 2,
              border: 2,
              borderColor: "primary.light",
              "& .MuiDataGrid-cell:hover": {
                color: "primary.main",
              },
            }}
            rows={patents}
            columns={columns}
            slots={{ toolbar: CustomToolbar }}
          />
        </div>
        <div className="col border border-success ">
          <Formik
            initialValues={{
              patentName: "",
              patentOwner: "",
              patentNumber: "",
            }}
            onSubmit={(values, actions) => {
              const formData = new FormData();
              Object.keys(values).forEach((key) => {
                formData.append(key, values[key]);
              });

              sendPatentData(formData, actions);
              for (let entry of formData.entries()) {
                console.log(entry);
              }
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="border rounded px-2 py-4 row justify-content-center g-2">
                <h5 className="text-center">Patent Form</h5>
                <div className="col-lg-10">
                  <label htmlFor="patentName" className="form-label">
                    Patent Name
                  </label>
                  <Field
                    type="text"
                    name="patentName"
                    id="patentName"
                    className="form-control"
                  />
                </div>
                <div className="col-lg-10">
                  <label htmlFor="patentOwner" className="form-label">
                    Patent Owner
                  </label>
                  <Field
                    type="text"
                    name="patentOwner"
                    id="patentOwner"
                    className="form-control"
                  />
                </div>
                <div className="col-lg-10">
                  <label htmlFor="patentNumber" className="form-label">
                    Patent Number
                  </label>
                  <Field
                    type="text"
                    name="patentNumber"
                    id="patentNumber"
                    className="form-control"
                  />
                </div>

                <div className="col-12 d-flex justify-content-center">
                  <button type="submit" className="btn btn-success w-50">
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Patent;
