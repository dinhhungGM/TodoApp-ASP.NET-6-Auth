import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import "./Modal.scss";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

import { selectTodo, updateTodoAsync } from "./TodoSlice";



const UpdateTodoModal = (props: any) => {
  const dispatch = useAppDispatch();
  const selectedTodo = useAppSelector(selectTodo);
  const [formData, setFormData] = useState({
    todoId: selectedTodo.todoId,
    todoName: selectedTodo.todoName,
    todoDescription: selectedTodo.todoDescription,
    userId: selectedTodo.userId,
    todoIsComplete: selectedTodo.todoIsComplete,
  });
  const handleFormChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setFormData({
      todoId: selectedTodo.todoId,
      todoName: selectedTodo.todoName,
      todoDescription: selectedTodo.todoDescription,
      userId: selectedTodo.userId,
      todoIsComplete: selectedTodo.todoIsComplete,
    });
  }, [selectedTodo]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Todo
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

          <Form.Group className="mb-3">
            <Form.Label>Complete</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={handleFormChange}
              name="todoIsComplete"
              defaultValue={formData.todoIsComplete === true || "true" ? "true" : "false"}
            >
              <option value="false">False</option>
              <option value="true">True</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>

      <div className="btn-footer">
        <div className="btn-footer__group">
          <Button
            onClick={() => {
              
              if(typeof formData.todoIsComplete === "string"){
                dispatch(updateTodoAsync({...formData, todoIsComplete: formData.todoIsComplete === "true" ? true : false}));
              }
            }}
            className="btn-footer__group-item"
          >
            Update
          </Button>
          <Button onClick={props.onHide} className="btn-footer__group-item">
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default UpdateTodoModal;
