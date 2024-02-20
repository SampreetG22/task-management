import React, { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [doneList, setDoneList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    setLoading(true);
    axios({
      method: "GET",
      url: "https://task-management-backend-liard.vercel.app/getTasks",
    })
      .then((res) => {
        setTasks(res.data.taskData);
        setDoneList(res.data.markedAsDone);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const addTask = () => {
    setLoading(true);
    axios({
      method: "POST",
      url: "http://localhost:5000/api/addTask",
      data: {
        name: title,
        created: new Date(),
      },
    })
      .then(() => {
        setTitle("");
        fetchTasks();
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const deleteTask = (id) => {
    setLoading(true);
    axios({
      method: "DELETE",
      url: `http://localhost:5000/api/deleteTask/${id}`, // Removed extra slash
    })
      .then(() => {
        fetchTasks();
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const setMarkAsDone = () => {
    setLoading(true);
    axios({
      method: "PUT",
      url: `http://localhost:5000/api/markAsDone`,
      data: {
        markedList: doneList,
      },
    })
      .then(() => {
        fetchTasks();
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const addSelected = (event, id) => {
    if (event.target.checked) {
      setDoneList([...doneList, id]);
    } else {
      const filtered = doneList.filter((each) => each !== id);
      setDoneList(filtered);
    }
  };
  return (
    <div className="container">
      <h1>Task Manager</h1>
      <div className="input-container">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          className="task-input"
        />
        <button onClick={addTask} className="add-button">
          Add Task
        </button>
      </div>
      {loading ? (
        <CircularProgress />
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task._id} className="task-item">
              <span>
                <input
                  type="checkbox"
                  onChange={(e) => addSelected(e, task._id)}
                  checked={doneList.includes(task._id)}
                />
                {task.name.toUpperCase()}
              </span>

              <button
                onClick={() => deleteTask(task._id)}
                className="delete-button"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
      <button
        disabled={doneList.length < 1}
        className="mark-button"
        onClick={setMarkAsDone}
      >
        Mark as done
      </button>
    </div>
  );
}

export default App;
