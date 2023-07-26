import { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from "../../UserContext";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";
import { TextField } from "@mui/material";

function AdminProfile() {
  const { user, setUser } = useContext(UserContext);

  const url =
    "http://localhost/incubation_system_rest_api/Admin/profileUpdate.php";

  async function sendProfileData(formData, actions) {
    try {
      const response = await fetch(url, {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        body: formData,
      });

      const responseData = await response.json();
      const userInfo = responseData.userInfo;
      if (responseData.status === 200) {
        setUser(userInfo);
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
      toast.error("Server connection problem!", {
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

  return (
    <div className="container-fluid">
      <div className="row d-flex justify-content-center">
        <div
          className="col-12 col-md-10 col-lg-9 col-xl-7 pb-2 pt-3 bg-light mt-3 p-3 border rounded shadow"
          style={{ minHeight: "50vh" }}
        >
          <Formik
            initialValues={{
              photo: "",
              firstName: user ? user.firstName : "",
              lastName: user ? user.lastName : "",
              email: user ? user.email : "",
              phoneNumber: user ? user.phoneNumber : "",
              nationalId: user ? user.nationalId : "",
            }}
            validationSchema={Yup.object().shape({
              firstName: Yup.string().matches(
                /^[a-zA-Z]{2,15}$/,
                "Should only contains alphabets and 2 to 15 characters"
              ),
              lastName: Yup.string().matches(
                /^[a-zA-Z]{2,20}$/,
                "Should only contains alphabets and 2 to 20 characters"
              ),
              email: Yup.string().email("Invalid Email address"),
              phoneNumber: Yup.string().matches(
                /^0(1|7)[\d]{8}$/,
                "Invalid phone number hint: 07/01"
              ),
              nationalId: Yup.string().matches(
                /^[0-9]{8}$/,
                "National Id must be 8 characters only"
              ),
            })}
            onSubmit={(values) => {
              const formData = new FormData();
              Object.keys(values).forEach((key) => {
                formData.append(key, values[key]);
              });

              // for (let entry of formData.entries()) {
              //   console.log(entry);
              // }

              sendProfileData(formData);
            }}
          >
            {({ errors, touched, isSubmitting, values, setFieldValue }) => (
              <Form className="clearfix">
                <legend className="text-center">Personal Details</legend>
                <section className="col-md-5 float-md-end mb-3 ms-md-3 mt-md-5 d-flex flex-column align-items-center">
                  <h6>Profile Picture</h6>
                  <img
                    src={user && user.photo}
                    alt="user2"
                    style={{
                      height: "150px",
                      width: "150px",
                    }}
                    className="border border-4 border-dark rounded"
                  />
                  <div className="w-75 mt-2">
                    <input
                      type="file"
                      name="photo"
                      variant="standard"
                      onChange={(event) =>
                        setFieldValue("photo", event.target.files[0])
                      }
                    />
                  </div>
                  <span className="errors">
                    <ErrorMessage name="photo" />
                  </span>
                </section>

                {/* firstName */}
                <div className="col-md-6 mb-2">
                  <Field name="firstName">
                    {({ field }) => (
                      <TextField
                        {...field}
                        variant="standard"
                        fullWidth
                        helperText={
                          <span className="errors">
                            <ErrorMessage name="firstName " />
                          </span>
                        }
                        label="First Name"
                      />
                    )}
                  </Field>
                </div>
                {/* lastName */}
                <div className="col-md-6 mb-2">
                  <Field name="lastName">
                    {({ field }) => (
                      <TextField
                        {...field}
                        variant="standard"
                        fullWidth
                        helperText={
                          <span className="errors">
                            <ErrorMessage name="lastName " />
                          </span>
                        }
                        label="Last Name"
                      />
                    )}
                  </Field>
                </div>

                <div className="col-md-6 mb-2">
                  <Field name="email">
                    {({ field }) => (
                      <TextField
                        disabled
                        {...field}
                        variant="standard"
                        fullWidth
                        helperText={
                          <span className="errors">
                            <ErrorMessage name="email" />
                          </span>
                        }
                        label="email"
                      />
                    )}
                  </Field>
                </div>

                {/* phone number */}
                <div className="col-md-6 mb-2">
                  <Field name="phoneNumber">
                    {({ field }) => (
                      <TextField
                        {...field}
                        variant="standard"
                        fullWidth
                        helperText={
                          <span className="errors">
                            <ErrorMessage name="phoneNumber" />
                          </span>
                        }
                        label="Phone Number"
                      />
                    )}
                  </Field>
                </div>

                {/* National ID */}
                <div className="col-md-6 mb-3">
                  <Field name="nationalId">
                    {({ field }) => (
                      <TextField
                        {...field}
                        variant="standard"
                        fullWidth
                        helperText={
                          <span className="errors">
                            <ErrorMessage name="nationalId" />
                          </span>
                        }
                        label="National Id"
                      />
                    )}
                  </Field>
                </div>

                <div className="col-12 d-flex justify-content-center mt-2">
                  <button type="submit" className="btn btn-success w-50">
                    Update
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
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
    </div>
  );
}

export default AdminProfile;
