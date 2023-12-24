import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useCheckAuthenticatedQuery } from "api/apiSlice";
import Error from "routes/Error";

const RequireAuth = () => {
  const { data, isFetching, isSuccess, isError, error } =
    useCheckAuthenticatedQuery();
  const isAuthenticated = data ? data.isAuthenticated : false;

  const location = useLocation();

  const renderComponent = () => {
    if (isError) {
      console.log(error);
      return <Error />;
    }

    if (isSuccess) {
      if (isAuthenticated === true) {
        return <Outlet />;
      }

      return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }
  };

  if (isFetching) return <div>Loading...</div>;

  return <>{renderComponent()}</>;
};

export default RequireAuth;
