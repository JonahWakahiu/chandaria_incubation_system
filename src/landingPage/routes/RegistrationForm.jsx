import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import DatePicker from "react-datepicker";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/landingPage.css";
import ReCAPTCHA from "react-google-recaptcha";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RegistrationForm() {
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
      console.log(responseData.status);
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
        actions.resetForm();
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

  return (
    <div className="bg-light">
      <div className="container d-flex justify-content-center">
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
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
          validationSchema={Yup.object().shape({
            firstName: Yup.string()
              .matches(/^[a-zA-Z]+$/)
              .max(15, "Should be 15 or less characters")
              .min(2, "Should not be less than 2 characters")
              .required("Required"),
            lastName: Yup.string()
              .matches(
                /^[a-zA-Z]+$/,
                "Should only include alphabetic characters"
              )
              .max(20, "Should be 20 or less characters")
              .min(2, "Should not be less than 2 characters")
              .required("Required"),
            email: Yup.string()
              .email("Invalid Email address")
              .required("Required"),
            phoneNumber: Yup.string()
              .matches(/^0(1|7)[\d]{8}$/, "Invalid phone number hint: 07/01")
              .required("Required"),
            nationalId: Yup.string()
              .matches(/^[0-9]{8}$/, "National Id must be 8 characters only")
              .required("Required"),
            photo: Yup.mixed()
              .required("Required")
              .test(
                "FILE_SIZE",
                "Too big!",
                (value) => value && value.size < 1024 * 1024
              )
              .test(
                "FILE_TYPE",
                "Invalid!",
                (value) =>
                  value && ["image/png", "image/jpeg"].includes(value.type)
              ),
            kuStudent: Yup.string().required("required"),
            ipRegistered: Yup.string().required("Required"),
            incubationDate: Yup.string().required("Required"),
            partnerNames: Yup.string()
              .required("Required")
              .test(
                "wordCount",
                "Description should not exceed 50 words",
                (value) => {
                  if (value) {
                    const wordCount = value.trim().split(/\s+/).length;
                    return wordCount <= 50;
                  }
                  return true;
                }
              ),
            innovationCategory: Yup.string()
              .required("Required")
              .notOneOf(["Choose..."], "Please select an option"),
            innovationStage: Yup.string()
              .required("Required")
              .notOneOf(["Choose..."], "Please select an option"),
            description: Yup.string()
              .required("Required")
              .test(
                "wordCount",
                "Description should not exceed 250 words",
                (value) => {
                  if (value) {
                    const wordCount = value.trim().split(/\s+/).length;
                    return wordCount <= 250;
                  }
                  return true;
                }
              ),
            ReCAPTCHA: Yup.string().required("Required"),
          })}
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
          {(props) => (
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
                    props.errors.firstName && props.touched.firstName
                      ? "input-error"
                      : ""
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
                    props.errors.lastName && props.touched.lastName
                      ? "input-error"
                      : ""
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
                    props.errors.email && props.touched.email
                      ? "input-error"
                      : ""
                  }`}
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
                    props.errors.phoneNumber && props.touched.phoneNumber
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
                    props.errors.nationalId && props.touched.nationalId
                      ? "input-error"
                      : ""
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
                    props.errors.photo && props.touched.photo
                      ? "input-error"
                      : ""
                  }`}
                  onChange={(event) =>
                    props.setFieldValue("photo", event.target.files[0])
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
                {props.values.kuStudent === "Yes" ? (
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
                    props.errors.incubationDate && props.touched.incubationDate
                      ? "input-error"
                      : ""
                  }`}
                  autoComplete="off"
                  onChange={(date) =>
                    props.setFieldValue("incubationDate", date)
                  }
                  selected={props.values.incubationDate}
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
                    props.errors.partnerNames && props.touched.partnerNames
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
                    props.errors.innovationCategory &&
                    props.touched.innovationCategory
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
                    props.errors.innovationStage &&
                    props.touched.innovationStage
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
                    props.errors.description && props.touched.description
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
                  onChange={() => props.setFieldValue("ReCAPTCHA", true)}
                  onExpired={() => props.setFieldValue("ReCAPTCHA", false)}
                />
                <span className="errors">
                  <ErrorMessage name="ReCAPTCHA" />
                </span>
              </section>
              <span className="col-12 d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-success"
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

const schools = [
  { id: 1, name: "Choose..." },
  { id: 2, name: "School of Agriculture ad Environmental Science" },
  { id: 3, name: "School of Business, Economics and Tourism" },
  { id: 4, name: "School of Education" },
  { id: 5, name: "School of Engineering and Architecture" },
  { id: 6, name: "School of Health Science" },
  { id: 7, name: "School of Law, Arts and Social Sciences" },
  { id: 8, name: "School of Pure And Applied Science" },
  { id: 9, name: "Graduate School" },
  { id: 10, name: "Digital School of Virtual and Open Learning" },
];

const categories = [
  { id: 1, name: "Choose..." },
  { id: 2, name: "Business and Professional Services" },
  { id: 3, name: "Information and Professional Services" },
  { id: 4, name: "Marketing and Communication Technology" },
  { id: 5, name: "Manufacturing and Construction" },
  { id: 6, name: "Transport and logistics" },
  { id: 7, name: "Bio and Nano-Technology" },
  { id: 8, name: "Health and Nutrition" },
  { id: 9, name: "Green and ecological business" },
  { id: 10, name: "Tourism and eco-tourism" },
  { id: 11, name: "Fine and Performing Arts" },
  { id: 12, name: "Sports, Leisure and Entertainment" },
  { id: 13, name: "Water and Sanitation" },
  { id: 14, name: "Energy" },
  { id: 15, name: "Media and Entertainment" },
];

const stages = [
  { id: 1, name: "Choose..." },
  { id: 2, name: "Research and Development" },
  { id: 3, name: "Prototype phase" },
  { id: 4, name: "Start-up" },
  { id: 5, name: "Market phase" },
  { id: 6, name: "Scaling-up phase" },
  { id: 7, name: "Other(Specify)" },
];

export default RegistrationForm;
