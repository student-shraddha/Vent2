import { message } from "antd";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  `${process.env.NEXT_PUBLIC_STRIPE_TEST_PK_KEY}`
);
import Checkout from "../../../../Checkout";

const PaymentPopUp = (props) => {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <>
      {/* BOOKING CONFIRM MODAL */}
      {contextHolder}
      <div style={{ padding: "20px" }}>
        <Elements
          stripe={stripePromise}
          options={{ clientSecret: props?.data?.paymentIntent?.client_secret }}
        >
          <Checkout data={props} />
        </Elements>
      </div>
    </>
  );
};
export default PaymentPopUp;
