import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import "./Modal.scss";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectUserId } from "../../Auth/AuthSlice";
import { addTodoAsync } from "./TodoSlice";

const AddTodoModal = (props: any) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId);
  const [formData, setFormData] = useState({
    todoName: "",
    todoDescription: "",
    userId: "",
  });
  const handleFormChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleCreateTodo = (e: any) => {
    e.preventDefault();
    dispatch(addTodoAsync({...formData, userId}));
    setFormData({
      todoName: "",
      todoDescription: "",
      userId: "",
    });
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add New Todo
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={formData.todoName}
              onChange={handleFormChange}
              name="todoName"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="description"
              placeholder="Enter description"
              value={formData.todoDescription}
              onChange={handleFormChange}
              name="todoDescription"
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <div className="btn-footer">
        <div className="btn-footer__group">
          <Button onClick={handleCreateTodo} className="btn-footer__group-item">
            Create
          </Button>
          <Button onClick={props.onHide} className="btn-footer__group-item">
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddTodoModal;
