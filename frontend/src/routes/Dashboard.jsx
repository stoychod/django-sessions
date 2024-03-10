import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup); // extend yup
import "yup-phone-lite";
import Cookies from "js-cookie";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useDeleteUserMutation,
} from "api/apiSlice.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ConfirmPasswordModal from "components/ConfirmPasswordModal";

export default function Dashboard() {
  // Confirm password modal state
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    headerBgColour: "",
    title: "",
    action: function () {},
  });

  function handleShowModal() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  const navigate = useNavigate();

  // get CSRF token
  const csrftoken = Cookies.get("csrftoken");
  if (!csrftoken) {
    throw new Error("No csrf token found!");
  }

  // RTK Query hooks
  const { data: profile, isLoading: userProfileLoading } =
    useGetUserProfileQuery(csrftoken);
  // console.log(profile);

  const [
    updateUserProfile,
    { error: updateProfileError, isLoading: updateUserLoading },
  ] = useUpdateUserProfileMutation();

  const [deleteUser, { isLoading: deleteUserLoading }] =
    useDeleteUserMutation();

  // update account handlers
  async function updateAccount(values) {
    try {
      // you need the unwrap() call to get any error which will go in the catch block
      //pass the CSRFToken to mutation to be set as X-CSRFToken header
      await updateUserProfile({
        userData: values,
        csrftoken: csrftoken,
      }).unwrap();
      toast.success("User profile updated successfully.");
    } catch (error) {
      toast.error("Could not update user profile.");
      console.error("Error:", error);
    }
  }

  function handleUpdateAccount(values) {
    setModalData({
      headerBgColour: "bg-primary",
      title: "Update account",
      action: updateAccount.bind(null, values),
    });
    handleShowModal();
  }

  // delete account handlers
  async function deleteAccount() {
    try {
      // you need the unwrap() call to get any error which will go in the catch block
      //pass the CSRFToken to mutation to be set as X-CSRFToken header
      await deleteUser(csrftoken).unwrap();

      // if response is ok navigate home
      navigate("/");
      toast.success("User account deleted successfully.");
    } catch (error) {
      toast.error("Could not delete user account.");
      console.error("Error:", error);
    }
  }

  function handleDeleteAccount() {
    setModalData({
      headerBgColour: "bg-danger",
      title: "Delete account",
      action: deleteAccount,
    });
    handleShowModal();
  }

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

  if (userProfileLoading) return <div>Loading...</div>;

  return (
    <Container>
      <h1 className="text-center mt-3">User dashboard</h1>
      <Row className="mx-1">
        <Col className="col-md-11 col-lg-8 col-xl-7 col-xxl-6 form-container rounded border border-1 border-secondary-subtle p-5 mx-auto mt-5">
          <Formik
            initialValues={{
              firstName: profile.firstName,
              lastName: profile.lastName,
              phone: profile.phone,
              city: profile.city,
            }}
            validationSchema={Yup.object({
              firstName: Yup.string()
                .min(2, "Must be at least 2 characters")
                .max(50, "Must be less than 50 characters"),
              // .required("Username is required"),
              lastName: Yup.string()
                .min(2, "Must be at least 2 characters")
                .max(50, "Must be less than 50 characters"),
              // .required("Username is required"),
              phone: Yup.string().phone(
                "GB",
                "Please enter a valid phone number"
              ),
              city: Yup.string()
                .min(2, "Must be at least 2 characters")
                .max(50, "Must be less than 50 characters"),
            })}
            onSubmit={handleUpdateAccount}
          >
            {() => (
              <>
                <h1 className=" fs-3 mb-3">Update user profile</h1>
                <Form className="d-flex flex-column">
                  <FloatingLabel
                    controlId="floatingFirstName"
                    label="First name"
                    className="mb-4"
                  >
                    <Field
                      name="firstName"
                      placeholder="First name"
                      as={FormControl}
                    />
                    <ErrorMessage
                      component="span"
                      className="error-message"
                      name="firstName"
                    />
                  </FloatingLabel>

                  <FloatingLabel
                    controlId="floatingLastName"
                    label="Last name"
                    className="mb-4"
                  >
                    <Field
                      name="lastName"
                      placeholder="Last name"
                      as={FormControl}
                    />
                    <ErrorMessage
                      component="span"
                      className="error-message"
                      name="lastName"
                    />
                  </FloatingLabel>

                  <FloatingLabel
                    controlId="floatingPhone"
                    label="Phone"
                    className="mb-4"
                  >
                    <Field name="phone" placeholder="Phone" as={FormControl} />
                    <ErrorMessage
                      component="span"
                      className="error-message"
                      name="phone"
                    />
                  </FloatingLabel>

                  <FloatingLabel
                    controlId="floatingCity"
                    label="City"
                    className="mb-4"
                  >
                    <Field name="city" placeholder="City" as={FormControl} />
                    <ErrorMessage
                      component="span"
                      className="error-message"
                      name="city"
                    />
                  </FloatingLabel>

                  {renderError(updateProfileError)}

                  <Button
                    variant="primary"
                    type="submit"
                    disabled={updateUserLoading}
                  >
                    {updateUserLoading
                      ? "Updating profile..."
                      : "Update profile"}
                  </Button>
                </Form>
              </>
            )}
          </Formik>
          <Button
            variant="danger"
            className="mt-3 w-100"
            disabled={deleteUserLoading}
            onClick={handleDeleteAccount}
          >
            {deleteUserLoading ? "Deleting account..." : "Delete account"}
          </Button>
        </Col>
      </Row>
      <ConfirmPasswordModal
        showModal={showModal}
        // modalTitle={modalTitle}
        // accountAction={accountAction}
        modalData={modalData}
        handleCloseModal={handleCloseModal}
      />
    </Container>
  );
}
