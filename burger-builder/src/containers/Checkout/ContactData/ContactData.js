import React, { useState } from "react";
import { connect } from "react-redux";

import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";
import Spinner from "../../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../../axios-orders";
import { purchaseBurger } from "../../../store/actions/";
import { updateObject, checkValidity } from "../../../shared/utility";

import classes from "./ContactData.module.css";

const ContactData = ({loading, ingredients, price, userId, token, onOrderBurger}) => {
  const [orderForm, setOrderForm] = useState({
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
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const inputChangedHandler = (e, key) => {
    const formField = updateObject(orderForm[key], {
      value: e.target.value,
      valid: checkValidity(
        e.target.value,
        orderForm[key].validation
      ),
      touched: true,
    });

    const updatedForm = updateObject(orderForm, {
      [key]: formField,
    });

    let formIsValid = true;
    for (let fieldName in updatedForm) {
      formIsValid = updatedForm[fieldName].valid && formIsValid;
    }

    setOrderForm(updatedForm);
    setFormIsValid(formIsValid);
  };

  const orderHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let field in orderForm) {
      formData[field] = orderForm[field].value;
    }

    const order = {
      ingredients: ingredients.map((ig) => ig.name),
      price: price,
      customer: formData,
      userId: userId,
    };

    onOrderBurger(order, token);
  };

  const formKeys = Object.keys(orderForm);
  let inputs = formKeys.map((key) => {
    const {
      elType,
      elConfig,
      valid,
      validation,
      touched,
      value,
    } = orderForm[key];
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
    <form onSubmit={orderHandler}>
      {inputs}
      <Button type="Success" disabled={!formIsValid}>
        ORDER
      </Button>
    </form>
  );
  if (loading) {
    form = <Spinner />;
  }

  return (
    <div className={classes.ContactData}>
      <h3>Enter your Contact Data</h3>
      {form}
    </div>
  );
};

const mapStateToProps = (state) => ({
  ingredients: state.burgerBuilder.ingredients,
  price: state.burgerBuilder.totalPrice,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId,
});

const mapActionsToProps = (dispatch) => ({
  onOrderBurger: (order, token) => dispatch(purchaseBurger(order, token)),
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withErrorHandler(ContactData, axios));
