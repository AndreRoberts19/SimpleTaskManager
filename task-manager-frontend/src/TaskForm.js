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
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
            />
            <button type="submit">Add Task</button>
        </form>
    );

}