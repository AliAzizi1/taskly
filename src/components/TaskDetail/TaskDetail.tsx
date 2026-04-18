"use client"

import { useTask } from "@/app/context/TaskContext"
import { useEffect, useState } from "react"
import Button from "../mainComponents/Button/Button"
import { useRouter } from "next/navigation"
import { useSetting } from "@/app/context/SettingTask"
import { tagIcons } from "@/app/tags/tagIcons/tagIcons"
import { statusIcons } from "@/app/status/statusIcons/statusIcons"
import { userIcons } from "@/app/users/userIcons/userIcons"
import DeleteModal from "../mainComponents/DeleteModal/DeleteModal"
import SuccessAlert from "../mainComponents/Alert/SuccessAlert/SuccessAlert"
import FailedAlert from "../mainComponents/Alert/FailedAlert/FailedAlert"
import AddAndEditTask from "../AddAndEditTask/AddAndEditTask"

interface Props {
    id: string
}

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

interface ShowMessage {
    type: string
    show: boolean
    text: string
}

const TaskDetail = ({id}: Props) => {

    const [task, setTask] = useState<Task | null>(null)

    const { tasks, toggleSaved, deleteTask } = useTask()
    const { tags, status, users } = useSetting()

    const [deleteModal, setDeleteModal] = useState<boolean>(false)
    const [deleteItem, setDeleteItem] = useState<Task | null>(null)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [newTaskModal, setNewTaskModal] = useState<boolean>(false)

    const [showMessage, setShowMessage] = useState<ShowMessage>({
        type: "success",
        show: false,
        text: ''
    })

    const router = useRouter()

    useEffect(() => {
        setTask(tasks?.find(i => i.id === id) || null)
    }, [tasks, id])

    useEffect(() => {
        console.log(id, task)
    }, [task])

    const endSend = (type:string) => {
        setIsEdit(false);
        setTask(null)
        if(type === 'add' || type === 'edit') {
            setShowMessage({
            type: "success",
            show: true,
            text: type === 'add' ? 'اضافه کردن کار'  : 'ویرایش کار'
        })
        }
    }

    function getDateStatus(dateString: string | null): any {
        if(dateString) {
            const target = new Date(dateString)
            const today = new Date()

            // حذف ساعت برای دقت روز
            target.setHours(0,0,0,0)
            today.setHours(0,0,0,0)

            const diffTime = target.getTime() - today.getTime()
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

            if (diffDays > 0) {
                return `${diffDays} روز مانده به ددلاین`
            } else if (diffDays < 0) {
                return `${Math.abs(diffDays)} روز گذشته از ددلاین`
            } else {
                return `امروز ددلاین است`
            }
        } else {
            return
        }
        
    }


    return(
        <>
            <div className="h-full p-4">
                <div className="w-full flex items-center justify-between pb-4 mb-4 border-b-1 border-gray-200 hidden lg:flex">
                    <span className="font-bold flex items-center gap-3 ">
                        <span>{task?.title}</span>
                        <span className="opacity-20">|</span>
                        <span className="text-xs px-3 py-2 bg-blue-50 text-blue-600 rounded">{getDateStatus(task?.deadline || null)}</span>
                    </span>
                    <div className="flex items-center gap-2">
                        <span className="hover:cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 active:scale-90" onClick={() => toggleSaved(id)}>
                            {task?.saved ? (
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="22" height="22" 
                                    viewBox="0 0 24 24" 
                                    fill="currentColor"
                                >
                                    <path d="M6 2C4.9 2 4 2.9 4 4v18l8-5 8 5V4c0-1.1-.9-2-2-2H6z"/>
                                </svg>
                                ) : (
                                <svg 
                                    className="opacity-50" 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="22" height="22" 
                                    viewBox="0 0 24 24" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    stroke-width="2" 
                                    stroke-linecap="round" 
                                    stroke-linejoin="round"
                                >
                                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                                </svg>
                            )}
                        </span>
                        <span className="opacity-20">|</span>
                        <Button name="ویرایش" color="blue" icon="edit" cancel={false} onClick={() => { setIsEdit(true); setNewTaskModal(true)}} />
                        <Button name="حذف" color="red" icon="delete" cancel={false} onClick={() => {setDeleteModal(true)}} />
                        <span className="opacity-20">|</span>
                        <Button name="برگشت" color="" icon="back" cancel={true} onClick={() => router.back()} />

                    </div>
                </div>
                
                <div className="w-full p-0 lg:p-4 flex flex-col lg:flex-row items-center gap-2 justify-between">

                    <div className="w-full flex flex-col gap-3 items-center justify-between pb-4 mb-4 border-b-1 border-gray-200 lg:hidden">
                        <span className="w-full font-bold flex flex-col items-right gap-3 ">
                            <div className="flex flex-wrap items-center gap-2">
                                <div className="w-full flex gap-2 items-center justify-between pb-4 mb-2 border-b-1 border-gray-200">
                                    <span className="hover:cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 active:scale-90" onClick={() => toggleSaved(id)}>
                                    {task?.saved ? (
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            width="22" height="22" 
                                            viewBox="0 0 24 24" 
                                            fill="currentColor"
                                        >
                                            <path d="M6 2C4.9 2 4 2.9 4 4v18l8-5 8 5V4c0-1.1-.9-2-2-2H6z"/>
                                        </svg>
                                        ) : (
                                        <svg 
                                            className="opacity-50" 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            width="22" height="22" 
                                            viewBox="0 0 24 24" 
                                            fill="none" 
                                            stroke="currentColor" 
                                            stroke-width="2" 
                                            stroke-linecap="round" 
                                            stroke-linejoin="round"
                                        >
                                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                                        </svg>
                                    )}
                                    </span>
                                    <span className="opacity-20">|</span>
                                    <Button name="ویرایش" color="blue" icon="edit" cancel={false} onClick={() => {setIsEdit(true); setNewTaskModal(true)}} />
                                    <Button name="حذف" color="red" icon="delete" cancel={false} onClick={() => {setDeleteModal(true)}} />
                                    <span className="opacity-20">|</span>
                                    <Button name="برگشت" color="red" icon="back" cancel={false} onClick={() => router.back()} />
                                </div>
                                <span className="w-full mt-2">{task?.title}</span>
                            </div>
                            
                            <div className="w-full mb-2 lg:hidden">
                                <div className="w-full text-sm text-bold text-center px-3 py-2 bg-blue-50 text-blue-600 rounded">{getDateStatus(task?.deadline || null)}</div>
                            </div>
                        </span>
                        
                    </div>
                    <span className="flex items-center gap-2 p-4 border-1 border-gray-200 rounded w-full lg:border-none lg:w-auto lg:p-0">
                        <span className="opacity-50 text-sm">دسته بندی :</span>
                        <span className="flex items-center gap-1 font-bold">
                            {tagIcons.find(i => i.id === (tags?.find(i => i.id === task?.category)?.icon))?.value}
                            {tags?.find(i => i.id === task?.category)?.name}
                        </span>
                    </span>
                    <span className="opacity-20 hidden lg:block">|</span>
                    <span className="flex items-center gap-2 p-4 border-1 border-gray-200 rounded w-full lg:border-none lg:w-auto lg:p-0">
                        <span className="opacity-50 text-sm">وضعیت :</span>
                        <span className="flex items-center gap-1 font-bold">
                            {statusIcons.find(i => i.id === (status?.find(i => i.id === task?.status)?.icon))?.value}
                            {status?.find(i => i.id === task?.status)?.name}
                        </span>
                    </span>
                    <span className="opacity-20 hidden lg:block">|</span>
                    <span className="flex items-center gap-2 p-4 border-1 border-gray-200 rounded w-full lg:border-none lg:w-auto lg:p-0">
                        <span className="opacity-50 text-sm">کاربر انجام دهنده :</span>
                        <span className="flex items-center gap-1 font-bold">
                            {userIcons.find(i => i.id === (users?.find(i => i.id === task?.user)?.icon))?.value}
                            {users?.find(i => i.id === task?.user)?.name}
                        </span>
                    </span>
                </div>
                <div className=" bg-gray-50 border-1 border-gray-200 my-5 p-4 rounded whitespace-pre-wrap">
                    <div className="w-full flex items-center justify-between pb-3 mb-3 border-b-1 border-gray-200">
                        <span className="font-bold text-sm flex items-center gap-3">
                            توضیحات :
                        </span>
                    </div>
                    <span className="text-sm">
                        {task?.description}
                    </span>
                </div>
            </div>

            {newTaskModal && (
                <AddAndEditTask endSend={endSend} isEdit={isEdit} item={task ? task : null} onClose={() => setNewTaskModal(false)}/>
            )}

            {deleteModal && (
                <DeleteModal 
                name={task?.title || ''} 
                onClose={() => setDeleteModal(false)} 
                success={() => {
                    deleteTask(task?.id || ''); 
                    setDeleteModal(false)
                    router.back()
                }} 
                />
            )}


            {showMessage.show && (
                showMessage.type === "success" ? (
                    <SuccessAlert title={showMessage.text} />
                ) : (
                    <FailedAlert title={showMessage.text} />
                )
            )}
        </>
    )
}

export default TaskDetail