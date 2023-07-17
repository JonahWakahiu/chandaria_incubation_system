import { Field, Form, Formik } from "formik";
import React from "react";

function AccelerationReport() {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
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
          >
            {(props) => (
              <Form className="row g-2">
                <label htmlFor="incubateName">Name of the Incubatee</label>
                <Field
                  type="text"
                  name="incubateName"
                  id="incubateName"
                  className="form-control"
                />

                <label htmlFor="dateOfMentorship">Date of the mentorship</label>
                <Field
                  type="text"
                  name="dateOfMentorship"
                  id="dateOfMentorship"
                  className="form-control"
                />

                <label htmlFor="mentorshipDuration">
                  How long was the mentorship session?
                </label>
                <Field
                  type="text"
                  name="mentorshipDuration"
                  id="mentorshipDuration"
                  className="form-control"
                />

                <label htmlFor="mentorName"> Name of the mentor</label>
                <Field
                  type="text"
                  name="mentorName"
                  id="mentorName"
                  className="form-control"
                />

                <label htmlFor="activitiesImplemented">
                  List of challenges encountered
                </label>
                <Field
                  type="text"
                  name="activitiesImplemented"
                  id="activitiesImplemented"
                  className="form-control"
                />

                <label htmlFor="proposedSolution">
                  List of proposed solution going forward
                </label>
                <Field
                  type="text"
                  name="proposedSolution"
                  id="proposedSolution"
                  className="form-control"
                />

                <label htmlFor="resourceRequirement">
                  List of resources requirement
                </label>
                <Field
                  type="text"
                  name="resourceRequirement"
                  id="resourceRequirement"
                  className="form-control"
                />

                <label htmlFor="otherComments">Other comments / remarks</label>
                <Field
                  type="text"
                  name="otherComments"
                  id="otherComments"
                  className="form-control"
                />

                <button className="btn btn-success"> Submit</button>
              </Form>
            )}
          </Formik>
        </div>
        <div className="col">
          <h5>quartely report</h5>
          <Formik
            initialValues={{
              numberOfSessions: "",
              menteeAchievement: "",
              challengesFaced: "",
              achievementMilestone: "",
            }}
          >
            {(props) => (
              <Form className="row g-2">
                <label htmlFor="numberOfSessions" className="form-label">
                  Number of Sessions
                </label>
                <Field
                  type="text"
                  name="numberOfSessions"
                  id="numberOfSessions"
                  className="form-control"
                />

                <label htmlFor="menteeAchievement" className="form-label">
                  Achievements achieved by the mentee during that quarter
                </label>
                <Field
                  type="text"
                  name="menteeAchievement"
                  id="menteeAchievement"
                  className="form-control"
                />

                <label htmlFor="challengesFaced" className="form-label">
                  Challenges faced by the mentee
                </label>
                <Field
                  type="text"
                  name="challengesFaced"
                  id="challengesFaced"
                  className="form-control"
                />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default AccelerationReport;
