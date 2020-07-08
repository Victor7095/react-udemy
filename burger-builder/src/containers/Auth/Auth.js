import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Spinner from "../../components/UI/Spinner/Spinner";
import Aux from "../../hoc/AuxWrapper/AuxWrapper";
import { auth, setAuthRedirectPath } from "../../store/actions/";
import { updateObject, checkValidity } from "../../shared/utility";

import classes from "./Auth.module.css";

class Auth extends Component {
  state = {
    controls: {
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
    },
    isSignUp: true,
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
      this.props.onSetAuthRedirectPath("/");
    }
  }

  inputChangedHandler = (e, key) => {
    const updatedForm = updateObject(this.state.controls, {
      [key]: updateObject(this.state.controls[key], {
        value: e.target.value,
        valid: checkValidity(
          e.target.value,
          this.state.controls[key].validation
        ),
        touched: true,
      }),
    });

    this.setState({ controls: updatedForm });
  };

  submitHandler = (e) => {
    e.preventDefault();
    const formData = {};
    for (let field in this.state.controls) {
      formData[field] = this.state.controls[field].value;
    }
    formData.returnSecureToken = true;
    this.props.onAuth(formData, this.state.isSignUp);
  };

  switchAuthModeHandler = () => {
    this.setState((prevState) => ({
      isSignUp: !prevState.isSignUp,
    }));
  };

  render() {
    const formKeys = Object.keys(this.state.controls);
    let inputs = formKeys.map((key) => {
      const {
        elType,
        elConfig,
        valid,
        validation,
        touched,
        value,
      } = this.state.controls[key];
      return (
        <Input
          key={key}
          elType={elType}
          elConfig={elConfig}
          value={value}
          shouldValidate={validation}
          invalid={!valid}
          touched={touched}
          onChange={(e) => this.inputChangedHandler(e, key)}
        />
      );
    });

    let form = (
      <Aux>
        <form onSubmit={this.submitHandler}>
          {inputs}
          <Button type="Success">SUBMIT</Button>
        </form>
        <Button clicked={this.switchAuthModeHandler} type="Danger">
          SWITCH TO {this.state.isSignUp ? "SIGNIN" : "SIGNUP"}
        </Button>
      </Aux>
    );
    if (this.props.loading) form = <Spinner />;

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        {form}
      </div>
    );
  }
}

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
