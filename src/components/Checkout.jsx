import { CurrencyFormatter } from "../util/formatter";
import { useContext, useState } from "react";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import Input from "./UI/Input";
import Modal from "./UI/Modal";
import Button from "./UI/Button";
import useHttp from "../hooks/useHttp";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const [error, setError] = useState(null);
  const totalAmount = CurrencyFormatter.format(cartCtx.totalAmount);

  const {
    isLoading,
    error: httpError,
    sendRequest,
    data,
    clearData,
  } = useHttp("http://localhost:3000/orders", requestConfig);

  function closeCheckoutHandler() {
    userProgressCtx.hideCheckout();
  }

  function finishHandler() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  async function orderHandler(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const orderData = Object.fromEntries(formData.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: orderData,
        },
      })
    );
  }

  let actions = (
    <>
      <Button onClick={closeCheckoutHandler} textOnly>
        Cancel
      </Button>
      <Button type="submit">Order</Button>
    </>
  );

  if (isLoading) {
    actions = <p>Sending order data...</p>;
  }

  if (data && !httpError) {
    return (
      <Modal
        open={userProgressCtx.Progress === "checkout"}
        onClose={finishHandler}
      >
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you with more details via email within the next
          few minutes.
        </p>
        <div className="modal-actions">
          <Button onClick={finishHandler}>Okay</Button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      className="checkout"
      open={userProgressCtx.Progress === "checkout"}
      onClose={closeCheckoutHandler}
    >
      <form onSubmit={orderHandler}>
        <h2>Checkout</h2>
        <p>Total amount: {totalAmount}</p>
        {error && <p className="error">{error}</p>}
        <Input label="Full name" type="text" id="name" name="name" />
        <Input label="Email" type="email" id="email" name="email" />
        <Input label="street" type="text" id="street" name="street" />
        <div className="control-row">
          <Input label="City" type="text" id="city" name="city" />
          <Input
            label="Postal code"
            type="text"
            id="postal-code"
            name="postal-code"
          />
        </div>
        {httpError && <p className="error">{httpError}</p>}
        <div className="modal-actions">{actions}</div>
      </form>
    </Modal>
  );
}
