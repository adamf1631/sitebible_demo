import React from "react";
import { Switch, Route } from "react-router-dom";
import Locations from "./locations/Locations";
import AddLocation from "./locations/AddLocation";
import Location from "./locations/Location";
import EditLocations from "./locations/EditLocations";
import AddHardware from "./locations/AddHardware";
import AfterEditLocation from "./locations/afterEditLocation";
import AddPhones from "./locations/AddPhones";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import PrivateRoute from "./PrivateRoute";

const Routes = () => {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={Locations} />
      <PrivateRoute path="/addlocation" component={AddLocation} />
      <PrivateRoute path="/afterEditLocation" component={AfterEditLocation} />
      <PrivateRoute path="/location" component={Location} />
      <PrivateRoute path="/editlocation" component={EditLocations} />
      <PrivateRoute path="/addhardware" component={AddHardware} />
      <PrivateRoute path="/addphones" component={AddPhones} />
      <Route path="/login" component={Login} />
      <Route path="/forgotpassword" component={ForgotPassword} />
    </Switch>
  );
};

export default Routes;
