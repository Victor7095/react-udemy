import React, { Component } from "react";
import { connect } from "react-redux";

import CounterControl from "../../components/CounterControl/CounterControl";
import CounterOutput from "../../components/CounterOutput/CounterOutput";

class Counter extends Component {
  state = {
    counter: 0,
  };

  render() {
    return (
      <div>
        <CounterOutput value={this.props.ctr} />
        <CounterControl
          label="Increment"
          clicked={this.props.onIncrementCounter}
        />
        <CounterControl
          label="Decrement"
          clicked={this.props.onDecrementCounter}
        />
        <CounterControl label="Add 5" clicked={this.props.onAddCounter} />
        <CounterControl
          label="Subtract 5"
          clicked={this.props.onSubtractCounter}
        />
        <hr />
        <button onClick={this.props.onStoreResult}>Store result</button>
        <ul>
          {this.props.storedResults.map((result, index) => (
            <li key={index} onClick={() => this.props.onDeleteResult(index)}>
              {result}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ctr: state.counter,
    storedResults: state.results,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIncrementCounter: () => dispatch({ type: "INCREMENT" }),
    onDecrementCounter: () => dispatch({ type: "DECREMENT" }),
    onAddCounter: () => dispatch({ type: "ADD", payload: { value: 5 } }),
    onSubtractCounter: () =>
      dispatch({ type: "SUBTRACT", payload: { value: 5 } }),
    onStoreResult: () => dispatch({ type: "STORE_RESULT" }),
    onDeleteResult: (index) =>
      dispatch({ type: "DELETE_RESULT", payload: { index } }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
