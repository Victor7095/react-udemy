import React, { Component } from "react";

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
          required: true,
          type: "text",
          placeholder: "Your name",
        },
        value: "Victor Yan",
      },
      street: {
        elType: "input",
        elConfig: {
          required: true,
          type: "text",
          placeholder: "Street",
        },
        value: "Av. Torquato Tapajós",
      },
      zipCode: {
        elType: "input",
        elConfig: {
          required: true,
          type: "text",
          placeholder: "ZIP code",
        },
        value: "69093-415",
      },
      country: {
        elType: "input",
        elConfig: {
          required: true,
          type: "text",
          placeholder: "Country",
        },
        value: "Brazil",
      },
      email: {
        elType: "input",
        elConfig: {
          required: true,
          type: "email",
          placeholder: "Your email",
        },
        value: "victoryan345@gmail.com",
      },
      deliveryMethod: {
        elType: "select",
        elConfig: {
          options: [
            { text: "Fastest", value: "fastest" },
            { text: "Cheapest", value: "cheapest" },
          ],
        },
      },
    },
    loading: false,
  };

  inputChangedHandler = (e, key) => {
    const updatedForm = {...this.state.orderForm};
    const formField = {...updatedForm[key]};
    formField.value = e.target.value;
    updatedForm[key] = formField;
    this.setState({orderForm: updatedForm});
  };

  orderHandler = (event) => {
    event.preventDefault();

    const { ingredients, price } = this.props;
    const { name, email, address } = this.state;

    this.setState({ loading: true });
    const order = {
      ingredients: ingredients,
      price: price,
      customer: {
        name: "Victor Yan",
        address: {
          street: "Av. Torquato Tapajós",
          zipCode: "69093-415",
          country: "Brasil",
        },
        email: "victoryan345@gmail.com",
        deliveryMethod: "fastest",
      },
    };
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
      const { elType, elConfig, value } = this.state.orderForm[key];
      return (
        <Input
          key={key}
          elType={elType}
          elConfig={elConfig}
          value={value}
          onChange={e => this.inputChangedHandler(e, key)}
        />
      );
    });

    let form = (
      <form>
        {inputs}
        <Button type="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
