import {useState} from "react";
import axios from "axios";

export default function TaskList({onRefresh, tasks}) {
    const [filter, setFilter] = useState("");

    const [editTaskID, setEditTaskID] = useState(""); // Used to indicate which task is currently being edited.
    const [editTaskTitle, setEditTaskTitle] = useState("");
    const [editTaskDescription, setEditTaskDescription] = useState("");

    tasks = tasks.filter(task => {
        return task.title.includes(filter) || task.description.includes(filter);
    })

    function updateTask(id, title, description) {
        axios.patch(`http://localhost:3000/tasks/${id}`, {title, description})
            .then(() => {
                onRefresh();
                setEditTaskID("");
            })
            .catch(err => console.error(`Error updating task:`, err));
    }

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
                        {editTaskID === task.id ?
                            <div className="flex flex-col gap-2">
                                <input
                                    type="text"
                                    placeholder="Title"
                                    value={editTaskTitle}
                                    onChange={e => setEditTaskTitle(e.target.value)}
                                    className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <textarea
                                    placeholder="Description"
                                    value={editTaskDescription}
                                    onChange={e => setEditTaskDescription(e.target.value)}
                                    className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <div className="flex gap-2 mt-2">
                                    <button
                                        onClick={() => setEditTaskID("")}
                                        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => updateTask(task.id, editTaskTitle, editTaskDescription)}
                                        className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition-colors"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>

                            :

                            <div className="flex flex-col gap-2">
                                <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                                <p className="text-gray-700">{task.description}</p>
                                <div className="flex gap-2 mt-2">
                                    <button
                                        onClick={() => deleteTask(task.id)}
                                        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition-colors"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => {
                                            setEditTaskID(task.id);
                                            setEditTaskTitle(task.title);
                                            setEditTaskDescription(task.description);
                                        }}
                                        className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition-colors"
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>
                        }
                    </li>
                ))}
            </ul>
        </div>

    );
}