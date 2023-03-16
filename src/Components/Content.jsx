import React, { useCallback, useEffect, useRef, useState } from "react";
import { baseUrl } from "../APIs/BaseURL";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteToDo, storeTodo, tick } from "../Redux/todoSlice";
import { toast } from "react-hot-toast";

const Content = () => {
  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todo.todoList);
  const completedList = useSelector((state) => state.todo.completedList);
  const [content, setContent] = useState("");
  const inputRef = useRef();

  const saveTodo = async () => {
    try {
      const { data } = await baseUrl.post("/save", { content });
      dispatch(addTodo(data));
      inputRef.current.value = "";
      toast("Added todo task", {
        icon: "✅",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (err) {
      // handle err
    }
  };

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    try {
      const { data } = await baseUrl.get("/get-todo-list");
      dispatch(
        storeTodo({
          todoList: data.toDoList,
          completedList: data.completedList,
        })
      );
    } catch (err) {
      //handle
    }
  };

  const tickTodo = async (id) => {
    try {
      const { data } = await baseUrl.get(`/tick-todo/${id}`);
      toast("You've completed a task", {
        icon: "✅",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      dispatch(tick(data));
    } catch (err) {
      //handle err
    }
  };

  const deleteTodo = async (id, type) => {
    try {
      const { data } = await baseUrl.get(`/delete-todo/${id}/${type}`);
      if (data) {
        if (type === "completedList") {
          dispatch(deleteToDo({ type: "completedList", id: id }));
        }
        dispatch(deleteToDo({ type: "todoList", id: id }));
      }
      toast("Task deleted successfully", {
        icon: "✅",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (err) {
      //handle err
    }
  };

  return (
    <>
      <div className="mb-4">
        <div className="relative justify-center flex-row flex h-10 w-full overflow-clip rounded-lg">
          <input
            required
            ref={inputRef}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            className="peer rounded-l-lg border border-slate-400 px-2 text-slate-900 placeholder-slate-400 transition-colors duration-300 focus:border-gray-700 focus:outline-none"
            type="text"
            name="todo"
            id="todo"
            placeholder="Type something..."
          />
          <label
            onClick={saveTodo}
            className="flex items-center rounded-r-lg border border-slate-400 bg-slate-50 px-2 text-sm text-gray-500 transition-colors duration-300 peer-focus:border-gray-700 peer-focus:bg-gray-700 peer-focus:text-white"
            for="todo"
          >
            Submit
          </label>
        </div>
      </div>

      <div className="flex justify-evenly">
        <div className="md:w-2/5">
          <div className="flex flex-col">
            <div className="overflow-x-auto bg-slate-600 sm:rounded-lg">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden w-full">
                  <div className="bg-gray-100 dark:bg-gray-700">
                    <th
                      scope="col"
                      className="py-3 uppercase px-6 w-full flex font-normal justify-center text-gray-200"
                    >
                      To be completed
                    </th>
                  </div>
                  <table className=" divide-y divide-gray-200 table-fixed dark:divide-gray-700 w-full">
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                      {todoList.length ? (
                        todoList.map((todo) => {
                          return (
                            <tr className="hover:bg-gray-100 dark:hover:bg-gray-900 flex justify-between">
                              <td className="p-4 w-4">
                                <svg
                                  onClick={() => tickTodo(todo._id)}
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-6 h-6 text-white cursor-pointer hover:text-green-300"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                              </td>
                              <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {todo.content}
                              </td>

                              <td className="self-end text-white mr-0 py-4 px-6 text-xs font-small whitespace-nowrap">
                                <svg
                                  onClick={() =>
                                    deleteTodo(todo._id, "todoList")
                                  }
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-6 h-6 cursor-pointer hover:text-red-600"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          No todo list
                        </td>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-2/5">
          <div className="flex flex-col">
            <div className="overflow-x-auto bg-slate-600 sm:rounded-lg">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden w-full">
                  <div className="bg-gray-100 dark:bg-gray-700">
                    <th
                      scope="col"
                      className="py-3 uppercase px-6 w-full flex font-normal justify-center text-gray-200"
                    >
                      Completed
                    </th>
                  </div>
                  <table className=" divide-y divide-gray-200 table-fixed dark:divide-gray-700 w-full">
                    <tbody className="bg-white divide-y w-1 divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                      {completedList.length ? (
                        completedList.map((todo) => {
                          return (
                            <tr className="hover:bg-gray-100 dark:hover:bg-gray-900 flex justify-between">
                              <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {todo.content}
                              </td>

                              <td className="self-end text-white mr-0 py-4 px-6 text-xs font-small whitespace-nowrap">
                                <svg
                                  onClick={() =>
                                    deleteTodo(todo._id, "completedList")
                                  }
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-6 h-6 cursor-pointer hover:text-red-600"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          No completed list
                        </td>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Content;
