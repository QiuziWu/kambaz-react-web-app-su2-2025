import { useSelector } from "react-redux";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

export default function TodoList() {
    const { todos } = useSelector((state: any) => state.todosReducer);
    // const [todos, setTodos] = useState([
    //     { id: "1", title: "Learn React" },
    //     { id: "2", title: "Learn Node" }]);
    // const [todo, setTodo] = useState({ id: "-1", title: "Learn Mongo" });
    // const addTodo = (todo: any) => {
    //     const newTodos = [...todos, {
    //         ...todo,
    //         id: new Date().getTime().toString()
    //     }];
    //     setTodos(newTodos);
    //     setTodo({ id: "-1", title: "" });
    // };
    // const deleteTodo = (id: string) => {
    //     const newTodos = todos.filter((todo) => todo.id !== id);
    //     setTodos(newTodos);
    // };
    // const updateTodo = (todo: any) => {
    //     const newTodos = todos.map((item) =>
    //         (item.id === todo.id ? todo : item));
    //     setTodos(newTodos);
    //     setTodo({ id: "-1", title: "" });
    // };
    return (
        <div id="wd-todo-list-redux">
            <div className="container mt-4">
                <h2 className="mb-4">Todo List</h2>
                <div className="p-4 bg-white rounded"
                    style={{ border: "1px solid #dee2e6", }}>
                    <TodoForm />
                    {todos.map((todo: any) => (
                        <TodoItem key={todo.id} todo={todo} />
                    ))}
                </div>
            </div>
        </div>
    );
}
