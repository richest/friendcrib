import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { userAuth } from "../redux/account/authReducer";
import { is_page_exist_protected } from "../functions";


const ProtectedRoute = ({

  component: Component,
  ...rest
}) => {
  const isauth = useSelector(userAuth);
  return (

    <Route
      {...rest}
      render={props =>
        !isauth ? (
          is_page_exist_protected() ?
            <Component {...props} />
            :
            <Redirect
              to="/login"

            />
        ) : (
          <Redirect
            to="/feed"
          />
        )
      }
    />
  );
};
export default ProtectedRoute;