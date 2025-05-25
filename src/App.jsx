import { useState, useEffect, useRef } from 'react';
import Todo from './components/Todo';
import './app.css';
import { v4 as uuidv4 } from 'uuid';
import './Res.css';
function App() {
  const [todo, setTodo] = useState("Add Your Task");
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [ch1, setCh1] = useState(false);
  const [flag, setFlag] = useState(false);
  const [idd, setIdd] = useState(null);
  const inputRef = useRef(null);

  const [view, setView] = useState("todo"); 

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleChange = (e) => setTodo(e.target.value);

  const handleAdd = () => {
    if (todo !== "Add Your Task" && todo.trim() !== "") {
      if (!flag) {
        setTodos([{ id: uuidv4(), todo, iscompleted: false }, ...todos]);
      } else {
        setTodos(prev =>
          prev.map(item =>
            item.id === idd ? { ...item, todo } : item
          )
        );
        setFlag(false);
        setIdd(null);
      }
      setTodo("Add Your Task");
    }
  };

  const handleDelete = (idToDelete) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== idToDelete));
  };

  const handleEdit = (id) => {
    const item = todos.find(t => t.id === id);
    if (item) {
      setTodo(item.todo);
      inputRef.current?.focus();
      setFlag(true);
      setIdd(id);
    }
  };

  const toggleComplete = (id) => {
    setTodos(prev =>
      prev.map(item =>
        item.id === id ? { ...item, iscompleted: !item.iscompleted } : item
      )
    );
  };

  const erase = () => {
    if (todo === "Add Your Task") setTodo("");
  };

  const update = () => {
    if (todo.trim() === "") setTodo("Add Your Task");
  };

  const filteredTodos = todos.filter(item => {
    if (view === "todo") return !item.iscompleted;
    if (view === "finished") return item.iscompleted;
    return true; // for 'all'
  });

  return (
    <>
      <div className="body">
        <div className="container">
          <div className="heading">
            <div className="subhead">
              <h2 className="addt">To-Do List</h2>
              <div className="todologo">
                <img src="https://www.svgrepo.com/show/444531/gui-todo-list.svg" alt="" />
              </div>
            </div>
            <div className="input">
              <input
                ref={inputRef}
                type="text"
                onMouseLeave={update}
                onKeyDown={(e) => {
                  erase();
                  if (e.key === "Enter" && todo !== "" && todo !== "Add Your Task") {
                    handleAdd();
                  }
                }}
                onClick={erase}
                onChange={handleChange}
                value={todo}
                className="text"
              />
              <button
                onMouseDown={() => setCh1(true)}
                onMouseUp={() => setCh1(false)}
                onClick={handleAdd}
                className={`add ${ch1 ? "active11" : ""}`}
              >
                ADD
              </button>
            </div>
          </div>

          {/* View Options */}
          <div className="showfinished">
            <div className="mid" onClick={() => setView("todo")}>
              <div className="btnss">
                {view === "todo" ? (
                  <img className="circleimg" src="checkbox.svg" alt="" />
                ) : (
                  <button className="circle"></button>
                )}
              </div>
              <div className="mid_text">Showing To-do</div>
            </div>

            <div className="mid" onClick={() => setView("all")}>
              <div className="btnss">
                {view === "all" ? (
                  <img className="circleimg" src="checkbox.svg" alt="" />
                ) : (
                  <button className="circle"></button>
                )}
              </div>
              <div className="mid_text">Showing All</div>
            </div>

            <div className="mid" onClick={() => setView("finished")}>
              <div className="btnss">
                {view === "finished" ? (
                  <img className="circleimg" src="checkbox.svg" alt="" />
                ) : (
                  <button className="circle"></button>
                )}
              </div>
              <div className="mid_text">Showing Finished</div>
            </div>
          </div>

          <div className="yourtodo">
            <div className="todos">
              {filteredTodos.length === 0 && <div className="empty">No To-Do's</div>}
              {filteredTodos.map((item) => (
                <Todo
                  key={item.id}
                  text={item.todo}
                  id={item.id}
                  iscompleted={item.iscompleted}
                  toggleComplete={toggleComplete}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  view={view}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
