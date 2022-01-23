import React, { useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import ImgTest from "../../../assets/img/photo-1642729921898-743ba0e53d7e.jpg";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectUserId } from "../../Auth/AuthSlice";
import {
  fetchTodosAsync,
  selectTodos,
  deleteTodoAsync,
  setUpdateModalShow,
  setTodo,
} from "./TodoSlice";
import "./TodoList.scss";

const TodoList = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId);
  const todos = useAppSelector(selectTodos);

  useEffect((): any => {
    dispatch(fetchTodosAsync({ userId }));
  }, [dispatch, userId]);

  return (
    <Row xs={1} md={2} lg={4} className="g-4 todolist-row">
      {todos.map((todo, idx) => (
        <Col
          key={todo.todoId}
          className={`todolist-col ${
            todo.todoIsComplete ? "todolist-col--complete" : ""
          }`}
        >
          <Card className="todolist-card">
            <Card.Img variant="top" src={ImgTest} className="todolist-img" />
            <Card.Body>
              <Card.Title>{todo.todoName}</Card.Title>

              <div className="todolist__container">
                <Card.Text className="todolist__container-desc">
                  {todo.todoDescription}
                </Card.Text>
                <div className="todolist__container-action">
                  <i
                    className="fas fa-trash todolist__container-action-item todolist__container-action-item--delete"
                    onClick={() =>
                      dispatch(
                        deleteTodoAsync({
                          todoId: todo.todoId,
                        })
                      )
                    }
                  ></i>
                  <i
                    className="fas fa-edit todolist__container-action-item todolist__container-action-item--edit"
                    onClick={() => {
                      dispatch(
                        setTodo({
                          todoId: todo.todoId,
                          todoName: todo.todoName,
                          todoDescription: todo.todoDescription,
                          todoIsCompleted: todo.todoIsComplete,
                          userId: userId,
                        })
                      );
                      dispatch(setUpdateModalShow(true));
                    }}
                  ></i>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default TodoList;
