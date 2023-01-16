import { ENDPOINTS, HTTPReqMethod } from "./endpoints";
import React, { useEffect, useRef } from "react";
import { TodoT, useExpress } from "./useExpress";
import { Todo } from "./Todo";

import "./App.css";

const regex = /^\s*$/;

export const App = () => {
  const writeRef = useRef<HTMLInputElement>();
  const { data: todos, setData: setTodos, req } = useExpress();

  const handleClick = (todo: TodoT) => {
    req(ENDPOINTS.UPDATE(todo._id), HTTPReqMethod.PUT, {
      ...todo,
      complete: !todo.complete,
      timestamp: Date.now().toString(),
    });
  };
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    setTodos((todos) =>
      todos.map((todo, index) => {
        if (i === index) {
          todo.text = e.target.value;
        }
        return todo;
      })
    );
  };
  const handleSubmitText = (
    e:React.KeyboardEvent<HTMLInputElement>,
    todo: TodoT,
    blur: boolean = false,
  ) => {
    const text = (e.target as HTMLInputElement).value;
    const id = (e.target as HTMLInputElement).id;
    if (blur || (!regex.test(text) && e.keyCode === 13)) {
      if (id === "-1") {
        req(ENDPOINTS.POST, HTTPReqMethod.POST, { text: text });
      } else {
        req(ENDPOINTS.UPDATE(id), "PUT", {
          ...todo,
          timestamp: Date.now().toString(),
        });
        writeRef.current.focus();
      }
    }
  };
  const handleClose = (id: string) => {
    req(ENDPOINTS.DELETE(id), HTTPReqMethod.DELETE);
  };

  useEffect(() => {
    req(ENDPOINTS.GET, HTTPReqMethod.GET);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <h1 className="greeting">Welcome, Elamurugan</h1>
      <h2 className="subtitle">Your Tasks</h2>
      <ul className="todos-container">
        {todos.map((todo, index) => {
          const isLast = todos.length - 1 === index;
          return (
            <Todo
              key={index}
              todo={todo}
              handleOnChange={handleOnChange}
              handleClick={handleClick}
              handleSubmitText={handleSubmitText}
              handleClose={handleClose}
              index={index}
              textRef={isLast ? writeRef : undefined}
              isLast={isLast}
            />
          );
        })}
      </ul>
    </div>
  );
};
