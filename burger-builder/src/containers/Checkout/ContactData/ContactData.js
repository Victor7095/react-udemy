import React, { Component } from "react";

import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "../../../axios-orders";

import classes from "./ContactData.module.css";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
    loading: false,
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
    let form = (
      <form>
        <Input
          inputType="input"
          type="text"
          name="name"
          placeholder="Your Name"
        />
        <Input
          inputType="input"
          type="email"
          name="email"
          placeholder="Your Email"
        />
        <Input
          inputType="input"
          type="text"
          name="street"
          placeholder="Street"
        />
        <Input
          inputType="input"
          type="text"
          name="postal"
          placeholder="Postal Code"
        />
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
