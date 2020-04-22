import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "../../../axios-orders";

import classes from "./ContactData.module.css";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elType: "input",
        elConfig: {
          type: "text",
          placeholder: "Your name",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        value: "",
      },
      street: {
        elType: "input",
        elConfig: {
          type: "text",
          placeholder: "Street",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        value: "",
      },
      zipCode: {
        elType: "input",
        elConfig: {
          type: "text",
          placeholder: "ZIP code",
        },
        validation: {
          required: true,
          minLength: 5,
          maxLength: 9,
        },
        valid: false,
        touched: false,
        value: "",
      },
      country: {
        elType: "input",
        elConfig: {
          type: "text",
          placeholder: "Country",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        value: "",
      },
      email: {
        elType: "input",
        elConfig: {
          type: "email",
          placeholder: "Your email",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        value: "",
      },
      deliveryMethod: {
        elType: "select",
        elConfig: {
          options: [
            { text: "Fastest", value: "fastest" },
            { text: "Cheapest", value: "cheapest" },
          ],
        },
        validation: {},
        valid: true,
        value: "fastest",
      },
    },
    formIsValid: false,
    loading: false,
  };

  inputChangedHandler = (e, key) => {
    const updatedForm = { ...this.state.orderForm };
    const formField = { ...updatedForm[key] };
    formField.value = e.target.value;
    formField.valid = this.checkValidity(formField.value, formField.validation);
    formField.touched = true;
    updatedForm[key] = formField;

    let formIsValid = true;
    for (let fieldName in updatedForm) {
      formIsValid = updatedForm[fieldName].valid && formIsValid;
    }
    console.log(formIsValid);

    this.setState({ orderForm: updatedForm, formIsValid });
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

    return isValid;
  }

  orderHandler = (event) => {
    event.preventDefault();

    const { ingredients, price } = this.props;

    const formData = {};
    for (let field in this.state.orderForm) {
      formData[field] = this.state.orderForm[field].value;
    }

    const order = {
      ingredients: ingredients,
      price: price,
      customer: formData,
    };

    this.setState({ loading: true });
    axios
      .post("/orders.json", order)
      .then((res) => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  };

  render() {
    const formKeys = Object.keys(this.state.orderForm);
    let inputs = formKeys.map((key) => {
      const {
        elType,
        elConfig,
        valid,
        validation,
        touched,
        value,
      } = this.state.orderForm[key];
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
      <form onSubmit={this.orderHandler}>
        {inputs}
        <Button type="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h3>Enter your Contact Data</h3>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ingredients: state.ingredients,
  price: state.totalPrice,
});

export default connect(mapStateToProps)(ContactData);
