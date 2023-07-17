import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { services } from "../../data";

function ExpectationForm() {
  const url =
    "http://localhost/incubation_system_rest_api/innovator/handleExpectationForm.php";

  async function sendExpectationFormData(formData, actions) {
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

  return (
    <div className="container-fluid bg-body-secondary">
      <div className="row justify-content-around">
        <div className="col-lg-7 border rounded p-3 bg-body-tertiary bg-danger">
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              phoneNumber: "",
              email: "",
              nationalId: "",
              userExpectation: "",
              stageEnterPricePyramid: "",
              projectBasedService: "",
            }}
            onSubmit={(values, actions) => {
              const formData = new FormData();
              Object.keys(values).forEach((key) => {
                formData.append(key, values[key]);
              });

              sendExpectationFormData(formData, actions);
              // for (let entry of formData.entries()) {
              //   console.log(entry);
              // }
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="row g-3">
                <h6>Expectation Form</h6>
                {/* firstName */}
                <div className="col-md-6">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <Field
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="form-control"
                  />
                </div>
                {/* lastName */}
                <div className="col-md-6">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <Field
                    type="text"
                    name="lastName"
                    id="lastName"
                    className="form-control"
                  />
                </div>
                {/* phoneNumber */}
                <div className="col-md-6">
                  <label htmlFor="phoneNumber" className="form-label">
                    Phone Number
                  </label>
                  <Field
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    className="form-control"
                  />
                </div>
                {/* email */}
                <div className="col-md-6">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <Field
                    type="text"
                    name="email"
                    id="email"
                    className="form-control"
                  />
                </div>
                {/* national Id */}
                <div className="col-md-6">
                  <label htmlFor="nationalId" className="form-label">
                    National ID
                  </label>
                  <Field
                    name="nationalId"
                    type="text"
                    className="form-control"
                    id="nationalId"
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="userExpectation" className="form-label">
                    A brief outline of your expectations about the service
                    package at the innovation center
                  </label>
                  <Field
                    name="userExpectation"
                    id="userExpectation"
                    type="text"
                    className="form-control"
                  />
                </div>

                <div className="col-md-6">
                  <label
                    htmlFor="stageEnterPricePyramid"
                    className="form-label"
                  >
                    Provide the stage of your innovation based on the enterprise
                    pyramid
                  </label>
                  <Field
                    name="stageEnterPricePyramid"
                    id="stageEnterPricePyramid"
                    as="select"
                    className="form-select"
                  >
                    <option value="Idea">Idea</option>
                    <option value="Business plan">Business Plan</option>
                    <option value="Revenue">Revenue</option>
                    <option value="Profit">Profit</option>
                    <option value="Scale">Scale</option>
                  </Field>
                </div>
                <div className="col-md-6">
                  <label htmlFor="projectBasedService">
                    Provide a service that your project needs to be based on
                  </label>
                  <Field
                    as="select"
                    name="projectBasedService"
                    id="projectBasedService"
                    className="form-select"
                  >
                    {services.map((services) => (
                      <option key={services.id} value={services.name}>
                        {services.name}
                      </option>
                    ))}
                  </Field>
                </div>

                <div className="col-12 d-flex justify-content-center">
                  <button
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
                  <label htmlFor="innovationStage" className="form-label">
                    Innovation Stage
                  </label>
                  <Field
                    type="text"
                    name="innovationStage"
                    id="innovationStage"
                    className="form-control"
                  />

                  <label htmlFor="userMVP" className="form-label">
                    Do you have a minimum viable product (MVP)?
                  </label>
                  <Field
                    name="userMVP"
                    type="text"
                    id="userMVP"
                    className="form-control"
                  />
                  <label htmlFor="commercialized" className="form-label">
                    is the innovation Commercialized
                  </label>
                  <Field
                    type="text"
                    name="commercialized"
                    id="commercialized"
                    className="form-control"
                  />
                  <button type="submit" className="btn btn-success">
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          </article>
          <article>
            <Formik
              initialValues={{
                threeMonthsAchievement: "",
                challengesFaced: "",
                milestoneAchieved: "",
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
                  <h6>Quartely Milestone Feedback</h6>
                  <label
                    htmlFor="threeMonthsAchievement"
                    className="form-label"
                  >
                    Achievements over the last 3 months
                  </label>
                  <Field
                    type="text"
                    name="threeMonthsAchievement"
                    id="threeMonthsAchievement"
                    className="form-control"
                  />
                  <label htmlFor="challengesFaced" className="form-label">
                    Challenges faced during the course of the quarter
                  </label>
                  <Field
                    type="text"
                    name="challengesFaced"
                    id="challengesFaced"
                    className="form-control"
                  />
                  <label htmlFor="milestoneAchieved" className="form-label">
                    Milestone Achieved
                  </label>
                  <Field
                    type="text"
                    name="milestoneAchieved"
                    id="milestoneAchieved"
                    className="form-control"
                  />
                  <div className="col-12">
                    <button type="submit" className="btn btn-success w-50">
                      Submit
                    </button>
                  </div>
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
