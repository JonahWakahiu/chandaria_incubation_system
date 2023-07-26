import { Form, Formik, Field, ErrorMessage } from "formik";
import React, { useContext } from "react";
import { UserContext } from "../../UserContext";
import { TextField } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";

function MentorProfile() {
  const { user, setUser } = useContext(UserContext);

  const url =
    "http://localhost/incubation_system_rest_api/mentor/handleProfileUpdate.php";

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
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8 col-xl-7 border rounded p-3 shadow bg-light mt-2">
          <Formik
            initialValues={{
              firstName: user && user.firstName,
              lastName: user && user.lastName,
              pfNumber: user && user.pfNumber,
              nationalId: user && user.nationalId,
              email: user && user.email,
              phoneNumber: user && user.phoneNumber,
              photo: "",
              school: user && user.school,
              description: user && user.description,
            }}
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
            {({ setFieldValue }) => (
              <Form className="clearfix">
                <legend className="text-center">Personal Details</legend>
                <section className="col-md-5 float-md-end mb-3 ms-md-3 mt-md-5 d-flex flex-column align-items-center">
                  <h6>Profile Picture</h6>
                  <img
                    className="border border-4 border-dark rounded"
                    src={user && user.photo}
                    alt="user Image"
                    style={{
                      height: "150px",
                      width: "150px",
                    }}
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

                {/* pf Number */}
                <div className="col-12 mb-3">
                  <Field name="pfNumber">
                    {({ field }) => (
                      <TextField
                        {...field}
                        variant="standard"
                        fullWidth
                        helperText={
                          <span className="errors">
                            <ErrorMessage name="pfNumber" />
                          </span>
                        }
                        label="pfNumber"
                      />
                    )}
                  </Field>
                </div>

                {/* School */}
                <div className="col-12 mb-3">
                  <Field name="school">
                    {({ field }) => (
                      <TextField
                        {...field}
                        variant="standard"
                        fullWidth
                        helperText={
                          <span className="errors">
                            <ErrorMessage name="school" />
                          </span>
                        }
                        label="school"
                      />
                    )}
                  </Field>
                </div>

                {/* Description */}
                <div className="col-12 mb-3">
                  <Field name="description">
                    {({ field }) => (
                      <TextField
                        {...field}
                        variant="standard"
                        multiline
                        maxRows={5}
                        fullWidth
                        helperText={
                          <span className="errors">
                            <ErrorMessage name="description" />
                          </span>
                        }
                        label="Description"
                      />
                    )}
                  </Field>
                </div>
                <div className="col-12 d-flex justify-content-center">
                  <button className="btn btn-success w-50" type="submit">
                    Update
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

export default MentorProfile;
