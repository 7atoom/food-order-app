import React from "react";
import logo from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import { useContext } from "react";
import UserProgressContext from "../store/UserProgressContext";

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const NoCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.quantity;
  }, 0);

  function openCartHandler() {
    userProgressCtx.showCart();
  }

  return (
    <div id="main-header">
      <div id="title">
        <img src={logo} alt="" />
        <h1>React Food</h1>
      </div>
      <Button onClick={openCartHandler} textOnly>
        Cart({NoCartItems})
      </Button>
    </div>
  );
}
