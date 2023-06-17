import React from 'react'
import { Container, Nav,Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";
const Header = () => {
  const{cart}=useSelector((state)=>state.products);
  return (
    <>
    <Navbar bg="light" expand="lg" fixed='top'>
      <Container>
        <Link className="navbar-brand" to="/">Cart App</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className="nav-link" to="/">products</Link>
            <Link className="nav-link" to="/cart">cart -{cart.length}</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}
export default Header;