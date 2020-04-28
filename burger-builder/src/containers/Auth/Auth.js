import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import { auth } from "../../store/actions/";

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
  };

  inputChangedHandler = (e, key) => {
    const updatedForm = { ...this.state.controls };
    const formField = { ...updatedForm[key] };
    formField.value = e.target.value;
    formField.valid = this.checkValidity(formField.value, formField.validation);
    formField.touched = true;
    updatedForm[key] = formField;

    this.setState({ controls: updatedForm });
  };

  checkValidity(value, rules) {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  }

  submitHandler = (e) => {
    e.preventDefault();
    const formData = {};
    for (let field in this.state.orderForm) {
      formData[field] = this.state.orderForm[field].value;
    }
    this.props.onAuth(formData);
  }

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
      <form onSubmit={this.submitHandler}>
        {inputs}
        <Button type="Success">SUBMIT</Button>
      </form>
    );
    return <div className={classes.Auth}>{form}</div>;
  }
}

const mapActionsToProps = (dispatch) => ({
  onAuth: (user) => dispatch(auth(user)),
});

export default connect(null, mapActionsToProps)(Auth);
