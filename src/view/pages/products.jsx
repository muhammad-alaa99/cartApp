import React, { useEffect } from "react";
import { Card, ListGroup, Container, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, getProduct } from "../../store/productSlice";
import { Link } from "react-router-dom";

const Products = () => {
  const dispatch = useDispatch();
  const { records } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const product = records.map((item) => (
    <>
      <Col style={{ height: "500px" }} className="mb-2">
        <Card style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src={item.image}
            style={{ height: "200px" }}
          />
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Card.Text>{item.description}</Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>{item.price} $</ListGroup.Item>
          </ListGroup>
          <Card.Body>
            <Link
              className="btn btn-primary"
              onClick={() => dispatch(getProduct(item.id))}
            >
              Add to cart
            </Link>
          </Card.Body>
        </Card>
      </Col>
    </>
  ));

  return (
    <Container style={{ marginTop: "70px" }}>
      <Row>{product}</Row>
    </Container>
  );
};

export default Products;
