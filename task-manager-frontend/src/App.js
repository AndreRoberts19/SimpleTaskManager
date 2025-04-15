import {useEffect, useState} from "react";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => handleGetTasks, [])

  function handleGetTasks() {
    axios.get('http://localhost:3000/tasks')
        .then(res => setTasks(res.data))
        .catch(err => console.error(`Error fetching tasks:`, err));
  }

  return (
      <div className="App">
        <TaskForm />
        <TaskList onRefresh={handleGetTasks} tasks={tasks} />
      </div>
  );

}

export default App;
