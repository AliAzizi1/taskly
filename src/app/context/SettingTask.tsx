"use client"

import { createContext, useContext, useState, useEffect } from "react"

type SettingItems = {
    id: string ,
    name: string | null,
    icon: number | null
}

type ThemeContextType = {
  tags: SettingItems[] | null
  status: SettingItems[] | null
  users: SettingItems[] | null
  addTag: (data:SettingItems) => void
  editTag: (data:SettingItems) => void
  removeTag: (name: string) => void
  addStatus: (data:SettingItems) => void
  editStatus: (data:SettingItems) => void
  removeStatus: (name: string) => void
  addUser: (data:SettingItems) => void
  editUser: (data:SettingItems) => void
  removeUser: (name: string) => void
}

const SettingTask = createContext<ThemeContextType | null>(null)

export function SettingTaskProvider({ children }: { children: React.ReactNode }) {
  const [tags, setTags] = useState<SettingItems[] | null>(null)
  const [status, setStatus] = useState<SettingItems[] | null>(null)
  const [users, setUsers] = useState<SettingItems[] | null>(null)
  const [loaded, setLoaded] = useState<boolean>(false)

  // load tags
  useEffect(() => {
    const storedTag = localStorage.getItem("tags")
    if (storedTag) {
      setTags(JSON.parse(storedTag))
    }
    const storedStatus = localStorage.getItem("status")
    if (storedStatus) {
      setStatus(JSON.parse(storedStatus))
    }
    const storedUsers = localStorage.getItem("users")
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers))
    }
    setLoaded(true)
  }, [])
  
  // save tags
  useEffect(() => {
    if (loaded) {
      localStorage.setItem("tags", JSON.stringify(tags))
      localStorage.setItem("status", JSON.stringify(status))
      localStorage.setItem("users", JSON.stringify(users))
    }
  }, [tags, status, users, loaded])

  const addTag = (data: SettingItems) => {
    setTags(prev => [...prev || [], data])
  }

  const removeTag = (id: string) => {
    setTags(prev => {
        if (!prev) return prev
        return prev.filter(i => i.id !== id)
    })
  }

  const editTag = (data: SettingItems) => {
    setTags(prev => {
        if (!prev) return prev
        return prev.map(tag => tag.id === data.id ? data : tag)
    })
  }

  const addStatus = (data: SettingItems) => {
    setStatus(prev => [...prev || [], data])
  }

  const removeStatus = (id: string) => {
    setStatus(prev => {
        if (!prev) return prev
        return prev.filter(i => i.id !== id)
    })
  }

  const editStatus = (data: SettingItems) => {
    setStatus(prev => {
        if (!prev) return prev
        return prev.map(tag => tag.id === data.id ? data : tag)
    })
  }

  const addUser = (data: SettingItems) => {
    setUsers(prev => [...prev || [], data])
  }

  const removeUser = (id: string) => {
    setUsers(prev => {
        if (!prev) return prev
        return prev.filter(i => i.id !== id)
    })
  }

  const editUser = (data: SettingItems) => {
    setUsers(prev => {
        if (!prev) return prev
        return prev.map(tag => tag.id === data.id ? data : tag)
    })
  }

  const value = {
    tags,
    status,
    users,
    addTag,
    removeTag,
    editTag,
    addStatus,
    removeStatus,
    editStatus,
    addUser,
    removeUser,
    editUser,
  };

  return (
    <SettingTask.Provider value={value}>
      {children}
    </SettingTask.Provider>
  )
}

export function useSetting() {
  const context = useContext(SettingTask)
  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider")
  }
  return context
}
