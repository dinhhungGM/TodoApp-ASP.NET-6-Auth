import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./container.scss";
import AddTodoModal from "./Todo/AddTodoModal";
import UpdateTodoModal from "./Todo/UpdateTodoModal";
import TodoList from "./Todo/TodoList";
import { selectUpdateModalShow, setUpdateModalShow } from "./Todo/TodoSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";


const Container = () => {
  const dispatch = useAppDispatch();
  const updateModalShow = useAppSelector(selectUpdateModalShow);
  const [addModalShow, setAddModalShow] = useState(false);

  return (
    <div className="dashboard__container">
      <TodoList />
      <div className="dashboard__addTodo">
        <Button variant="primary rounded-pill dashboard__addTodo-icon" onClick={() => setAddModalShow(true)}>
        <i className="fas fa-plus"></i>
        </Button>
      </div>
      <AddTodoModal show={addModalShow} onHide={() => setAddModalShow(false)} />
      <UpdateTodoModal
        show={updateModalShow}
        onHide={() => dispatch(setUpdateModalShow(false))}
      />
    </div>
  );
};

export default Container;
