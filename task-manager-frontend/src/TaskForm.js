import {useState} from "react";
import axios from "axios";

export default function TaskForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    function handleSubmit(e) {
        axios.post("http://localhost:3000/tasks", {title, description})
            .then(res => {
                setTitle('');
                setDescription('');
            })
            .catch(err => console.error(`Error adding task:`, err));
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md mx-auto space-y-4">
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
            >
                Add Task
            </button>
        </form>

    );

}