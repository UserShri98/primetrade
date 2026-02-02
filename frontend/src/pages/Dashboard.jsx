import {useEffect,useState,useContext} from "react";
import api,{setAuthToken} from "../utils/api";
import {AuthContext} from "../context/AuthContext";
import TaskCard from "../components/TaskCard";

const Dashboard=()=>{
  const {userData}=useContext(AuthContext);

  const [profile,setProfile]=useState(null);
  const [tasks,setTasks]=useState([]);
  const [taskInput,setTaskInput]=useState("");
  const [searchText,setSearchText]=useState("");
  const [filterType,setFilterType]=useState("all");

  useEffect(()=>{
    setAuthToken(userData.token);

    const loadDashboardData=async()=>{
      const profileRes=await api.get("/users/profile");
      const tasksRes=await api.get("/tasks");

      setProfile(profileRes.data);
      setTasks(tasksRes.data);
    };

    loadDashboardData();
  }, []);

  const addTask=async()=>{
    if(!taskInput.trim()) return;

    const res=await api.post("/tasks",{title:taskInput});
    setTasks([res.data,...tasks]);
    setTaskInput("");
  };

  

const updateTaskStatus=async(taskId, status)=>{
  const res=await api.put(`/tasks/${taskId}`,{
    completed:status==="completed"
  });

  setTasks(
    tasks.map((task) =>task._id === taskId ? res.data : task
)
  );
};
const editTaskTitle=async(taskId,newTitle)=>{
  const res=await api.put(`/tasks/${taskId}`,{
    title:newTitle
  });

  setTasks(
    tasks.map((task) =>
      task._id===taskId?res.data:task
    )
  );
};

  const deleteTask=async(id)=>{
    await api.delete(`/tasks/${id}`);
    setTasks(tasks.filter((t)=t._id !== id));
  };

  const filteredTasks=tasks.filter((task)=>{
    const matchesSearch=task.title
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchesFilter=filterType==="all"?true:filterType === "completed"
    ?task.completed:!task.completed;
    return matchesSearch && matchesFilter;
  });

  if(!profile)return <p className="p-6">Loading...</p>;

  return(
    <div className="max-w-xl mx-auto mt-6 p-4">
      <h2 className="text-xl font-bold mb-2">
        Welcome, {profile.name}
      </h2>

      <div className="flex gap-2 mb-4">
        <input
          className="flex-1 border p-2"
          placeholder="Add a new task"
          value={taskInput}
          onChange={(e)=>setTaskInput(e.target.value)}
        />
        <button
          onClick={addTask}
          className="bg-black text-white px-4"
        >Add
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          className="flex-1 border p-2"
          placeholder="Search tasks..."
          value={searchText}
          onChange={(e)=>setSearchText(e.target.value)}
        />

        <select
          className="border p-2"
          value={filterType}
          onChange={(e)=>setFilterType(e.target.value)}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <div className="space-y-2">
        {filteredTasks.length=== 0 && (
          <p className="text-sm text-gray-500">
            No tasks found
          </p>
        )}

        {filteredTasks.map((task)=>(
         <TaskCard
  key={task._id}
  task={task}
  onDelete={deleteTask}
  onStatusChange={updateTaskStatus}
  onEdit={editTaskTitle}
/>


        ))}
      </div>
    </div>
  );
};

export default Dashboard;
