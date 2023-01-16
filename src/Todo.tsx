import React from "react";
import { TodoT } from "./useExpress";

type Props = {
  todo: TodoT;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>, i: number) => void;
  handleClick: (todo: TodoT) => void;
  handleSubmitText: (e: React.KeyboardEvent<HTMLInputElement>, todo: TodoT, blur?: boolean) => void;
  handleClose: (id: string) => void;
  index: number,
  textRef: React.MutableRefObject<HTMLInputElement>;
  isLast: boolean;
}

export const Todo = ({
  todo,
  handleOnChange,
  handleClick,
  handleSubmitText,
  handleClose,
  index,
  textRef,
  isLast,
}: Props) => (
  <li className="todo-item" key={todo._id}>
    <div className="todo-item-container">
      <input
        type="checkbox"		
        // value={todo.complete}
        className={`todo-check`}
        onClick={() => handleClick(todo)}
        disabled={isLast}
        defaultChecked={todo.complete}
      />
    </div>
    <input
      type="text"
      id={todo._id}
      value={todo.text}
      className={`todo-text  ${isLast ? "focus" : ""} ${
        todo.complete ? "completed" : ""
      }`}
      ref={textRef}
      onChange={(e) => handleOnChange(e, index)}
      autoFocus={isLast}
      onKeyDown={(e) => handleSubmitText(e, todo)}
      // onBlur={(e) => handleSubmitText(e, todo, true)}
    />
    <div className="todo-item-container">
      <button className="todo-close" onClick={() => handleClose(todo._id)}>
        x
      </button>
    </div>
  </li>
);
