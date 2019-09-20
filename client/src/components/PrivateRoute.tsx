import React from 'react';
import {
  Route,
  Redirect,
  RouteComponentProps,
  RouteProps,
} from 'react-router-dom';

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps> | React.ComponentType;
}

const PrivateRoute = ({
  component: Component,
  ...rest
}: PrivateRouteProps): React.ReactElement => (
  <Route
    {...rest}
    render={(props): React.ReactElement =>
      localStorage.getItem('token') ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

export default PrivateRoute;
