import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

function Patent() {
  return (
    <div className="container-fluid">
      <div className="row vh-100">
        <div className="col-12 col-md-8 me-2 bg-success"></div>
        <div className="col border border-success ">
          <Formik
            initialValues={{
              patentName: "",
              patentOwner: "",
              patentNumber: "",
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="border rounded px-2 py-4 row justify-content-center g-2">
                <h5 className="text-center">Patent Form</h5>
                <div className="col-lg-10">
                  <label htmlFor="patentName" className="form-label">
                    Patent Name
                  </label>
                  <Field
                    type="text"
                    name="patentName"
                    id="patentName"
                    className="form-control"
                  />
                </div>
                <div className="col-lg-10">
                  <label htmlFor="patentOwner" className="form-label">
                    Patent Owner
                  </label>
                  <Field
                    type="text"
                    name="patentOwner"
                    id="patentOwner"
                    className="form-control"
                  />
                </div>
                <div className="col-lg-10">
                  <label htmlFor="patentNumber" className="form-label">
                    Patent Number
                  </label>
                  <Field
                    type="text"
                    name="patentNumber"
                    id="patentNumber"
                    className="form-control"
                  />
                </div>

                <div className="col-12 d-flex justify-content-center">
                  <button type="submit" className="btn btn-success w-50">
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

export default Patent;
