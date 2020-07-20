import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../../store/actions/";

const Logout = ({ onLogout }) => {
  useEffect(() => {
    onLogout();
  }, [onLogout]);

  return <Redirect to="/" />;
};

const mapActionsToProps = (dispatch) => ({
  onLogout: () => dispatch(logout()),
});

export default connect(null, mapActionsToProps)(Logout);
