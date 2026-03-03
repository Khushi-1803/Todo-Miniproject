import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Task from "./models/task.model.js";
import cors from "cors"
dotenv.config(); 

const app = express();

app.use(express.json());
app.use(cors());

connectDB();


const PORT = process.env.PORT || 5000;

//CREATIN TASK
app.post("/tasks", async (req, res) => {
  try {
    const { task } = req.body;

    const newTask = await Task.create({
      task,
      completed: false
    });

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//GETTING ATSKS

app.get("/tasks",async (req,res)=>{
  const tasks = await Task.find();
  res.json(tasks)
})


//DELETE
app.delete("tasks/:id",async(req,res)=>{
    
   try {
    await Task.findByIdAndUpdate(req.params.id)
    res.status(200).json({message:"Task deleted successfully"})
   } catch (error) {
     res.status(500).json({ message: error.message });
   }
})

// UPDATE COMPLETED STATUS
app.put("/tasks/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { completed: req.body.completed },
      { new: true }
    );

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});