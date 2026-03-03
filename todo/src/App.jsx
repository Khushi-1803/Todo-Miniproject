import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (task.trim() === "") return;

    try {
      const response = await fetch("http://localhost:8000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task }),
      });

      const data = await response.json();

      // Add the saved task from backend
      setTasks([...tasks, data]);

      setTask("");
    } catch (error) {
      console.log("Error:", error);
    }
  };
  useEffect(() => {
    fetch("http://localhost:8000/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

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
            <div key={t._id} className="border p-2 mt-2 w-64">
              <div className="flex items-center justify-between gap-2">
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={async () => {
                    const updatedCompleted = !t.completed;

                    await fetch(`http://localhost:8000/tasks/${t._id}`, {
                      method: "PUT",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ completed: updatedCompleted }),
                    });

                    const updatedTasks = tasks.map((task) =>
                      task._id === t._id
                        ? { ...task, completed: updatedCompleted }
                        : task,
                    );

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
                  {t.task}
                </span>

                <img
                  className="w-5 h-5"
                  src="https://img.icons8.com/?size=100&id=99961&format=png&color=000000"
                  onClick={async () => {
                    await fetch(`http://localhost:8000/tasks/${t._id}`, {
                      method: "DELETE",
                    });

                    const newTasks = tasks.filter((task) => task._id !== t._id);
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
