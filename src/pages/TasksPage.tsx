
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check, CheckCircle2, Clock, Plus, Tag } from "lucide-react";

const TasksPage = () => {
  const [tasks, setTasks] = useState([
    { 
      id: 1, 
      title: "Prepare presentation slides", 
      completed: false, 
      priority: "High", 
      dueDate: "Today", 
      category: "Work"
    },
    { 
      id: 2, 
      title: "Review quarterly report", 
      completed: false, 
      priority: "Medium", 
      dueDate: "Tomorrow", 
      category: "Work"
    },
    { 
      id: 3, 
      title: "Schedule team meeting", 
      completed: true, 
      priority: "High", 
      dueDate: "Yesterday", 
      category: "Work"
    },
    { 
      id: 4, 
      title: "Pay utility bills", 
      completed: false, 
      priority: "Urgent", 
      dueDate: "Today", 
      category: "Personal"
    },
    { 
      id: 5, 
      title: "Buy groceries", 
      completed: false, 
      priority: "Medium", 
      dueDate: "Tomorrow", 
      category: "Personal"
    }
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Urgent":
        return "bg-ai-red/20 text-ai-red";
      case "High":
        return "bg-amber-500/20 text-amber-500";
      case "Medium":
        return "bg-ai-blue/20 text-ai-blue";
      case "Low":
        return "bg-emerald-500/20 text-emerald-500";
      default:
        return "bg-gray-500/20 text-gray-500";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Work":
        return "bg-ai-purple/20 text-ai-purple";
      case "Personal":
        return "bg-ai-green/20 text-ai-green";
      case "Health":
        return "bg-ai-teal/20 text-ai-teal";
      case "Learning":
        return "bg-ai-orange/20 text-ai-orange";
      default:
        return "bg-gray-500/20 text-gray-500";
    }
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks(
      tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Tasks</h1>
          <p className="text-muted-foreground">Manage your tasks and stay productive</p>
        </div>
        <Button className="flex items-center gap-2 bg-ai-purple text-white hover:bg-ai-purple/90">
          <Plus className="h-4 w-4" />
          New Task
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <motion.div variants={itemVariants} className="lg:col-span-3">
          <Card className="glass-morphism">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl flex items-center gap-2">
                <CheckCircle2 className="text-ai-green" />
                All Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks.map(task => (
                  <motion.div
                    key={task.id}
                    className={`
                      p-4 rounded-lg transition-all
                      ${task.completed 
                        ? 'bg-white/5 opacity-60' 
                        : 'bg-white/10 hover:bg-white/15'}
                    `}
                    whileHover={{ scale: 1.01 }}
                    layoutId={`task-${task.id}`}
                  >
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => toggleTaskCompletion(task.id)}
                        className={`
                          size-6 rounded-full flex items-center justify-center flex-shrink-0 border-2
                          ${task.completed 
                            ? 'bg-ai-green border-ai-green text-white' 
                            : 'border-muted-foreground hover:border-ai-green'}
                        `}
                      >
                        {task.completed && <Check className="size-4" />}
                      </button>
                      
                      <div className="flex-1 min-w-0">
                        <p className={`
                          font-medium
                          ${task.completed ? 'line-through text-muted-foreground' : ''}
                        `}>
                          {task.title}
                        </p>
                        
                        <div className="flex items-center gap-3 mt-1 text-xs">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="size-3" />
                            <span>{task.dueDate}</span>
                          </div>
                          <div className="flex gap-2">
                            <span className={`
                              rounded-full px-2 py-0.5 flex items-center gap-1 
                              ${getPriorityColor(task.priority)}
                            `}>
                              <Tag className="size-3" />
                              {task.priority}
                            </span>
                            <span className={`
                              rounded-full px-2 py-0.5 
                              ${getCategoryColor(task.category)}
                            `}>
                              {task.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-1">
          <Card className="glass-morphism">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {["Work", "Personal", "Health", "Learning"].map(category => (
                  <div 
                    key={category} 
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <span className={`
                      text-sm rounded-full px-2 py-0.5 
                      ${getCategoryColor(category)}
                    `}>
                      {category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {category === "Work" ? "3 tasks" : 
                       category === "Personal" ? "2 tasks" : "0 tasks"}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <h3 className="text-base font-medium">Priority Filters</h3>
                <div className="space-y-2 mt-2">
                  {["Urgent", "High", "Medium", "Low"].map(priority => (
                    <div 
                      key={priority} 
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer flex items-center justify-between"
                    >
                      <span className={`
                        text-sm rounded-full px-2 py-0.5
                        ${getPriorityColor(priority)}
                      `}>
                        {priority}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {priority === "Urgent" ? "1 task" : 
                         priority === "High" ? "2 tasks" : 
                         priority === "Medium" ? "2 tasks" : "0 tasks"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TasksPage;
