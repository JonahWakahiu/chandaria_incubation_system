import { Formik, Form, ErrorMessage, Field } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { DataGrid, GridToolbar, GridValueGetterParams } from "@mui/x-data-grid";
import "../components/Navbar.css";
import { useState, useEffect } from "react";

const url =
  "http://localhost/incubation_system_rest_api/Admin/handleAddMentor.php";
async function sendMentorData(formData, actions) {
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

function AdminMentor() {
  const [mentors, setMentors] = useState([]);

  // get mentors on page load
  useEffect(() => {
    async function getMentorsData() {
      try {
        const response = await fetch(
          "http://localhost/incubation_system_rest_api/Admin/handleAddMentor.php",
          {
            method: "GET",
            header: {
              "Content-Type": "application/json",
            },
          }
        );

        const responseData = await response.json();
        const mentors = responseData.data;
        setMentors(mentors);
      } catch (error) {
        // console.error("Error:".error);
      }
    }
    getMentorsData();

    const interval = setInterval(() => {
      getMentorsData();
    }, 3000);

    // Clear the interval when the component unmounts or when the dependencies change
    return () => {
      clearInterval(interval);
    };
  }, []);

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "nationalId", headerName: "National Id" },
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
      <div className="row vh-100 g-2 ">
        <div className="col-lg-8  me-2">
          {mentors && (
            <DataGrid
              sx={{
                boxShadow: 2,
                border: 2,
                borderColor: "primary.light",
                "& .MuiDataGrid-cell:hover": {
                  color: "primary.main",
                },
              }}
              rows={mentors}
              columns={columns}
              slots={{ toolbar: GridToolbar }}
            />
          )}
        </div>
        <div className="col align-items-center">
          <Formik
            initialValues={{ email: "", nationalId: "" }}
            onSubmit={(values, actions) => {
              const formData = new FormData();
              Object.keys(values).forEach((key) => {
                formData.append(key, values[key]);
              });

              sendMentorData(formData, actions);
              // for (let entry of formData.entries()) {
              //   console.log(entry);
              // }
            }}
          >
            {({ error, touched, isSubmitting }) => (
              <Form className="row border rounded px-2 py-4 row justify-content-center g-2">
                <h6 className="text-center">Add mentor</h6>
                <div className="col-10">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="form-control"
                    id="email"
                  />
                </div>
                <div className="col-10">
                  <label htmlFor="nationaId" className="form-label">
                    National Id
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

          <p>Link mentor to innovator</p>
        </div>
      </div>
    </div>
  );
}

export default AdminMentor;
