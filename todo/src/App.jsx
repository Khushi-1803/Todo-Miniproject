import { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() === "") return;
    setTasks([...tasks, { text: task, completed: false }]);
    setTask("");
  };

  return (
    <>
      
        <div className="flex justify-center items-center gap-5 h-screen flex-col">
        <form onSubmit={handleSubmit} className="flex gap-5">
          <input
            className="h-12 w-64 border-2 p-2"
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Create your task here"
          />

          <button
            type="submit"
            className="bg-yellow-500 h-12 w-20 border-2 p-2"
          >
            Add
          </button>
        </form>

        {/* Render Tasks */}
        <div className="mt-6">
          {tasks.map((t, index) => (
            <div key={index} className="border p-2 mt-2 w-64">
              <div className="flex items-center justify-between gap-2">
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => {
                    const updatedTasks = [...tasks];
                    updatedTasks[index].completed =
                      !updatedTasks[index].completed;
                    setTasks(updatedTasks);
                  }}
                />

                <span
                  className={
                    t.completed
                      ? "line-through flex-1 text-center"
                      : "flex-1 text-center"
                  }
                >
                  {t.text}
                </span>

                <img
                  className="w-5 h-5"
                  src="https://img.icons8.com/?size=100&id=99961&format=png&color=000000"
                  onClick={() => {
                    const newTasks = tasks.filter((_, i) => i !== index);
                    setTasks(newTasks);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </>
  );
}

export default App;
