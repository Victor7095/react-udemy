import React, { Component } from "react";
import { connect } from "react-redux";

import CounterControl from "../../components/CounterControl/CounterControl";
import CounterOutput from "../../components/CounterOutput/CounterOutput";
import * as actionTypes from "../../store/actions";

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
        <button onClick={() => this.props.onStoreResult(this.props.ctr)}>Store result</button>
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
    ctr: state.ctr.counter,
    storedResults: state.res.results,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIncrementCounter: () => dispatch({ type: actionTypes.INCREMENT }),
    onDecrementCounter: () => dispatch({ type: actionTypes.DECREMENT }),
    onAddCounter: () =>
      dispatch({ type: actionTypes.ADD, payload: { value: 5 } }),
    onSubtractCounter: () =>
      dispatch({ type: actionTypes.SUBTRACT, payload: { value: 5 } }),
    onStoreResult: (result) => dispatch({ type: actionTypes.STORE_RESULT, result }),
    onDeleteResult: (index) =>
      dispatch({ type: actionTypes.DELETE_RESULT, payload: { index } }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
