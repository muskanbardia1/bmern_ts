import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { connect } from "react-redux";
import { IRootState } from "../types/interfaces";
import { UserType } from "../types/enum";

export type ProtectedRouteProps = {
  isAuthenticated: boolean;
  path: string;
  userType?: UserType.ADMIN | UserType.USER;
  component: React.ComponentType<any>;
  [propName: string]: any;
} & RouteProps;

const config = {
  [UserType.ADMIN]: ["/adminDashboard", "/userDashboard"],
  [UserType.USER]: ["/userDashboard"],
};

const PrivateRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  isAuthenticated,
  path,
  userType,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated || !(userType && config[userType].includes(path)) ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

const mapStatetoProps = (state: IRootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
  userType: state.auth.user?.userType,
});
export default connect(mapStatetoProps)(PrivateRoute);
