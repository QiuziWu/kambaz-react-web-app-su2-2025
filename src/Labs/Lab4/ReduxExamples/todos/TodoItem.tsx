import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

export default function TodoItem({ todo }: { todo: any }) {
    const dispatch = useDispatch();
    return (
        <div
            className="d-flex justify-content-between align-items-center mb-2"
            style={{
                borderBottom: "1px solid #dee2e6",
            }}
        >
            <div>{todo.title}</div>
            <div>
                <Button
                    variant="primary"
                    size="sm"
                    className="me-2"
                    onClick={() => dispatch(setTodo(todo))}
                    id="wd-set-todo-click">Edit
                </Button>
                <Button
                    variant="danger"
                    size="sm"
                    onClick={() => dispatch(deleteTodo(todo.id))}
                    id="wd-delete-todo-click">Delete
                </Button>
            </div>
        </div>
    );
}
