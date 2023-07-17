import { Form, Formik, Field } from "formik";
import React from "react";

function MentorProfile() {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              pfNumber: "",
              nationalId: "",
              email: "",
              phoneNumber: "",
              passport: "",
              school: "",
              description: "",
            }}
          >
            {(props) => (
              <Form className="row g-2">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <Field
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="form-control"
                />
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <Field
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="form-control"
                />
                <label htmlFor="pfNumber" className="form-label">
                  pfNumber
                </label>
                <Field
                  type="text"
                  name="pfNumber"
                  id="pfNumber"
                  className="form-control"
                />
                <label htmlFor="nationalId" className="form-label">
                  National Id
                </label>
                <Field
                  type="text"
                  id="nationalId"
                  name="nationalId"
                  className="form-control"
                />

                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <Field
                  type="text"
                  id="email"
                  name="email"
                  className="form-control"
                />

                <label htmlFor="phoneNumber" className="form-label">
                  Phone Number
                </label>
                <Field
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  className="form-control"
                />

                <label htmlFor="passport" className="form-control">
                  Passport photo
                </label>
                <Field
                  type="file"
                  name="passport"
                  id="passport"
                  className="form-control"
                />

                <label htmlFor="school" className="form-label">
                  School
                </label>
                <Field
                  type="text"
                  name="school"
                  id="school"
                  className="form-control"
                />

                <label htmlFor="description">
                  A brief description of your area of specialization
                </label>
                <Field
                  type="text"
                  name="description"
                  id="description"
                  className="form-control"
                />

                <button className="btn btn-success" type="submit">
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default MentorProfile;
