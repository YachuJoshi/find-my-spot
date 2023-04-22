import { Route, Redirect } from "react-router-dom";
import { useAuthContext } from "../context";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useAuthContext();

  return (
    <Route
      {...rest}
      render={(props) => {
        return user ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    ></Route>
  );
};
