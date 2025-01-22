import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { paymentAPI } from "../../api/stripe";
import useEcomStore from "../../store/ecom-store";
import CheckoutForm from "../../components/CheckoutForm";

const stripePromise = loadStripe("pk_test_51QZDO4GvNeTqmrOSBrNTmww9tQHGGZBEeBr0E8dzwISqZuTGt8FEA96d4SVq48L1IZBOrjj3xuu3mOvnRq0jckc600js7ykZmZ");


const Payment = () => {
  const token = useEcomStore((s) => s.token)
  const [clientSecret, setClientSecret] = useState("")

  useEffect(() => {
    paymentAPI(token)
      .then((res) => {
        console.log('PaymentAPI', res)
        setClientSecret(res.data.clientSecret)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const appearance = {
    theme: 'stripe',
  };
  // Enable the skeleton loader UI for optimal loading.
  const loader = 'auto';

  return (
    <div>
      {
        clientSecret && (
          <Elements options={{ clientSecret, appearance, loader }} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )
      }
    </div>
  )
}

export default Payment