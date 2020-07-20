import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Spinner from "../../components/UI/Spinner/Spinner";
import Aux from "../../hoc/AuxWrapper/AuxWrapper";
import { auth, setAuthRedirectPath } from "../../store/actions/";
import { updateObject, checkValidity } from "../../shared/utility";

import classes from "./Auth.module.css";
import { useState } from "react";

const Auth = ({
  buildingBurger,
  authRedirectPath,
  onSetAuthRedirectPath,
  ...props
}) => {
  const [controls, setControls] = useState({
    email: {
      elType: "input",
      elConfig: {
        type: "email",
        placeholder: "Email Address",
      },
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
      value: "",
    },
    password: {
      elType: "input",
      elConfig: {
        type: "password",
        placeholder: "Password",
      },
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
      value: "",
    },
  });
  const [isSignUp, setIsSignUp] = useState(true);

  useEffect(() => {
    if (!buildingBurger && authRedirectPath !== "/") {
      onSetAuthRedirectPath("/");
    }
  }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath]);

  const inputChangedHandler = (e, key) => {
    const updatedForm = updateObject(controls, {
      [key]: updateObject(controls[key], {
        value: e.target.value,
        valid: checkValidity(e.target.value, controls[key].validation),
        touched: true,
      }),
    });

    setControls(updatedForm);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = {};
    for (let field in controls) {
      formData[field] = controls[field].value;
    }
    formData.returnSecureToken = true;
    props.onAuth(formData, isSignUp);
  };

  const switchAuthModeHandler = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
  };

  const formKeys = Object.keys(controls);
  let inputs = formKeys.map((key) => {
    const { elType, elConfig, valid, validation, touched, value } = controls[
      key
    ];
    return (
      <Input
        key={key}
        elType={elType}
        elConfig={elConfig}
        value={value}
        shouldValidate={validation}
        invalid={!valid}
        touched={touched}
        onChange={(e) => inputChangedHandler(e, key)}
      />
    );
  });

  let form = (
    <Aux>
      <form onSubmit={submitHandler}>
        {inputs}
        <Button type="Success">SUBMIT</Button>
      </form>
      <Button clicked={switchAuthModeHandler} type="Danger">
        SWITCH TO {isSignUp ? "SIGNIN" : "SIGNUP"}
      </Button>
    </Aux>
  );
  if (props.loading) form = <Spinner />;

  let errorMessage = null;
  if (props.error) {
    errorMessage = <p>{props.error.message}</p>;
  }

  let authRedirect = null;
  if (props.isAuthenticated) {
    authRedirect = <Redirect to={authRedirectPath} />;
  }

  return (
    <div className={classes.Auth}>
      {authRedirect}
      {errorMessage}
      {form}
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: state.auth.token !== null,
  buildingBurger: state.burgerBuilder.building,
  authRedirectPath: state.auth.authRedirectPath,
});

const mapActionsToProps = (dispatch) => ({
  onAuth: (user, isSignUp) => dispatch(auth(user, isSignUp)),
  onSetAuthRedirectPath: (path) => dispatch(setAuthRedirectPath(path)),
});

export default connect(mapStateToProps, mapActionsToProps)(Auth);
