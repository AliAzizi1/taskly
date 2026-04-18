"use client"

import { createContext, useContext, useState, useEffect } from "react"


interface Task {
  id: string,
  title: string | null,
  category: string | null,
  deadline: string | null,
  status: string | null,
  user: string | null,
  description: string | null
  saved:boolean
}

interface TaskContextType {
  tasks: Task[]
  newTask: (task: Task) => void
  deleteTask: (id: string) => void
  editTask: (task: Task) => void
  toggleSaved: (is: string | null) => void
}

const TaskContext = createContext<TaskContextType | null>(null)

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {

  const [tasks, setTasks] = useState<Task[]>([])
  const [loaded, setLoaded] = useState(false)

  // load tasks
  useEffect(() => {
    const stored = localStorage.getItem("tasks")
    if (stored) {
      setTasks(JSON.parse(stored))
    }
    setLoaded(true)
  }, [])

  // save tasks
  useEffect(() => {
    if (loaded) {
      localStorage.setItem("tasks", JSON.stringify(tasks))
    }
  }, [tasks, loaded])

  const newTask = (newItem: Task) => {
    setTasks(prev => {
      if (prev?.some(item => item.id === newItem.id)) return prev
      return [...prev || [], newItem]
    })
  }

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id))
  }

  const editTask = (updatedTask: Task) => {
    setTasks(prev => {
        if (!prev) return prev
        return prev.map(task => task.id === updatedTask.id ? updatedTask : task)
      })
  }

  const toggleSaved = (id: string | null) => {
    setTasks(prev => {
      if (!prev) return prev
      return prev.map(task =>
        task.id === id ? { ...task, saved: !task.saved } : task
      )
    })
  }


  return (
    <TaskContext.Provider value={{ tasks, newTask, deleteTask, editTask, toggleSaved }}>
      {children}
    </TaskContext.Provider>
  )
}

export function useTask() {
  const context = useContext(TaskContext)

  if (!context) {
    throw new Error("useTask must be used inside TaskProvider")
  }

  return context
}
