import React, { useEffect } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import './styles/PayButtons.css';

const amount = "2";
const currency = "USD";

type buttonWrapperProps = {
	amount: string,
  currency: string,
  showSpinner: boolean,
}

const ButtonWrapper = ({amount, currency, showSpinner}:buttonWrapperProps) => {
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
				className="paypal-buttons"
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

type buttonProps = {
	price: string,
}

export default function PayButtons({price}: buttonProps) {
  return (
    <div>
			<p>{price}</p>
      <PayPalScriptProvider
        options={{
          "client-id": "test",
          components: "buttons",
          currency: "USD"  
        }}
      >
        <ButtonWrapper
					amount={price}
          currency={currency}
          showSpinner={false}
        />
      </PayPalScriptProvider>
    </div>
  );
}
