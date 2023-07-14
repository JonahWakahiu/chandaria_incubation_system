import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { stages, categories } from "../../data";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function InnovatorProfile() {
  return (
    <div className="container-fluid d-flex justify-content-center bg-body-secondary">
      <div className="row w-75 border rounded mt-4 mb-5 px-3 bg-body-tertiary d-flex justify-content-between">
        <div className="col-md-10 col-lg-9 col-xl-8 pb-2">
          <h5>General</h5>
          <p>Setup your general profile details</p>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              phoneNumber: "",
              nationalId: "",
              incubationDate: "",
              partnerNames: "",
              innovationCategory: "",
              innovationStage: "",
              description: "",
            }}
          >
            {({ errors, touched, isSubmitting, values, setFieldValue }) => (
              <Form className="row g-2">
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
                      errors.nationalId && touched.nationalId
                        ? "input-error"
                        : ""
                    }`}
                  />
                  <span className="errors">
                    <ErrorMessage name="nationalId" />
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
                <div className="col-12">
                  <label htmlFor="description" className="form-label">
                    A brief description of your innovation. (not exceeding 250
                    words)<span className="text-danger ms-2">*</span>
                  </label>
                  <Field
                    style={{ height: "150px" }}
                    as="textarea"
                    name="description"
                    id="description"
                    className={`form-control ${
                      errors.description && touched.description
                        ? "input-error"
                        : ""
                    }`}
                  />
                </div>

                <button type="submit" className="btn btn-success">
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
        <div className="col-md-3" style={{ marginTop: "100px" }}>
          <h6 className="">Profile Picture</h6>
          <img
            src="/img/user22.jpg"
            alt="user2"
            style={{
              borderRadius: "50%",
              height: "150px",
              width: "150px",
              margin: "0 auto",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default InnovatorProfile;
