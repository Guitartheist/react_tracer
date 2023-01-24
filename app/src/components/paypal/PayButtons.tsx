import React, { useEffect } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

const amount = "2";
const currency = "USD";

type buttonWrapperProps = {
  currency: string,
  showSpinner: boolean,
}

const ButtonWrapper = ({currency, showSpinner}:buttonWrapperProps) => {
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      }
    });
  }, [currency, showSpinner]);

  return (
    <>
      { (showSpinner && isPending) && <div className="spinner" /> }
      <PayPalButtons
        style={{
          color: "blue",
          layout: "vertical",
          label: "paypal",
          tagline: false,
        }}
        disabled={false}
        forceReRender={[amount, currency]}
        fundingSource={undefined}
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: amount,
                  },
                },
              ],
            })
            .then((orderId) => {
              // order has been created
              return orderId;
            });
        }}
        onApprove={function (data, actions) {
          return actions.order!.capture().then(function () {
            // code here after capture order
          });
        }}
      />
    </>
  );
}

export default function PayButtons() {
  return (
    <div style={{ maxWidth: "750px", minHeight: "200px" }}>
      <PayPalScriptProvider
        options={{
          "client-id": "test",
          components: "buttons",
          currency: "USD"  
        }}
      >
        <ButtonWrapper
          currency={currency}
          showSpinner={false}
        />
      </PayPalScriptProvider>
    </div>
  );
}