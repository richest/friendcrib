import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { userAuth } from "../redux/account/authReducer";
import { is_page_exist_private } from "../functions";

const PrivateRoute = ({
  component: Component,
  ...rest
}) => {

  const isauth = useSelector(userAuth);
  return (
    <Route
      {...rest}
      render={props =>
        !!isauth ? (
          is_page_exist_private() ?
            <Component {...props} />
            :
            <Redirect
              to="/feed"
            />
        ) : (
          <Redirect
            to="/login"
          />
        )
      }
    />
  );
};
export default PrivateRoute;