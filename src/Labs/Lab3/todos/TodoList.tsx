import TodoItem from "./TodoItem";
import todos from "./todos.json";
const TodoList = () => {
    return (
        <>
            <h3>Todo List</h3>
            <ul className="list-group">
                {todos.map(todo => {
                  return <TodoItem key={todo.id} todo={todo} />;
                })}
            </ul><hr />
        </>
    );
}
export default TodoList;
