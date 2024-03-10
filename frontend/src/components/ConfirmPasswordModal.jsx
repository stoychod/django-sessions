import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup); // extend yup
import Cookies from "js-cookie";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FormControl from "react-bootstrap/FormControl";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useConfirmPasswordMutation } from "api/apiSlice.js";

function ConfirmPasswordModal({ showModal, handleCloseModal, modalData }) {
  const { headerBgColour, title, action } = modalData;

  // get CSRF token
  const csrftoken = Cookies.get("csrftoken");
  if (!csrftoken) {
    throw new Error("No csrf token found!");
  }

  // RTK Query hook
  const [confirmPassword, { error }] = useConfirmPasswordMutation();

  // error handler
  const renderError = (err) => {
    if (err) {
      if (err.data) {
        // you can access all properties of `FetchBaseQueryError` here
        return <span className="error-message"> {err.data.message} </span>;
      } else {
        // you can access a string 'message' property here
        <span className="error-message"> {err.message} </span>;
      }
    }
  };

  return (
    <>
      <Modal show={showModal} centered={true} onHide={handleCloseModal}>
        <Modal.Header
          className={headerBgColour}
          data-bs-theme="dark"
          closeButton
        >
          <Modal.Title className="text-light">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              password: "",
            }}
            validationSchema={Yup.object({
              password: Yup.string()
                .password()
                .required("Password is required"),
            })}
            onSubmit={async (values, { resetForm }) => {
              try {
                // you need the unwrap() call to get any error which will go in the catch block
                //pass the CSRFToken to mutation to be set as X-CSRFToken header
                await confirmPassword({
                  userData: values,
                  csrftoken: csrftoken,
                }).unwrap();
                // if response is ok reset the form
                resetForm();
                // perform the relevant action
                action();
                // and close the modal
                handleCloseModal();
              } catch (error) {
                console.error("Error:", error);
              }
            }}
          >
            {({ isSubmitting }) => (
              <>
                <h1 className=" fs-3 mb-3">Confirm password</h1>
                <Form className="d-flex flex-column">
                  <FloatingLabel
                    controlId="floatingPassword"
                    label="Password"
                    className="mb-4"
                  >
                    <Field
                      name="password"
                      type="password"
                      placeholder="Password"
                      as={FormControl}
                      label="Password"
                    />
                    <ErrorMessage
                      component="span"
                      className="error-message"
                      name="password"
                    />
                  </FloatingLabel>

                  {renderError(error)}

                  <Button
                    variant="danger"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                  <Button
                    variant="primary"
                    className="mt-3"
                    type="reset"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </Button>
                </Form>
              </>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ConfirmPasswordModal;
