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
      <div className="App p-4 bg-gray-100 min-h-screen">
          <div className="mb-6">
              <TaskForm />
          </div>
          <div>
              <TaskList onRefresh={handleGetTasks} tasks={tasks} />
          </div>
      </div>

  );

}

export default App;
