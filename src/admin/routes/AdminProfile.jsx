import { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from "../../UserContext";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";

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
    <div className="container-fluid d-flex justify-content-center bg-body-secondary">
      <div
        className="row w-75 border rounded mt-4 mb-5 px-3 bg-body-tertiary d-flex justify-content-between"
        style={{ height: "85vh" }}
      >
        <div className="col-12 pb-2 pt-3">
          <h5>General</h5>
          <p>Setup your general profile details</p>
          <Formik
            initialValues={{
              photo: "",
              firstName: "",
              lastName: "",
              email: "",
              phoneNumber: "",
              nationalId: "",
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

              for (let entry of formData.entries()) {
                console.log(entry);
              }

              sendProfileData(formData);
            }}
          >
            {({ errors, touched, isSubmitting, values, setFieldValue }) => (
              <Form className="clearfix">
                <section className="col-md-5 float-md-end mb-3">
                  <h6 className="text-center w-50">Profile Picture</h6>
                  <img
                    src={user && user.photo}
                    alt="user2"
                    style={{
                      // borderRadius: "50%",
                      height: "150px",
                      width: "150px",
                      margin: "20px 60px",
                    }}
                  />
                  <input
                    type="file"
                    name="photo"
                    id="photo"
                    className={`form-control w-75 ${
                      errors.photo && touched.photo ? "input-error" : ""
                    }`}
                    onChange={(event) =>
                      setFieldValue("photo", event.target.files[0])
                    }
                  />
                  <span className="errors">
                    <ErrorMessage name="photo" />
                  </span>
                </section>

                {/* firstName */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="firstName" className="form-label">
                    First Name<span className="text-danger ms-2">*</span>
                  </label>
                  <Field
                    placeholder={user && user.firstName}
                    type="text"
                    name="firstName"
                    id="firstName"
                    className={`form-control ${
                      errors.firstName && touched.firstName ? "input-error" : ""
                    }`}
                  />
                  <span className="errors">
                    <ErrorMessage name="firstName" />
                  </span>
                </div>
                {/* lastName */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Last Name<span className="text-danger ms-2">*</span>
                  </label>
                  <Field
                    placeholder={user && user.lastName}
                    type="text"
                    name="lastName"
                    id="lastName"
                    className={`form-control ${
                      errors.lastName && touched.lastName ? "input-error" : ""
                    }`}
                  />
                  <span className="errors">
                    <ErrorMessage name="lastName" />
                  </span>
                </div>
                {/* email */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="email" className="form-label">
                    Email<span className="text-danger ms-2">*</span>
                  </label>
                  <Field
                    placeholder={user && user.email}
                    type="email"
                    name="email"
                    id="email"
                    className={`form-control ${
                      errors.email && touched.email ? "input-error" : ""
                    }`}
                  />
                  <span className="errors">
                    <ErrorMessage name="email" />
                  </span>
                </div>

                {/* phone Number */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="phoneNumber" className="form-label">
                    Phone Number<span className="text-danger ms-2">*</span>
                  </label>
                  <Field
                    placeholder={user && user.phoneNumber}
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    className={`form-control ${
                      errors.phoneNumber && touched.phoneNumber
                        ? "input-error"
                        : ""
                    }`}
                  />
                  <span className="errors">
                    <ErrorMessage name="phoneNumber" />
                  </span>
                </div>
                {/* national Id */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="nationalId">
                    National Id<span className="text-danger ms-2">*</span>
                  </label>
                  <Field
                    placeholder={user && user.nationalId}
                    type="text"
                    name="nationalId"
                    id="nationalId"
                    className={`form-control ${
                      errors.nationalId && touched.nationalId
                        ? "input-error"
                        : ""
                    }`}
                  />
                  <span className="errors">
                    <ErrorMessage name="nationalId" />
                  </span>
                </div>

                <div className="col-md-6 d-flex justify-content-center">
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
