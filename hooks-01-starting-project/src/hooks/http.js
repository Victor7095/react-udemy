import { useReducer, useCallback } from "react";

const httpReducer = (currentHttp, { type, ...payload }) => {
  const actionTypes = {
    SEND: ({ identifier }) => ({
      isLoading: true,
      error: null,
      data: null,
      reqExtra: null,
      identifier,
    }),
    RESPONSE: ({ data, extra }) => ({
      ...currentHttp,
      isLoading: false,
      error: null,
      data,
      reqExtra: extra,
    }),
    ERROR: ({ error }) => ({ isLoading: false, error }),
  };

  if (!actionTypes[type]) throw new Error();
  return actionTypes[type](payload);
};

const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    isLoading: false,
    error: null,
    data: null,
    reqExtra: null,
    identifier: null,
  });

  const sendRequest = useCallback((url, method, body, extra, reqIdentifier) => {
    dispatchHttp({ type: "SEND", identifier: reqIdentifier });
    fetch(url, {
      method,
      body,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatchHttp({ type: "RESPONSE", data, extra });
      })
      .catch((err) => {
        dispatchHttp({ type: "ERROR", error: err });
      });
  }, []);

  return [
    httpState.isLoading,
    httpState.error,
    httpState.data,
    sendRequest,
    httpState.reqExtra,
    httpState.identifier
  ];
};

export default useHttp;
