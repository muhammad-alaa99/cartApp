import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, ButtonGroup, Table, Image, Container } from "react-bootstrap";

import {
  clearCart,
  minasItem,
  pluseItem,
  removeItem,
} from "../../store/productSlice";

const Cart = () => {
  const { cart } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const cartItem = cart.map((item, index) => (
    <tr key={item.id}>
      <td>{++index}</td>
      <td>{item.name}</td>
      <td>
        <Image
          src={item.image}
          alt={item.name}
          style={{ width: "100px", height: "100px" }}
        />
      </td>
      <td>{item.price * item.quantity}$</td>
      <td>{item.quantity}</td>
      <td>
        <ButtonGroup aria-label="Basic example">
          <Button
            variant="success"
            onClick={() => {
              dispatch(pluseItem(item));
            }}
          >
            +
          </Button>
          <Button
            onClick={() => {
              dispatch(minasItem(item));
            }}
          >
            -
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              dispatch(removeItem(item));
            }}
          >
            Delete
          </Button>
        </ButtonGroup>
      </td>
    </tr>
  ));

  return (
    <Container style={{ marginTop: "70px" }}>
      <h1>My Cart:</h1>
      <h3>
        total price :
        {cart.reduce((acc, item) => {
          acc += item.price * item.quantity;
          return acc;
        }, 0)}
        $
      </h3>
      <Button
        variant="success"
        className="my-2"
        onClick={() => {
          dispatch(clearCart());
        }}
      >
        clear cart
      </Button>
      <Table bordered hover striped>
        <thead>
          <tr>
            <th>#</th>
            <th>name</th>
            <th>image</th>
            <th>price</th>
            <th>quantity</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>{cartItem}</tbody>
      </Table>
    </Container>
  );
};

export default Cart;
