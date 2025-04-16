import axios from "axios";

export default function TaskList({onRefresh, tasks}) {

    function deleteTask(id) {
        axios.delete(`http://localhost:3000/tasks/${id}`)
            .then(() => onRefresh())
            .catch(err => console.error(`Error deleting tasks:`, err));
    }

    return (
        <div className="border border-gray-300 p-6 rounded shadow-md bg-white w-full max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Task List</h1>
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