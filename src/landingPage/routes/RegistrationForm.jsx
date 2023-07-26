import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import DatePicker from "react-datepicker";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/landingPage.css";
import ReCAPTCHA from "react-google-recaptcha";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { stages, categories, schools } from "../../data";
import { useNavigate } from "react-router-dom";

function RegistrationForm() {
  const navigate = useNavigate();
  const url =
    "http://localhost/incubation_system_rest_api/LandingPage/registration.php";

  async function sendInputData(formData, actions) {
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
        actions.setSubmitting(false);
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
        navigate("/login");
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
      actions.setSubmitting(false);
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

  return (
    <div className="bg-light">
      <div className="container d-flex justify-content-center">
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            verificationCode: "",
            phoneNumber: "",
            nationalId: "",
            photo: "",
            kuStudent: "",
            school: "",
            registrationNumber: "",
            ipRegistered: "",
            incubationDate: "",
            partnerNames: "",
            innovationCategory: "",
            innovationStage: "",
            description: "",
            ReCAPTCHA: "",
          }}
          // validationSchema={Yup.object().shape({
          //   firstName: Yup.string()
          //     .matches(
          //       /^[a-zA-Z]{2,15}$/,
          //       "Should only contains alphabets and 2 to 15 characters"
          //     )
          //     .required("Required"),
          //   lastName: Yup.string()
          //     .matches(
          //       /^[a-zA-Z]{2,20}$/,
          //       "Should only contains alphabets and 2 to 20 characters"
          //     )
          //     .required("Required"),
          //   email: Yup.string()
          //     .email("Invalid Email address")
          //     .required("Required"),
          //   phoneNumber: Yup.string()
          //     .matches(/^0(1|7)[\d]{8}$/, "Invalid phone number hint: 07/01")
          //     .required("Required"),
          //   nationalId: Yup.string()
          //     .matches(/^[0-9]{8}$/, "National Id must be 8 characters only")
          //     .required("Required"),
          //   photo: Yup.mixed()
          //     .required("Required")
          //     .test(
          //       "FILE_SIZE",
          //       "Too big!",
          //       (value) => value && value.size < 1024 * 1024
          //     )
          //     .test(
          //       "FILE_TYPE",
          //       "Invalid!",
          //       (value) =>
          //         value && ["image/png", "image/jpeg"].includes(value.type)
          //     ),
          //   kuStudent: Yup.string().required("required"),
          //   ipRegistered: Yup.string().required("Required"),
          //   incubationDate: Yup.string().required("Required"),
          //   partnerNames: Yup.string().test(
          //     "wordCount",
          //     "Description should not exceed 50 words",
          //     (value) => {
          //       if (value) {
          //         const wordCount = value.trim().split(/\s+/).length;
          //         return wordCount <= 50;
          //       }
          //       return true;
          //     }
          //   ),
          //   innovationCategory: Yup.string()
          //     .required("Required")
          //     .notOneOf(["Choose..."], "Please select an option"),
          //   innovationStage: Yup.string()
          //     .required("Required")
          //     .notOneOf(["Choose..."], "Please select an option"),
          //   description: Yup.string()
          //     .required("Required")
          //     .test(
          //       "wordCount",
          //       "Description should not exceed 250 words",
          //       (value) => {
          //         if (value) {
          //           const wordCount = value.trim().split(/\s+/).length;
          //           return wordCount <= 250;
          //         }
          //         return true;
          //       }
          //     ),
          //   ReCAPTCHA: Yup.string().required("Required"),
          // })}
          onSubmit={(values, actions) => {
            const formData = new FormData();
            Object.keys(values).forEach((key) => {
              formData.append(key, values[key]);
            });

            sendInputData(formData, actions);
            // for (let entry of formData.entries()) {
            //   console.log(entry);
            // }
          }}
        >
          {({ errors, touched, isSubmitting, values, setFieldValue }) => (
            <Form
              className="row g-3 border rounded px-3 pb-3"
              id="registrationForm"
            >
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

              <h4
                className="text-center border-bottom pb-2"
                id="registrationHeader"
              >
                Registration Form
              </h4>
              {/* firstName */}
              <div className="col-md-6">
                <label htmlFor="firstName" className="form-label">
                  First Name<span className="text-danger ms-2">*</span>
                </label>
                <Field
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
              <div className="col-md-6">
                <label htmlFor="lastName" className="form-label">
                  Last Name<span className="text-danger ms-2">*</span>
                </label>
                <Field
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
              <div className="col-md-6">
                <label htmlFor="email" className="form-label">
                  Email<span className="text-danger ms-2">*</span>
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className={`form-control ${
                    errors.email && touched.email ? "input-error" : ""
                  }`}
                />
                <label htmlFor="verificationCode" className="form-label mt-2">
                  Verification Code
                </label>
                <Field
                  type="text"
                  name="verificationCode"
                  id="verificationCode"
                  className="form-control"
                />
                <span className="errors">
                  <ErrorMessage name="email" />
                </span>
              </div>
              {/* phone Number */}
              <div className="col-md-6">
                <label htmlFor="phoneNumber" className="form-label">
                  Phone Number<span className="text-danger ms-2">*</span>
                </label>
                <Field
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
              <div className="col-md-6">
                <label htmlFor="nationalId">
                  National Id<span className="text-danger ms-2">*</span>
                </label>
                <Field
                  type="text"
                  name="nationalId"
                  id="nationalId"
                  className={`form-control ${
                    errors.nationalId && touched.nationalId ? "input-error" : ""
                  }`}
                />
                <span className="errors">
                  <ErrorMessage name="nationalId" />
                </span>
              </div>

              {/* photo */}
              <div className="col-md-6">
                <label htmlFor="photo" className="form-label">
                  Photo<span className="text-danger">*</span>
                </label>
                <input
                  type="file"
                  name="photo"
                  id="photo"
                  className={`form-control ${
                    errors.photo && touched.photo ? "input-error" : ""
                  }`}
                  onChange={(event) =>
                    setFieldValue("photo", event.target.files[0])
                  }
                />
                <span className="errors">
                  <ErrorMessage name="photo" />
                </span>
              </div>

              {/* kuStudent or not */}
              <div className="col-md-6">
                <div id="kuStudent">
                  Are you a Ku student?
                  <span className="text-danger ms-2">*</span>
                </div>

                <div className="form-check">
                  <label>
                    <Field
                      type="radio"
                      name="kuStudent"
                      value="Yes"
                      className="form-check-input"
                    />
                    Yes
                  </label>
                </div>
                <div className="form-check">
                  <label>
                    <Field
                      type="radio"
                      name="kuStudent"
                      value="No"
                      className="form-check-input"
                    />
                    No
                  </label>
                </div>
                {values.kuStudent === "Yes" ? (
                  <>
                    <label htmlFor="school" className="school">
                      School
                    </label>
                    <Field as="select" name="school" className="form-select">
                      {schools.map((school) => (
                        <option key={school.id} value={school.name}>
                          {school.name}
                        </option>
                      ))}
                    </Field>

                    <label htmlFor="registrationNumber" className="form-label">
                      Registration Number
                    </label>
                    <Field
                      type="text"
                      name="registrationNumber"
                      className="form-control"
                    />
                  </>
                ) : null}
                <span className="errors">
                  <ErrorMessage name="kuStudent" />
                </span>
              </div>

              {/* is your Ip registered */}
              <div className="col-md-6">
                <div id="ipRegistered">
                  Is your Ip registered?
                  <span className="text-danger ms-2">*</span>
                </div>

                <div className="form-check">
                  <label>
                    <Field
                      type="radio"
                      name="ipRegistered"
                      value="Yes"
                      className="form-check-input"
                    />
                    Yes
                  </label>
                </div>
                <div className="form-check">
                  <label>
                    <Field
                      type="radio"
                      name="ipRegistered"
                      value="No"
                      className="form-check-input"
                    />
                    No
                  </label>
                </div>
                <span className="errors">
                  <ErrorMessage name="ipRegistered" />
                </span>
              </div>

              {/* incubation Date */}
              <div className="col-md-6">
                <label htmlFor="incubationDate">
                  IncubationDate<span className="text-danger ms-2">*</span>
                </label>
                <DatePicker
                  id="incubationDate"
                  className={`form-control ${
                    errors.incubationDate && touched.incubationDate
                      ? "input-error"
                      : ""
                  }`}
                  autoComplete="off"
                  onChange={(date) => setFieldValue("incubationDate", date)}
                  selected={values.incubationDate}
                  dateFormat="yyyy/MM/dd"
                  maxDate={new Date()}
                />
                <span className="errors">
                  <ErrorMessage name="incubationDate" />
                </span>
              </div>

              {/* names of key partner */}
              <div className="col-md-6">
                <label htmlFor="partnerNames" className="form-label">
                  Name of key partners / investors if any
                </label>
                <Field
                  type="text"
                  name="partnerNames"
                  id="partnerNames"
                  className={`form-control ${
                    errors.partnerNames && touched.partnerNames
                      ? "input-error"
                      : ""
                  }`}
                />
                <span className="errors">
                  <ErrorMessage name="partnerNames" />
                </span>
              </div>

              {/* innovation Category */}
              <div className="col-md-6">
                <label htmlFor="innovationCategory">
                  Category of Your Innovation
                  <span className="text-danger ms-2">*</span>
                </label>
                <Field
                  as="select"
                  name="innovationCategory"
                  id="innovationCategory"
                  className={`form-select ${
                    errors.innovationCategory && touched.innovationCategory
                      ? "input-error"
                      : ""
                  }`}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </Field>
                <span className="errors">
                  <ErrorMessage name="innovationCategory" />
                </span>
              </div>

              {/* innovation stage */}
              <div className="col-md-6">
                <label htmlFor="innovationStage">
                  Stage of your Innovation
                  <span className="text-danger ms-2">*</span>
                </label>
                <Field
                  as="select"
                  name="innovationStage"
                  id="innovationStage"
                  className={`form-select ${
                    errors.innovationStage && touched.innovationStage
                      ? "input-error"
                      : ""
                  }`}
                >
                  {stages.map((stage) => (
                    <option key={stage.id} value={stage.name}>
                      {stage.name}
                    </option>
                  ))}
                </Field>
                <span className="errors">
                  <ErrorMessage name="innovationStage" />
                </span>
              </div>

              {/* description */}
              <div className="col">
                <label htmlFor="description" className="form-label">
                  A brief description of your innovation. (not exceeding 250
                  words)<span className="text-danger ms-2">*</span>
                </label>
                <Field
                  style={{ height: "300px" }}
                  as="textarea"
                  name="description"
                  id="description"
                  className={`form-control ${
                    errors.description && touched.description
                      ? "input-error"
                      : ""
                  }`}
                />
                <span className="errors">
                  <ErrorMessage name="innovationStage" />
                </span>
              </div>
              <section>
                <ReCAPTCHA
                  name="ReCAPTCHA"
                  sitekey="6Lckv7AmAAAAAK9AlfL0fGpqN-2r3jdckUghvx_L"
                  onChange={() => setFieldValue("ReCAPTCHA", true)}
                  onExpired={() => setFieldValue("ReCAPTCHA", false)}
                />
                <span className="errors">
                  <ErrorMessage name="ReCAPTCHA" />
                </span>
              </section>
              <span className="col-12 d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-success registrationButton"
                  id="submitButton"
                >
                  Submit
                </button>
              </span>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default RegistrationForm;
