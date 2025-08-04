import { useState } from "react";
import { FormCheck, FormControl } from "react-bootstrap";
const HTTP_SERVER = import.meta.env.VITE_HTTP_SERVER;

export default function WorkingWithArrays() {
    const API = `${HTTP_SERVER}/lab5/todos`;
    const [todo, setTodo] = useState({
        id: "1",
        title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-09-09",
        completed: false,
    });

    return (
        <div id="wd-working-with-arrays">
            <h3>Working with Arrays</h3>

            <h4>Retrieving Arrays</h4>
            <a id="wd-retrieve-todos" className="btn btn-primary" href={API}>
                Get Todos </a><hr />

            <h3>Filtering Array Items</h3>
            <a id="wd-retrieve-completed-todos" className="btn btn-primary"
                href={`${API}?completed=true`}>
                Get Completed Todos
            </a><hr />

            <h3>Creating new Items in an Array</h3>
            <a id="wd-retrieve-completed-todos" className="btn btn-primary"
                href={`${API}/create`}>
                Create Todo
            </a><hr />

            <h3>Removing from an Array</h3>
            <a id="wd-remove-todo" className="btn btn-primary float-end" href={`${API}/${todo.id}/delete`}>
                Remove Todo with ID = {todo.id} </a>
            <FormControl defaultValue={todo.id} className="w-50" onChange={(e) => setTodo({ ...todo, id: e.target.value })} /><hr />

            <h3>Updating an Item in an Array</h3>
            <div className="mb-3">
                <label htmlFor="wd-todo-id" className="form-label">ID</label>
                <FormControl value={todo.id} className="w-25 mb-2"
                    onChange={(e) => setTodo({ ...todo, id: e.target.value })} />

                <label htmlFor="wd-todo-title" className="form-label">Title</label>
                <div className="d-flex mb-2">
                    <FormControl value={todo.title} className="w-50 me-2"
                        onChange={(e) => setTodo({ ...todo, title: e.target.value })} />
                    <a href={`${API}/${todo.id}/title/${todo.title}`} className="btn btn-primary">
                        Update Title
                    </a>
                </div>

                <label htmlFor="wd-todo-description" className="form-label">Description</label>
                <div className="d-flex mb-2">
                    <FormControl as="textarea" value={todo.description} className="w-50 me-2"
                        onChange={(e) => setTodo({ ...todo, description: e.target.value })} />
                    <a href={`${API}/${todo.id}/description/${encodeURIComponent(todo.description)}`}
                        className="btn btn-primary">
                        Update Description
                    </a>
                </div>

                <label htmlFor="wd-todo-completed" className="form-label me-2">Completed</label>
                <div className="d-flex align-items-center">
                    <FormCheck className="me-2"
                        id="wd-todo-completed"
                        checked={todo.completed}
                        onChange={(e) => setTodo({ ...todo, completed: e.target.checked })}
                    />
                    <a href={`${API}/${todo.id}/completed/${todo.completed}`}
                        className="btn btn-primary">
                        Update Status
                    </a>
                </div>
            </div>
            <hr />

            <h4>Retrieving an Item from an Array by ID</h4>
            <a id="wd-retrieve-todo-by-id" className="btn btn-primary float-end" href={`${API}/${todo.id}`}>
                Get Todo by ID
            </a>
            <FormControl id="wd-todo-id" value={todo.id} className="w-50"
                onChange={(e) => setTodo({ ...todo, id: e.target.value })} />
            <hr />
        </div>
    );
}

