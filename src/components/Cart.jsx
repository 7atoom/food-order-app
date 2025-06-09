import { useContext } from "react";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import Button from "./UI/Button";
import Modal from "./UI/Modal";
import { CurrencyFormatter } from "../util/formatter";
import CartItem from "./CartItem";
import { use } from "react";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  function closeCartHandler() {
    userProgressCtx.hideCart();
  }

  function goToCheckoutHandler() {
    userProgressCtx.showCheckout();
  }

  return (
    <Modal
      className="cart"
      open={userProgressCtx.Progress === "cart"}
      onClose={userProgressCtx.Progress === "cart" ? closeCartHandler : null}
    >
      <h2>Cart</h2>
      <ul>
        {cartCtx.items.map((item) => {
          return (
            <li key={item.id}>
              <CartItem
                name={item.name}
                quantity={item.quantity}
                price={item.price}
                onIncrease={() => cartCtx.addItem({ ...item })}
                onDecrease={() => cartCtx.removeItem(item.id)}
              />
            </li>
          );
        })}
      </ul>
      <p className="cart-total">
        Total: <span>{CurrencyFormatter.format(cartCtx.totalAmount)}</span>
      </p>
      <div className="modal-actions">
        <Button onClick={closeCartHandler} textOnly>
          Close
        </Button>
        {cartCtx.items.length > 0 && (
          <Button onClick={goToCheckoutHandler}>Checkout</Button>
        )}
      </div>
    </Modal>
  );
}
