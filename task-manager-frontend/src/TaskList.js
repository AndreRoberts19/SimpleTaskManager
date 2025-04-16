import {useState} from "react";
import axios from "axios";

export default function TaskList({onRefresh, tasks}) {
    const [filter, setFilter] = useState("");

    tasks = tasks.filter(task => {
        return task.title.includes(filter) || task.description.includes(filter);
    })

    function deleteTask(id) {
        axios.delete(`http://localhost:3000/tasks/${id}`)
            .then(() => onRefresh())
            .catch(err => console.error(`Error deleting tasks:`, err));
    }

    return (
        <div className="border border-gray-300 p-6 rounded shadow-md bg-white w-full max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-gray-800">Task List</h1>
                <input
                    type="text"
                    placeholder="Filter"
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <ul className="space-y-4">
                {tasks.map(task => (
                    <li
                        key={task.id}
                        className="border border-gray-200 rounded p-4 shadow-sm hover:shadow-md transition-shadow bg-gray-50"
                    >
                        <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                        <p className="text-gray-700 mb-2">{task.description}</p>
                        <button
                            onClick={() => deleteTask(task.id)}
                            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition-colors"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>

    );
}