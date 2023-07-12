import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

function Adminadmins() {
  return (
    <div className="container-fluid">
      <div className="row vh-100">
        <div className="col-12 col-lg-8 me-2 bg-success"></div>
        <div className="col">
          <Formik initialValues={{ email: "", nationalID: "" }}>
            {({ errors, touched, isSubmitting }) => (
              <Form className="row border rounded px-2 py-4 row justify-content-center g-2">
                <h5 className="text-center">Add Admin</h5>
                <div className="col-10">
                  <label htmlFor="email">Email</label>
                  <Field
                    type="email"
                    name="email"
                    className="form-control"
                    id="email"
                  />
                </div>
                <div className="col-10">
                  <label htmlFor="nationalID" className="form-label">
                    National ID
                  </label>
                  <Field
                    type="text"
                    name="nationalID"
                    id="nationalID"
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
          <article>Admin logs</article>
        </div>
      </div>
    </div>
  );
}

export default Adminadmins;
