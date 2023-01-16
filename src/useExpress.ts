import { useCallback, useState } from "react";

export type TodoT = {
    _id?: string;
    text: string;
    complete?: boolean;
    timestamp?: string;
}

const defaultState : TodoT= { _id: "-1", text: "", complete: false, timestamp: "" };

export const useExpress = () => {
  const [data, setData] = useState<TodoT[]>([]);

  const fetchGET = (endpoint: string) => {
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        return [...data, { ...defaultState }];
      })
      .then((data) => {
        setData(data);
      });
  };
  const fetchPOST = (endpoint: string, reqB:TodoT) => {
    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqB),
    })
      .then((res) => {
        return res.json();
      })
      .then((data:TodoT) => {
        setData((todos) => {
          todos[todos.length - 1] = data;
          return [...todos, { ...defaultState }];
        });
      });
  };
  const fetchPUT = (endpoint:string, reqB:TodoT) => {
    fetch(endpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqB),
    })
      .then((res) => res.json())
      .then((data: TodoT) => {
        setData((todos) => {
          return todos.map((todo) => {
            if (todo._id === data._id) {
              todo = data;
            }
            return todo;
          });
        });
      });
  };
  const fetchDELETE = (endpoint:string) => {
    fetch(endpoint, { method: "DELETE" })
      .then((res) => res.json())
      .then((data:TodoT) => {
        setData((todos) => todos.filter((todo) => todo._id !== data._id));
      });
  };
  const fetchComplete = (endpoint:string) => {
    fetch(endpoint)
      .then((res) => res.json())
      .then((data:TodoT) => {
        setData((todos) => {
          return todos.map((todo) => {
            if (todo._id === data._id) {
              todo.complete = data.complete;
            }
            return todo;
          });
        });
      });
  };
  const req = useCallback((endpoint:string, reqM:string, reqB:TodoT = defaultState) => {
    if (reqM === "POST") {
      fetchPOST(endpoint, reqB);
    } else if (reqM === "PUT") {
      fetchPUT(endpoint, reqB);
    } else if (reqM === "DELETE") {
      fetchDELETE(endpoint);
    } else if (reqM === "COMPLETE") {
      fetchComplete(endpoint);
    } else if (reqM === "GET") {
      fetchGET(endpoint);
    }
  }, []);

  return {data, setData, req};
};
