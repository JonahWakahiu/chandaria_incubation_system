import { useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { stages } from "../../data";
import "../Innovator.css";
import { UserContext } from "../../UserContext";

const BusinessDetailsURL =
  "http://localhost/incubation_system_rest_api/innovator/handleInnovationTrackingForm.php";
const QuarterlyProgressURL =
  "http://localhost/incubation_system_rest_api/innovator/handleQuaterlyProgressReport.php";

function ExpectationForm() {
  const { user, setUser } = useContext(UserContext);

  async function handleInnovationTrackingForm(formData, actions) {
    try {
      const response = await fetch(BusinessDetailsURL, {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        body: formData,
      });

      const responseData = await response.json();
      if (responseData.status === 200) {
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
  async function handleQuarterlyProgress(formData, actions) {
    try {
      const response = await fetch(QuarterlyProgressURL, {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json();
      if (responseData.status === 200) {
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
      toast.error("Error", {
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
    <div
      className="container-fluid bg-body-secondary"
      style={{ height: "94vh" }}
    >
      <div className="row justify-content-around mt-4" id="reports-wrapper">
        <div className="col-lg-7 border rounded p-3 bg-light">
          <Formik
            initialValues={{
              email: user ? user.email : "",
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
            onSubmit={(values, actions) => {
              const formData = new FormData();
              Object.keys(values).forEach((key) => {
                formData.append(key, values[key]);
              });

              handleQuarterlyProgress(formData, actions);
              // for (let entry of formData.entries()) {
              //   console.log(entry);
              // }
            }}
          >
            {({ setFieldValue, errors, touched }) => (
              <Form className="row g-3">
                <legend className="text-center">
                  Quarterly Progress Report
                </legend>

                <div className="col-md-6">
                  <Field name="companyName">
                    {({ field }) => (
                      <TextField
                        {...field}
                        variant="standard"
                        fullWidth
                        helperText={
                          <span className="errors">
                            <ErrorMessage name="companyName" />
                          </span>
                        }
                        label="Company Name"
                      />
                    )}
                  </Field>
                </div>

                <div className="col-md-6">
                  <Field name="proprietorsName">
                    {({ field }) => (
                      <TextField
                        {...field}
                        variant="standard"
                        fullWidth
                        helperText={
                          <span className="errors">
                            <ErrorMessage name="proprietorsName" />
                          </span>
                        }
                        label="Proprietors Name"
                      />
                    )}
                  </Field>
                </div>

                <div className="col-md-6">
                  <Field name="mentorsName">
                    {({ field }) => (
                      <TextField
                        {...field}
                        variant="standard"
                        fullWidth
                        helperText={
                          <span className="errors">
                            <ErrorMessage name="mentorsName" />
                          </span>
                        }
                        label="Mentors Name"
                      />
                    )}
                  </Field>
                </div>

                <div className="col-md-6">
                  <Field name="productDescription">
                    {({ field }) => (
                      <TextField
                        {...field}
                        variant="standard"
                        fullWidth
                        helperText={
                          <span className="errors">
                            <ErrorMessage name="productDescription" />
                          </span>
                        }
                        label="Product description"
                      />
                    )}
                  </Field>
                </div>

                <div className="col-md-6">
                  <Field name="productionStage">
                    {({ field }) => (
                      <FormControl variant="standard" fullWidth>
                        <InputLabel>
                          at which stage are you in production?
                        </InputLabel>
                        <Select {...field}>
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {stages.map((stages) => (
                            <MenuItem key={stages.id} value={stages.name}>
                              {stages.name}
                            </MenuItem>
                          ))}
                        </Select>
                        <span className="errors">
                          <ErrorMessage name="productionStage" />
                        </span>
                      </FormControl>
                    )}
                  </Field>
                </div>

                <div className="col-md-6">
                  <Field name="facilities">
                    {({ field }) => (
                      <TextField
                        {...field}
                        variant="standard"
                        fullWidth
                        helperText={
                          <span className="errors">
                            <ErrorMessage name="facilities" />
                          </span>
                        }
                        label="Facilities"
                      />
                    )}
                  </Field>
                </div>

                <div className="col-md-6">
                  <label htmlFor="businessPlan">Business Plan</label>
                  <input
                    type="file"
                    variant="standard"
                    name="businessPlan"
                    onChange={(event) =>
                      setFieldValue("businessPlan", event.target.files[0])
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="financialPlan">Financial Plan</label>
                  <input
                    name="financialPlan"
                    type="file"
                    variant="standard"
                    onChange={(event) =>
                      setFieldValue("financialPlan", event.target.files[0])
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="taxReturns">Tax Returns</label>
                  <input
                    name="taxReturns"
                    type="file"
                    variant="standard"
                    onChange={(event) =>
                      setFieldValue("taxReturns", event.target.files[0])
                    }
                  />
                </div>

                <h6>Incubate's Feedback</h6>

                <div className="col-md-6">
                  <Field name="achievement">
                    {({ field }) => (
                      <TextField
                        {...field}
                        multiline
                        maxRows={5}
                        variant="standard"
                        fullWidth
                        helperText={
                          <span className="errors">
                            <ErrorMessage name="achievement" />
                          </span>
                        }
                        label="Achievements"
                      />
                    )}
                  </Field>
                </div>

                <div className="col-md-6">
                  <Field name="challenges">
                    {({ field }) => (
                      <TextField
                        {...field}
                        variant="standard"
                        fullWidth
                        multiline
                        maxRows={5}
                        helperText={
                          <span className="errors">
                            <ErrorMessage name="challenges" />
                          </span>
                        }
                        label="Challenges"
                      />
                    )}
                  </Field>
                </div>

                <div className="col-md-6">
                  <Field name="milestone">
                    {({ field }) => (
                      <TextField
                        {...field}
                        variant="standard"
                        fullWidth
                        multiline
                        maxRows={5}
                        helperText={
                          <span className="errors">
                            <ErrorMessage name="milestone" />
                          </span>
                        }
                        label="Milestone"
                      />
                    )}
                  </Field>
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
        <div className="col-lg-3 p-3">
          <Formik
            initialValues={{
              email: user ? user.email : "",
              innovationStage: "",
              userMVP: "",
              commercialized: "",
            }}
            onSubmit={(values, actions) => {
              const formData = new FormData();
              Object.keys(values).forEach((key) => {
                formData.append(key, values[key]);
              });

              handleInnovationTrackingForm(formData, actions);
              // for (let entry of formData.entries()) {
              //   console.log(entry);
              // }
            }}
          >
            {({ errors, touched }) => (
              <Form className="row g-3 p-3 border rounded bg-light">
                <legend className="text-center">
                  Innovation tracking form
                </legend>

                <div className="col-12">
                  <Field name="innovationStage">
                    {({ field }) => (
                      <FormControl variant="standard" fullWidth>
                        <InputLabel>Innovation Stage</InputLabel>
                        <Select {...field} label="innovation Stage 1">
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {stages.map((stages) => (
                            <MenuItem key={stages.id} value={stages.name}>
                              {stages.name}
                            </MenuItem>
                          ))}
                        </Select>
                        <span className="errors">
                          <ErrorMessage name="innovationStage" />
                        </span>
                      </FormControl>
                    )}
                  </Field>
                </div>

                <div className="col-12">
                  <Field
                    name="userMVP"
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
