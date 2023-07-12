import { Formik, Form, ErrorMessage, Field } from "formik";

function AdminMentor() {
  return (
    <div className="container-fluid">
      <div className="row vh-100 g-2 ">
        <div className="col-lg-8 bg-danger me-2"></div>
        <div className="col align-items-center">
          <Formik initialValues={{ email: "", nationalID: "" }}>
            {({ error, touched }) => (
              <Form className="row border rounded px-2 py-4 row justify-content-center g-2">
                <h6 className="text-center">Add mentor</h6>
                <div className="col-10">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="form-control"
                    id="email"
                  />
                </div>
                <div className="col-10">
                  <label htmlFor="nationaID" className="form-label">
                    National Id
                  </label>
                  <Field
                    type="text"
                    name="nationalID"
                    id="nationalID"
                    className="form-control"
                  />
                </div>
                <div className="col d-flex justify-content-center w-100">
                  <button type="submit" className="btn btn-success w-50">
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <p>Link mentor to innovator</p>
        </div>
      </div>
    </div>
  );
}

export default AdminMentor;
