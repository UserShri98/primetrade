import Task from "../models/Task.js";

export const getTasks=async(req,res)=>{
  const tasks=await Task.find({user:req.userId}).sort({createdAt:-1});
  res.json(tasks);
};

export const createTask=async(req,res)=>{
  if(!req.body.title){
    res.status(400);
    throw new Error("Task title is required");
  }

  const task=await Task.create({
    title:req.body.title,
    user:req.userId
  });

  res.status(201).json(task);
};

export const deleteTask=async (req,res)=>{
  const task=await Task.findById(req.params.id);

  if(!task){
    res.status(404);
    throw new Error("Task not found");
  }

  if (task.user.toString()!==req.userId){
    res.status(401);
    throw new Error("Not authorized");
  }

  await task.deleteOne();
  res.json({message:"Task deleted"});
};
export const updateTask=async(req,res)=>{
  const task=await Task.findById(req.params.id);

  if(!task){
    res.status(404);
    throw new Error("Task not found");
  }

  if(task.user.toString()!==req.userId){
    res.status(401);
    throw new Error("Not authorized");
  }

  task.title=req.body.title || task.title;
  task.completed=req.body.completed !== undefined
      ?req.body.completed
:task.completed;

  const updatedTask=await task.save();
  res.json(updatedTask);
};
