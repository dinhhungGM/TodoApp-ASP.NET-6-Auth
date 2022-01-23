import React from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import "./dashboard.scss";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectUsername, logout } from "../Auth/AuthSlice";
import DashboardContainer from "./Container";

const Dashboard = () => {
  const username = useAppSelector(selectUsername);
  const dispatch = useAppDispatch();
  return (
    <div className="dashboard">
      <Navbar bg="light" expand="lg" className="dashboard-nav">
        <Container fluid className="dashboard-nav--list">
          <Navbar.Brand href="#">Hello {username} </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="#action2">Link</Nav.Link>
              <NavDropdown title="More Action" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form className="d-flex dashbard-form">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2 rounded-pill dashboard-search"
                aria-label="Search"
              />
              <Button variant="outline-success rounded btn-search">
                Search
              </Button>
            </Form>
            <Button variant="outline-primary rounded" onClick={() => {
              dispatch(logout());
            }}> Logout</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
        <DashboardContainer />
      
    </div>
  );
};

export default Dashboard;
