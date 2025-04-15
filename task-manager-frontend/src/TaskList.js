import axios from "axios";

export default function TaskList({onRefresh, tasks}) {

    function deleteTask(id) {
        axios.delete(`http://localhost:3000/tasks/${id}`)
            .then(() => onRefresh())
            .catch(err => console.error(`Error deleting tasks:`, err));
    }

    return (
    <div style={{ border: '1px solid black', padding: '10px' }}>
        <h1>Task List</h1>
        <ul>
            {tasks.map(task => (
                <li key={task.id}>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <button onClick={() => deleteTask(task.id)}>Delete</button>
                </li>
            ))}
        </ul>
    </div>
    );
}