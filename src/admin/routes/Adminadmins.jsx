import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { DataGrid, GridToolbar, GridValueGetterParams } from "@mui/x-data-grid";
import "../components/Navbar.css";
import { useState, useEffect } from "react";

const url =
  "http://localhost/incubation_system_rest_api/Admin/handleAddAdmin.php";
async function sendAdminData(formData, actions) {
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
      actions.setSubmitting(false);
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
function Adminadmins() {
  const [admins, setAdmins] = useState([]);

  // get admins on page load
  useEffect(() => {
    async function getAdminsData() {
      try {
        const response = await fetch(
          "http://localhost/incubation_system_rest_api/Admin/handleAddAdmin.php",
          {
            method: "GET",
            header: {
              "Content-Type": "application/json",
            },
          }
        );

        const responseData = await response.json();
        const admins = responseData.data;
        setAdmins(admins);
      } catch (error) {
        // console.error("Error:".error);
      }
    }
    getAdminsData();

    const interval = setInterval(() => {
      getAdminsData();
    }, 3000);

    // Clear the interval when the component unmounts or when the dependencies change
    return () => {
      clearInterval(interval);
    };
  }, []);

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "email", headerName: "Email" },
    { field: "nationalid", headerName: "National Id" },
  ];
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
      <div className="row" style={{ minHeight: "88vh" }}>
        <div className="col-12 col-lg-8 me-2 ">
          <DataGrid
            sx={{
              boxShadow: 2,
              border: 2,
              borderColor: "primary.light",
              "& .MuiDataGrid-cell:hover": {
                color: "primary.main",
              },
            }}
            rows={admins && admins}
            columns={columns}
            slots={{ toolbar: GridToolbar }}
          />
        </div>
        <div className="col">
          <Formik
            initialValues={{ firstName: "", email: "", nationalId: "" }}
            onSubmit={(values, actions) => {
              const formData = new FormData();
              Object.keys(values).forEach((key) => {
                formData.append(key, values[key]);
              });

              sendAdminData(formData, actions);
              // for (let entry of formData.entries()) {
              //   console.log(entry);
              // }
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="row border rounded px-2 py-4 row justify-content-center g-2">
                <h5 className="text-center">Add Admin</h5>
                <div className="col-10">
                  <label htmlFor="firstName">First Name</label>
                  <Field
                    type="text"
                    name="firstName"
                    className="form-control"
                    id="firstName"
                  />
                </div>
                <div className="col-10">
                  <label htmlFor="email">Email</label>
                  <Field
                    type="email"
                    name="email"
                    className="form-control"
                    id="email"
                  />
                </div>
                <div className="col-10">
                  <label htmlFor="nationalId" className="form-label">
                    National ID
                  </label>
                  <Field
                    type="text"
                    name="nationalId"
                    id="nationalId"
                    className="form-control"
                  />
                </div>

                <div className="col-12 d-flex justify-content-center">
                  <button
                    id="addButton"
                    disabled={isSubmitting}
                    type="submit"
                    className="btn btn-success w-50"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          <article>Admin logs</article>
        </div>
      </div>
    </div>
  );
}

export default Adminadmins;
