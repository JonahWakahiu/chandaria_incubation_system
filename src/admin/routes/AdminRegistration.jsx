import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

function AdminRegistration() {
  // const [query, setQuery] = useState("");
  // const [isLoading, setIsLoading] = useState(true);

  const [registrations, setRegistrations] = useState(null);

  useEffect(() => {
    async function getRegistrationData() {
      try {
        const response = await fetch(
          "http://192.168.15.19/incubation_system_rest_api/Admin/getRegstration.php",
          {
            method: "GET",
            header: {
              "Content-Type": "application/json",
            },
          }
        );

        const responseData = await response.json();
        if (responseData.success === true) {
          const registrations = responseData.data;
          setRegistrations(registrations);
        }
      } catch (error) {
        // error
      }
    }
    getRegistrationData();

    const interval = setInterval(() => {
      getRegistrationData();
    }, 3000);

    // Clear the interval when the component unmounts or when the dependencies change
    return () => {
      clearInterval(interval);
    };
  }, []);

  // send an id to the API to make the changes
  async function sendHandleAccept(id, email, firstName) {
    const acceptData = new FormData();
    acceptData.append("id", id);
    acceptData.append("email", email);
    acceptData.append("firstName", firstName);
    try {
      const response = await fetch(
        "http://localhost/incubation_system_rest_api/Admin/handleAccept.php",
        {
          method: "POST",
          header: {
            "Content-Type": "application/json",
          },
          body: acceptData,
        }
      );

      const responseData = await response.json();
      if (responseData.success === true) {
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
      toast.error("Server not found", {
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

  // send a request when the admi accepts the request
  function handleAccept(id, email, firstName) {
    sendHandleAccept(id, email, firstName);
    // console.log(email);
  }

  // if (isLoading) {
  //   return (
  //     <div className="vh-100 d-flex align-items-center justify-content-center bg-light">
  //       <h4>loading...</h4>
  //     </div>
  //   );
  // }

  // // sort function
  // const keys = [
  //   "lastName",
  //   "email",
  //   "nationalId",
  //   "phoneNumber",
  //   "innovationCategory",
  //   "innovationStage",
  // ];

  // const search = (data) => {
  //   return data.filter((item) =>
  //     keys.some((key) => item[key].toLowerCase().includes(query))
  //   );
  // };

  return (
    <>
      {/* <div className="container">
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
        <div className="row">
          <div className="col">
            <h3 className="text-center">Registrations received</h3>

            <input
              className="form-control mb-2"
              type="text"
              placeholder="Search..."
              aria-label="Search"
              style={{ width: "300px" }}
              onChange={(e) => setQuery(e.target.value)}
            />
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">email</th>
                  <th scope="col">National ID</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">innovation Category</th>
                  <th scope="col">innovation Stage</th>
                  <th scope="col">Status</th>
                  <th scope="col">operation</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {registrations && (
                  <>
                    {search(registrations).map((registration, index) => {
                      const {
                        id,
                        firstName,
                        lastName,
                        email,
                        nationalId,
                        phoneNumber,
                        innovationCategory,
                        innovationStage,
                      } = registration;

                      return (
                        <tr key={id}>
                          <td>{index + 1}</td>
                          <td>{firstName}</td>
                          <td>{lastName}</td>
                          <td>{email}</td>
                          <td>{nationalId}</td>
                          <td>{phoneNumber}</td>
                          <td>{innovationCategory}</td>
                          <td>{innovationStage}</td>
                          <td>
                            <small>pending...</small>
                          </td>
                          <td>
                            <div className="btn-group g-2">
                              <button
                                className="btn btn-success btn-sm me-2"
                                type="button"
                                onClick={() =>
                                  handleAccept(id, email, firstName)
                                }
                              >
                                accept
                              </button>
                            </div>
                          </td>
                          <td>
                            <button className="btn btn-warning btn-sm">
                              View
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default AdminRegistration;
