'use client'

import React, { useEffect, useState } from "react";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import Searchox from "./Searchox/Searchox";
import ProfileSmall from "../profile/ProfileSmall/ProfileSmall";
import Button from "../Button/Button";
import { useTask } from "@/app/context/TaskContext";
import AddAndEditTask from "@/components/AddAndEditTask/AddAndEditTask";
import SuccessAlert from "../Alert/SuccessAlert/SuccessAlert";
import FailedAlert from "../Alert/FailedAlert/FailedAlert";
import MobileSidebar from "./MobileSidebar/MobileSidebar";
import { useRouter } from "next/navigation";


interface Task {
    id: string,
    title: string,
    category: string | null,
    deadline: string,
    status: string | null,
    user: string | null,
    description: string
    saved: false
}

interface ShowMessage {
    type: string
    show: boolean
    text: string
}

const Navigations = () => {

    const {newTask} = useTask()
    const [newTaskModal, setNewTaskModal] = useState<boolean>(false)
    const [task, setTask] = useState<Task | null>(null)
    const [mobileSidebar, setMobileSidebar] = useState<boolean>(false)

    const router = useRouter()

    const [showMessage, setShowMessage] = useState<ShowMessage>({
        type: "success",
        show: false,
        text: ''
    })

    const addTask = () => {
        setNewTaskModal(true)
    }

    const endSend = (type: string) => {
        setTask(null)
        setShowMessage({
            type: "success",
            show: true,
            text: type === 'add' ? 'اضافه کردن کار'  : 'ویرایش کار'
        })
        router.push('/')
    }

    useEffect(() => {
        if (showMessage.show) {
            setTimeout(() => {
                setShowMessage(prev => ({
                    ...prev,
                    show: false
                }))
            }, 3000)
        }
    }, [showMessage])

    return(
        <>
            <div className="w-full flex items-center gap-2 justify-between bg-white border-1 border-gray-200 shadow-md p-3 rounded">
                <Searchox />
                <div className="flex flex-row gap-4 items-center justify-center">
                    <Button color="blue" name="کار جدید" icon="new" onClick={addTask} cancel={false}/>
                    <span className="opacity-30 lg:hidden">|</span>
                    <span onClick={() => setMobileSidebar(true)} style={{width: '34px', height: "34px"}} className="lg:hidden p-1 rounded border-1 border-gray-300 bg-gray-100">
                        <svg width="24" height="24" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            >
                            <rect x="3" y="6" width="18" height="2" fill="black"/>
                            <rect x="3" y="11" width="18" height="2" fill="black"/>
                            <rect x="3" y="16" width="18" height="2" fill="black"/>

                        </svg>
                    </span>
                    <span className="hidden lg:block"><ProfileSmall /></span>
                </div>
            </div>
            {newTaskModal && (
                <AddAndEditTask endSend={endSend} isEdit={false} item={task} onClose={() => setNewTaskModal(false)} />
            )}

            {showMessage.show && (
                showMessage.type === "success" ? (
                    <SuccessAlert title={showMessage.text} />
                ) : (
                    <FailedAlert title={showMessage.text} />
                )
            )}

            {mobileSidebar && (
                <MobileSidebar onClose={() => {setMobileSidebar(false)}}/>
            )}
        </>
        
    )
}

export default Navigations