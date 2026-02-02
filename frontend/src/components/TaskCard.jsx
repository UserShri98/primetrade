import {useState} from "react";

const TaskCard=({task,onDelete,onStatusChange,onEdit})=>{
  const [isEditing, setIsEditing]=useState(false);
  const [editText, setEditText]=useState(task.title);

  const saveEdit=()=>{
    if(!editText.trim()) return;
    onEdit(task._id,editText);
    setIsEditing(false);
  };

  return (
    <div className="border p-3 rounded flex justify-between items-center">
      <div className="flex-1">
        {isEditing ?(
          <input
            className="border p-1 w-full mb-1"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={saveEdit}
          />
        ):(
          <p className={`font-medium ${
              task.completed ? "line-through text-gray-400" : ""
            }`}
          >
            {task.title}
          </p>
        )}

        <div className="flex gap-2 mt-1">
          <select
            className="border text-sm p-1"
            value={task.completed?"completed" : "pending"}
            onChange={(e)=> onStatusChange(task._id,e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>

          <button
            className="text-blue-500 text-sm"
            onClick={()=>setIsEditing(true)}
          >
            Edit
          </button>
        </div>
      </div>

      <button
        onClick={()=>onDelete(task._id)}
        className="text-red-500 text-sm ml-3"
      >Delete
      </button>
    </div>
  );
};

export default TaskCard;
