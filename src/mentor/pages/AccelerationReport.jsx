import { Field, Form, Formik, ErrorMessage } from "formik";
import React from "react";
import { TextField } from "@mui/material";

function AccelerationReport() {
  return (
    <div className="container">
      <div className="row justify-content-around mt-3">
        <div className="col-md-6 ">
          <Formik
            initialValues={{
              incubateName: "",
              dateOfMentorship: "",
              mentorshipDuration: "",
              mentorName: "",
              activitiesImplemented: "",
              challengesEncountered: "",
              proposedSolution: "",
              resourseRequirement: "",
              otherComments: "",
            }}
            onSubmit={(values) => {
              const formData = new FormData();
              Object.keys(values).forEach((key) => {
                formData.append(key, values[key]);
              });

              for (let entry of formData.entries()) {
                console.log(entry);
              }

              //sendPQuarterlyReport(formData);
            }}
          >
            {(props) => (
              <Form className="row g-2 bg-light border shadow rounded p-3">
                <legend>Innovation acceleration report</legend>

                {/* Name of Incubate */}
                <div className="col-12 mb-2">
                  <Field name="incubateName">
                    {({ field }) => (
                      <TextField
                        {...field}
                        variant="standard"
                        fullWidth
                        helperText={
                          <span className="errors">
                            <ErrorMessage name="incubateName " />
                          </span>
                        }
                        label="Name of Mentee"
                      />
                    )}
                  </Field>
                </div>

                {/* Date of mentorship */}
                <div className="col-12 mb-2">
                  <Field name="dateOfMentorship">
                    {({ field }) => (
                      <TextField
                        {...field}
                        variant="standard"
                        fullWidth
                        helperText={
                          <span className="errors">
                            <ErrorMessage name="dateOfMentorship" />
                          </span>
                        }
                        label="Date of MentorShip"
                      />
                    )}
                  </Field>
                </div>

                {/* mentorship duration */}
                <div className="col-12 mb-2">
                  <Field name="mentorshipDuration">
                    {({ field }) => (
                      <TextField
                        {...field}
                        variant="standard"
                        fullWidth
                        helperText={
                          <span className="errors">
                            <ErrorMessage name="mentorshipDuration " />
                          </span>
                        }
                        label="How Long was the mentorship session?"
                      />
                    )}
                  </Field>
                </div>

                {/* mentors Name */}
                <div className="col-12 mb-2">
                  <Field name="mentorName">
                    {({ field }) => (
                      <TextField
                        {...field}
                        variant="standard"
                        fullWidth
                        helperText={
                          <span className="errors">
                            <ErrorMessage name="mentorName " />
                          </span>
                        }
                        label="Name of the mentor"
                      />
                    )}
                  </Field>
                </div>

                {/* activities implemented */}
                <div className="col-12 mb-2">
                  <Field name="activitiesImplemented">
                    {({ field }) => (
                      <TextField
                        {...field}
                        variant="standard"
                        multiline
                        maxRows={5}
                        fullWidth
                        helperText={
                          <span className="errors">
                            <ErrorMessage name="activitiesImplemented " />
                          </span>
                        }
                        label="List of challenges encountered"
                      />
                    )}
                  </Field>
                </div>

                {/* proposed solution */}
                <div className="col-12 mb-2">
                  <Field name="proposedSolution">
                    {({ field }) => (
                      <TextField
                        {...field}
                        variant="standard"
                        multiline
                        maxRows={5}
                        fullWidth
                        helperText={
                          <span className="errors">
                            <ErrorMessage name="proposedSolution " />
                          </span>
                        }
                        label="List of proposed solution going forward"
                      />
                    )}
                  </Field>
                </div>

                {/* resource requirement */}
                <div className="col-12 mb-2">
                  <Field name="resourceRequirement">
                    {({ field }) => (
                      <TextField
                        {...field}
                        variant="standard"
                        fullWidth
                        multiline
                        maxRows={5}
                        helperText={
                          <span className="errors">
                            <ErrorMessage name="resourceRequirement " />
                          </span>
                        }
                        label="List of resource requirement"
                      />
                    )}
                  </Field>
                </div>

                {/* Other comments */}
                <div className="col-12 mb-2">
                  <Field name="otherComments">
                    {({ field }) => (
                      <TextField
                        {...field}
                        variant="standard"
                        maxRows={5}
                        multiline
                        fullWidth
                        helperText={
                          <span className="errors">
                            <ErrorMessage name="otherComments " />
                          </span>
                        }
                        label="Other comments / remarks"
                      />
                    )}
                  </Field>
                </div>

                <div className="col-12 d-flex justify-content-center">
                  <button className="btn btn-success w-50"> Submit</button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div className="col-md-5 ">
          <Formik
            initialValues={{
              numberOfSessions: "",
              menteeAchievement: "",
              challengesFaced: "",
              achievementMilestone: "",
            }}
            onSubmit={(values) => {
              const formData = new FormData();
              Object.keys(values).forEach((key) => {
                formData.append(key, values[key]);
              });

              for (let entry of formData.entries()) {
                console.log(entry);
              }

              //sendPQuarterlyReport(formData);
            }}
          >
            {(props) => (
              <Form className="row g-2 border rounded shadow bg-light p-3">
                <legend>Quarterly Report</legend>

                {/* Number of Sessions */}
                <div className="col-12 mb-2">
                  <Field name="numberOfSessions">
                    {({ field }) => (
                      <TextField
                        {...field}
                        variant="standard"
                        fullWidth
                        helperText={
                          <span className="errors">
                            <ErrorMessage name="numberOfSessions " />
                          </span>
                        }
                        label="Number of Sessions"
                      />
                    )}
                  </Field>
                </div>
                {/* Mentee achievement */}
                <div className="col-12 mb-2">
                  <Field name="menteeAchievement">
                    {({ field }) => (
                      <TextField
                        {...field}
                        variant="standard"
                        fullWidth
                        multiline
                        maxRows={5}
                        helperText={
                          <span className="errors">
                            <ErrorMessage name="menteeAchievement " />
                          </span>
                        }
                        label="Mentee Achievement"
                      />
                    )}
                  </Field>
                </div>

                {/* challenges Faced*/}
                <div className="col-12 mb-2">
                  <Field name="challengesFaced">
                    {({ field }) => (
                      <TextField
                        {...field}
                        variant="standard"
                        multiline
                        maxRows={5}
                        fullWidth
                        helperText={
                          <span className="errors">
                            <ErrorMessage name="challengesFaced " />
                          </span>
                        }
                        label="Challenges Faced"
                      />
                    )}
                  </Field>
                </div>

                {/* achievement milestone */}
                <div className="col-12 mb-2">
                  <Field name="achievementMilestone">
                    {({ field }) => (
                      <TextField
                        {...field}
                        multiline
                        maxRows={5}
                        variant="standard"
                        fullWidth
                        helperText={
                          <span className="errors">
                            <ErrorMessage name="achievementMilestone " />
                          </span>
                        }
                        label="Achievement Milestone"
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
      </div>
    </div>
  );
}

export default AccelerationReport;
