import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup); // extend yup
import Cookies from "js-cookie";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Divider from "components/Divider.jsx";
import { useGetCSRFCookieQuery, useLoginUserMutation } from "api/apiSlice.js";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  let csrftoken;
  // Get CSRFToken
  const {
    isFetching: isFetchingCSRFToken,
    isSuccess: CSRFTokenSuccess,
    isError: CSRFTokenError,
  } = useGetCSRFCookieQuery();

  // if the above call was successful grab the cookie from browser storage
  if (CSRFTokenSuccess) {
    csrftoken = Cookies.get("csrftoken");
    // console.log(csrftoken);
  } else if (CSRFTokenError) {
    console.error("Error:", CSRFTokenError);
  }
  const [loginUser, { error }] = useLoginUserMutation();

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
    <Stack className="flex-grow-1 justify-content-center">
      <Stack className="form-container flex-grow-0 bg-body-tertiary shadow-sm rounded p-5 mx-auto">
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={Yup.object({
            username: Yup.string()
              .min(3, "Must be at least 3 characters")
              .max(50, "Must be less than 50 characters")
              .required("Username is required"),
            password: Yup.string().password().required("Password is required"),
          })}
          onSubmit={async (values, { resetForm }) => {
            try {
              // you need the unwrap() call to get any error which will go in the catch block
              //pass the CSRFToken to mutation to be set as X-CSRFToken header
              await loginUser({
                userData: values,
                csrftoken: csrftoken,
              }).unwrap();
              // if response is ok reset the form
              resetForm();
              navigate("/dashboard");
            } catch (error) {
              console.error("Error:", error);
            }
          }}
        >
          {({ isSubmitting }) => (
            <>
              <h1 className=" fs-3 mb-3">Sign in</h1>
              <Form className="d-flex flex-column">
                <FloatingLabel
                  controlId="floatingUsername"
                  label="Username"
                  className="mb-4"
                >
                  <Field
                    name="username"
                    placeholder="Username"
                    as={FormControl}
                  />
                  <ErrorMessage
                    component="span"
                    className="error-message"
                    name="username"
                  />
                </FloatingLabel>

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
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting || isFetchingCSRFToken}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>

                <Divider
                  text={"Don't have an account?"}
                  classNameOpts="my-3"
                ></Divider>
              </Form>
              <Button
                variant="outline-primary"
                onClick={() => navigate("/auth/register")}
              >
                Register
              </Button>
            </>
          )}
        </Formik>
      </Stack>
    </Stack>
  );
}
