import { Link } from "react-router-dom";
import "../CartStyles/Payment.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import CheckoutPath from "./CheckoutPath";

function Payment() {
  const orderItem = JSON.parse(sessionStorage.getItem("orderItem"));

  const completePayment = async (amount) => {
    console.log(amount);
  };

  return (
    <>
      <PageTitle title="Payment Processing" />
      <Navbar />
      <CheckoutPath activePath={2} />
      <div className="payment-container">
        <Link to="/order/confirm" className="payment-go-back">
          Go back
        </Link>
        <button
          className="payment-btn"
          onClick={() => completePayment(orderItem.total)}
        >
          Pay ({orderItem.total})/-
        </button>
      </div>
      <Footer />
    </>
  );
}

export default Payment;
