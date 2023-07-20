import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { TextField, MenuItem } from "@mui/material";
import { stages } from "../../data";
import "../Innovator.css";

function ExpectationForm() {
  return (
    <div className="container-fluid bg-body-secondary">
      <div className="row justify-content-around pt-3" id="reports-wrapper">
        <div className="col-lg-7 border rounded p-3 bg-body-tertiary bg-danger">
          <Formik
            initialValues={{
              companyName: "",
              proprietorsName: "",
              mentorsName: "",
              productDescription: "",
              productionStage: "",
              facilities: "",
              businessPlan: "",
              financialPlan: "",
              taxReturns: "",
              achievement: "",
              challenges: "",
              milestone: "",
            }}
          >
            {(props) => (
              <Form className="row g-3">
                <h3>Quarterly Progress Report</h3>

                <div className="col-md-6">
                  <Field
                    type="text"
                    name="companyName"
                    id="companyName"
                    fullWidth
                    label="Name of Company"
                    variant="standard"
                    as={TextField}
                    helperText={<ErrorMessage name="companyName" />}
                  />
                </div>

                <div className="col-md-6">
                  <Field
                    type="text"
                    name="proprietorsName"
                    label="Name of Proprietors"
                    id="proprietorsName"
                    fullWidth
                    variant="standard"
                    as={TextField}
                    helperText={<ErrorMessage name="proprietorsName" />}
                  />
                </div>

                <div className="col-md-6">
                  <Field
                    type="text"
                    name="mentorsName"
                    id="mentorsName"
                    label="Name of mentors"
                    fullWidth
                    variant="standard"
                    as={TextField}
                    helperText={<ErrorMessage name="mentorsName" />}
                  />
                </div>

                <div className="col-md-6">
                  <Field
                    type="text"
                    name="productDescription"
                    id="productDescription"
                    label="Description of Product"
                    multiline
                    maxRows={5}
                    fullWidth
                    variant="standard"
                    as={TextField}
                    helperText={<ErrorMessage name="productDescription" />}
                  />
                </div>

                <div className="col-md-6">
                  <Field
                    type="text"
                    name="productionStage"
                    id="productionStage"
                    label="Stage in Production"
                    variant="standard"
                    select
                    fullWidth
                    as={TextField}
                    helperText={<ErrorMessage name="productDescription" />}
                  >
                    {stages.map((stages) => (
                      <MenuItem key={stages.id} value={stages.name}>
                        {stages.name}
                      </MenuItem>
                    ))}
                  </Field>
                </div>

                <div className="col-md-6">
                  <Field
                    type="text"
                    name="facilities"
                    id="facilities"
                    label="Facilities"
                    fullWidth
                    variant="standard"
                    as={TextField}
                    helperText={<ErrorMessage name="facilities" />}
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="financialPlan" className="form-label">
                    Financial Plan
                  </label>

                  <Field
                    type="file"
                    name="financialPlan"
                    id="financialPlan"
                    variant="standard"
                    as={TextField}
                    helperText={<ErrorMessage name="financialPlan" />}
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="texReturns" className="form-label">
                    Tax Returns
                  </label>

                  <Field
                    type="file"
                    name="taxReturns"
                    id="taxReturns"
                    variant="standard"
                    as={TextField}
                    helperText={<ErrorMessage name="taxReturns" />}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="nusinessPlan" className="form-label">
                    Business Plan
                  </label>

                  <Field
                    type="file"
                    name="businessPlan"
                    id="businessPlan"
                    variant="standard"
                    as={TextField}
                    helperText={<ErrorMessage name="businessPlan" />}
                  />
                </div>

                <h6>Incubate's Feedback</h6>

                <div className="col-md-6">
                  <Field
                    label="Achievements"
                    variant="standard"
                    as={TextField}
                    helperText={<ErrorMessage name="achievement" />}
                    type="text"
                    multiline
                    maxRows={5}
                    fullWidth
                    name="achievement"
                    id="achievement"
                  />
                </div>
                <div className="col-md-6">
                  <Field
                    type="text"
                    name="challenges"
                    id="challenges"
                    label="Challenges"
                    multiline
                    maxRows={5}
                    fullWidth
                    variant="standard"
                    as={TextField}
                    helperText={<ErrorMessage name="challenges" />}
                  />
                </div>
                <div className="col-md-6">
                  <Field
                    type="text"
                    name="milestone"
                    label="Milestone"
                    id="milestone"
                    multiline
                    maxRows={5}
                    fullWidth
                    variant="standard"
                    as={TextField}
                    helperText={<ErrorMessage name="milestone" />}
                  />
                </div>

                <div className="col-12 d-flex justify-content-center">
                  <button className="btn btn-success w-50" type="submit">
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div className="col-lg-3 ">
          <article>
            <Formik
              initialValues={{
                innovationStage: "",
                userMVP: "",
                commercialized: "",
              }}
              onSubmit={(values, actions) => {
                const formData = new FormData();
                Object.keys(values).forEach((key) => {
                  formData.append(key, values[key]);
                });

                // sendInputData(formData, actions);
                for (let entry of formData.entries()) {
                  console.log(entry);
                }
              }}
            >
              {({ errors, touched }) => (
                <Form className="row g-2 p-3 border rounded bg-body-tertiary">
                  <h6>Innovation tracking form</h6>

                  <div className="col-12">
                    <Field
                      as={TextField}
                      variant="standard"
                      type="text"
                      fullWidth
                      name="innovationStage"
                      id="innovationStage"
                      label="Innovation Stage"
                      helperText={<ErrorMessage name="firstName" />}
                    />
                  </div>

                  <div className="col-12">
                    <Field
                      name="userMVP"
                      type="text"
                      id="userMVP"
                      fullWidth
                      label="Do you have a minimum viable product (MVP)"
                      as={TextField}
                      variant="standard"
                    />
                  </div>
                  <div className="col-12">
                    <Field
                      type="text"
                      name="commercialized"
                      id="commercialized"
                      as={TextField}
                      variant="standard"
                      fullWidth
                      label="Is the Innovation Commercialized?"
                    />
                  </div>
                  <button type="submit" className="btn btn-success">
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          </article>
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

export default ExpectationForm;
