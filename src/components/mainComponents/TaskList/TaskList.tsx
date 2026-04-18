'use client'

import { useSetting } from "@/app/context/SettingTask"
import { useTask } from "@/app/context/TaskContext"
import AddAndEditTask from "@/components/AddAndEditTask/AddAndEditTask"
import { useEffect, useState } from "react"
import DeleteModal from "../DeleteModal/DeleteModal"
import { userIcons } from "@/app/users/userIcons/userIcons"
import { tagIcons } from "@/app/tags/tagIcons/tagIcons"
import { statusIcons } from "@/app/status/statusIcons/statusIcons"
import SuccessAlert from "../Alert/SuccessAlert/SuccessAlert"
import FailedAlert from "../Alert/FailedAlert/FailedAlert"
import { useRouter } from "next/navigation"


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

interface Props {
    saved: boolean
    name: string
    tagId: string | null
}

interface ShowMessage {
    type: string
    show: boolean
    text: string
}

const TaskList = ({saved, name, tagId} : Props) => {
    
    const router = useRouter();

    const { tasks, newTask, deleteTask, toggleSaved } = useTask()
    const { tags, status, users } = useSetting()

    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [newTaskModal, setNewTaskModal] = useState<boolean>(false)
    const [task, setTask] = useState<Task | null>(null)

    const [deleteModal, setDeleteModal] = useState<boolean>(false)
    const [deleteItem, setDeleteItem] = useState<Task | null>(null)

    const [showMessage, setShowMessage] = useState<ShowMessage>({
        type: "success",
        show: false,
        text: ''
    })


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
            <div className="h-full hidden lg:block">
                <div className="w-full flex items-center justify-between pb-4 mb-4 border-b-1 border-gray-200">
                    <span className="font-bold">{tagId ? `کارهای ${tags?.find(i => i.id === tagId)?.name}` : name}</span>
                </div>
                <div className="w-full lg:h-full lg:overflow-auto pl-2">
                    <table className="table text-sm w-full border-separate border-spacing-y-4">
                        <thead className="sticky top-0 bg-white z-10">
                            <tr className="text-right">
                                <th className="p-2 text-sm text-gray-500 border-b-1 border-gray-200 font-normal">عنوان کار</th>
                                <th className="p-2 text-sm text-gray-500 border-b-1 border-gray-200 font-normal">دسته بندی</th>
                                <th className="p-2 text-sm text-gray-500 border-b-1 border-gray-200 font-normal">ددلاین</th>
                                <th className="p-2 text-sm text-gray-500 border-b-1 border-gray-200 font-normal">وضعیت</th>
                                {/* <th className="p-2 text-sm text-gray-500 border-b-1 border-gray-200 font-normal">کاربر</th> */}
                                <th className="p-2 text-sm text-gray-500 border-b-1 border-gray-200 font-normal">عملیات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks?.length > 0 ? (
                                tagId ? (
                                    tasks.map((item) => (
                                item.category === tagId && (
                                    <>
                                        <tr style={{boxShadow: "0 0 30px #0000000d"}} className="text-right border-1 border-gray-200 rounded">
                                            <th className="p-3 w-80 flex items-center gap-1">
                                                {!saved && (
                                                    <span className="hover:cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 active:scale-90" onClick={() => toggleSaved(item.id)}>
                                                        {item.saved ? (
                                                            <svg xmlns="http://www.w3.org/2000/svg" 
                                                            width="18" height="18" 
                                                            viewBox="0 0 24 24" 
                                                            fill="currentColor">
                                                                <path d="M6 2C4.9 2 4 2.9 4 4v18l8-5 8 5V4c0-1.1-.9-2-2-2H6z"/>
                                                            </svg>

                                                        ) : (
                                                            <svg className="opacity-50" xmlns="http://www.w3.org/2000/svg" 
                                                            width="18" height="18" 
                                                            viewBox="0 0 24 24" 
                                                            fill="none" 
                                                            stroke="currentColor" 
                                                            stroke-width="2" 
                                                            stroke-linecap="round" 
                                                            stroke-linejoin="round">
                                                                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                                                            </svg>
                                                        )}
                                                    </span>
                                                )}
                                                {item.title}
                                            </th>
                                            <th className="p-3 w-60">
                                                <span className="flex items-center gap-1">
                                                    {tagIcons.find(i => i.id === (tags?.find(i => i.id === item?.category)?.icon))?.value}
                                                    {tags?.find(i => i.id === item.category)?.name}
                                                </span>
                                            </th>
                                            <th className="p-3 w-60">{item.deadline}</th>
                                            <th className="p-3 w-50">
                                                <span className="flex items-center gap-1">
                                                    {statusIcons.find(i => i.id === (status?.find(i => i.id === item.status)?.icon))?.value}
                                                    {status?.find(i => i.id === item.status)?.name}
                                                </span>
                                            </th>
                                            {/* <th className="p-3 w-50">
                                                <span className="flex items-center gap-1">
                                                    {userIcons.find(i => i.id === (users?.find(i => i.id === item.user)?.icon))?.value}
                                                    {users?.find(i => i.id === item.user)?.name}
                                                </span>
                                            </th> */}
                                            <th className="p-3 flex items-center gap-2">
                                                
                                                <button onClick={() => {router.push(`/showTask/${item.id}`)}} className="flex items-center justify-center p-2 rounded bg-green-600 hover:bg-green-800 text-white cursor-pointer">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12 5C6.5 5 2.1 8.6 1 12C2.1 15.4 6.5 19 12 19C17.5 19 21.9 15.4 23 12C21.9 8.6 17.5 5 12 5Z" stroke="currentColor" stroke-width="2" fill="none"/>
                                                        <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" fill="none"/>
                                                    </svg>
                                                </button>

                                                <button onClick={() => {setTask(item); setIsEdit(true); setNewTaskModal(true)}} className="flex items-center justify-center p-2 rounded bg-blue-600 hover:bg-blue-800 text-white cursor-pointer">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12 20H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                        <path d="M16.5 3.5C16.8978 3.10217 17.4374 2.87868 18 2.87868C18.2786 2.87868 18.5544 2.93355 18.8118 3.04015C19.0692 3.14676 19.303 3.30301 19.5 3.5C19.697 3.69698 19.8532 3.93083 19.9598 4.1882C20.0665 4.44557 20.1213 4.72142 20.1213 5C20.1213 5.27857 20.0665 5.55442 19.9598 5.81179C19.8532 6.06916 19.697 6.30301 19.5 6.5L7 19L3 20L4 16L16.5 3.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                    </svg>
                                                </button>
                                                
                                                <button onClick={() => {setDeleteModal(true); setDeleteItem(item)}} className="flex items-center justify-center p-2 rounded bg-red-500 hover:bg-red-700 text-white cursor-pointer">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                        <path d="M3 6h18"/>
                                                        <path d="M8 6V4h8v2"/>
                                                        <path d="M19 6l-1 14H6L5 6"/>
                                                        <path d="M10 11v6"/>
                                                        <path d="M14 11v6"/>
                                                    </svg>
                                                </button>

                                            </th>
                                        </tr>
                                        {/* <td colSpan={6} className="text-right text-blue-500 p-2 rounded bg-blue-50 whitespace-pre-wrap">
                                            <span className="flex items-center gap-1">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 11C11.7348 11 11.4804 11.1054 11.2929 11.2929C11.1054 11.4804 11 11.7348 11 12V16C11 16.2652 11.1054 16.5196 11.2929 16.7071C11.4804 16.8946 11.7348 17 12 17C12.2652 17 12.5196 16.8946 12.7071 16.7071C12.8946 16.5196 13 16.2652 13 16V12C13 11.7348 12.8946 11.4804 12.7071 11.2929C12.5196 11.1054 12.2652 11 12 11ZM12.38 7.08C12.1365 6.97998 11.8635 6.97998 11.62 7.08C11.4972 7.12759 11.3851 7.19896 11.29 7.29C11.2017 7.3872 11.1306 7.49881 11.08 7.62C11.024 7.73868 10.9966 7.86882 11 8C10.9992 8.13161 11.0245 8.26207 11.0742 8.38391C11.124 8.50574 11.1973 8.61656 11.29 8.71C11.3872 8.79833 11.4988 8.86936 11.62 8.92C11.7715 8.98224 11.936 9.00632 12.0989 8.99011C12.2619 8.97391 12.4184 8.91792 12.5547 8.82707C12.691 8.73622 12.8029 8.61328 12.8805 8.46907C12.9582 8.32486 12.9992 8.16378 13 8C12.9963 7.73523 12.8927 7.48163 12.71 7.29C12.6149 7.19896 12.5028 7.12759 12.38 7.08ZM12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51808 6.3459 2.7612 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92893 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2V2ZM12 20C10.4178 20 8.87103 19.5308 7.55544 18.6518C6.23984 17.7727 5.21447 16.5233 4.60896 15.0615C4.00346 13.5997 3.84504 11.9911 4.15372 10.4393C4.4624 8.88743 5.22433 7.46197 6.34315 6.34315C7.46197 5.22433 8.88743 4.4624 10.4393 4.15372C11.9911 3.84504 13.5997 4.00346 15.0615 4.60896C16.5233 5.21447 17.7727 6.23984 18.6518 7.55544C19.5308 8.87103 20 10.4177 20 12C20 14.1217 19.1571 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20V20Z" fill="currentColor"/>
                                                </svg>
                                                {item?.description || '-'}
                                            </span>
                                        </td> */}
                                    </>
                                )
                            ))
                                ) :
                                saved ? (
                                    tasks.map((item) => (
                                item.saved && (
                                    <>
                                        <tr style={{boxShadow: "0 0 30px #0000000d"}} className="text-right border-1 border-gray-200 rounded">
                                            <th className="p-3 w-80 flex items-center gap-1">
                                                {!saved && (
                                                    <span className="hover:cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 active:scale-90" onClick={() => toggleSaved(item.id)}>
                                                        {item.saved ? (
                                                            <svg xmlns="http://www.w3.org/2000/svg" 
                                                            width="18" height="18" 
                                                            viewBox="0 0 24 24" 
                                                            fill="currentColor">
                                                                <path d="M6 2C4.9 2 4 2.9 4 4v18l8-5 8 5V4c0-1.1-.9-2-2-2H6z"/>
                                                            </svg>

                                                        ) : (
                                                            <svg className="opacity-50" xmlns="http://www.w3.org/2000/svg" 
                                                            width="18" height="18" 
                                                            viewBox="0 0 24 24" 
                                                            fill="none" 
                                                            stroke="currentColor" 
                                                            stroke-width="2" 
                                                            stroke-linecap="round" 
                                                            stroke-linejoin="round">
                                                                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                                                            </svg>
                                                        )}
                                                    </span>
                                                )}
                                                {item.title}
                                            </th>
                                            <th className="p-3 w-60">
                                                <span className="flex items-center gap-1">
                                                    {tagIcons.find(i => i.id === (tags?.find(i => i.id === item?.category)?.icon))?.value}
                                                    {tags?.find(i => i.id === item.category)?.name}
                                                </span>
                                            </th>
                                            <th className="p-3 w-60">{item.deadline}</th>
                                            <th className="p-3 w-50">
                                                <span className="flex items-center gap-1">
                                                    {statusIcons.find(i => i.id === (status?.find(i => i.id === item.status)?.icon))?.value}
                                                    {status?.find(i => i.id === item.status)?.name}
                                                </span>
                                            </th>
                                            {/* <th className="p-3 w-50">
                                                <span className="flex items-center gap-1">
                                                    {userIcons.find(i => i.id === (users?.find(i => i.id === item.user)?.icon))?.value}
                                                    {users?.find(i => i.id === item.user)?.name}
                                                </span>
                                            </th> */}
                                            <th className="p-3 flex items-center gap-2">

                                                <button onClick={() => {router.push(`/showTask/${item.id}`)}} className="flex items-center justify-center p-2 rounded bg-green-600 hover:bg-green-800 text-white cursor-pointer">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12 5C6.5 5 2.1 8.6 1 12C2.1 15.4 6.5 19 12 19C17.5 19 21.9 15.4 23 12C21.9 8.6 17.5 5 12 5Z" stroke="currentColor" stroke-width="2" fill="none"/>
                                                        <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" fill="none"/>
                                                    </svg>
                                                </button>

                                                <button onClick={() => {setTask(item); setIsEdit(true); setNewTaskModal(true)}} className="flex items-center justify-center p-2 rounded bg-blue-600 hover:bg-blue-800 text-white cursor-pointer">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12 20H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                        <path d="M16.5 3.5C16.8978 3.10217 17.4374 2.87868 18 2.87868C18.2786 2.87868 18.5544 2.93355 18.8118 3.04015C19.0692 3.14676 19.303 3.30301 19.5 3.5C19.697 3.69698 19.8532 3.93083 19.9598 4.1882C20.0665 4.44557 20.1213 4.72142 20.1213 5C20.1213 5.27857 20.0665 5.55442 19.9598 5.81179C19.8532 6.06916 19.697 6.30301 19.5 6.5L7 19L3 20L4 16L16.5 3.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                    </svg>
                                                </button>
                                                
                                                <button onClick={() => {setDeleteModal(true); setDeleteItem(item)}} className="flex items-center justify-center p-2 rounded bg-red-500 hover:bg-red-700 text-white cursor-pointer">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                        <path d="M3 6h18"/>
                                                        <path d="M8 6V4h8v2"/>
                                                        <path d="M19 6l-1 14H6L5 6"/>
                                                        <path d="M10 11v6"/>
                                                        <path d="M14 11v6"/>
                                                    </svg>
                                                </button>

                                            </th>
                                        </tr>
                                        {/* <td colSpan={6} className="text-right text-blue-500 p-2 rounded bg-blue-50 whitespace-pre-wrap">
                                            <span className="flex items-center gap-1">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 11C11.7348 11 11.4804 11.1054 11.2929 11.2929C11.1054 11.4804 11 11.7348 11 12V16C11 16.2652 11.1054 16.5196 11.2929 16.7071C11.4804 16.8946 11.7348 17 12 17C12.2652 17 12.5196 16.8946 12.7071 16.7071C12.8946 16.5196 13 16.2652 13 16V12C13 11.7348 12.8946 11.4804 12.7071 11.2929C12.5196 11.1054 12.2652 11 12 11ZM12.38 7.08C12.1365 6.97998 11.8635 6.97998 11.62 7.08C11.4972 7.12759 11.3851 7.19896 11.29 7.29C11.2017 7.3872 11.1306 7.49881 11.08 7.62C11.024 7.73868 10.9966 7.86882 11 8C10.9992 8.13161 11.0245 8.26207 11.0742 8.38391C11.124 8.50574 11.1973 8.61656 11.29 8.71C11.3872 8.79833 11.4988 8.86936 11.62 8.92C11.7715 8.98224 11.936 9.00632 12.0989 8.99011C12.2619 8.97391 12.4184 8.91792 12.5547 8.82707C12.691 8.73622 12.8029 8.61328 12.8805 8.46907C12.9582 8.32486 12.9992 8.16378 13 8C12.9963 7.73523 12.8927 7.48163 12.71 7.29C12.6149 7.19896 12.5028 7.12759 12.38 7.08ZM12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51808 6.3459 2.7612 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92893 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2V2ZM12 20C10.4178 20 8.87103 19.5308 7.55544 18.6518C6.23984 17.7727 5.21447 16.5233 4.60896 15.0615C4.00346 13.5997 3.84504 11.9911 4.15372 10.4393C4.4624 8.88743 5.22433 7.46197 6.34315 6.34315C7.46197 5.22433 8.88743 4.4624 10.4393 4.15372C11.9911 3.84504 13.5997 4.00346 15.0615 4.60896C16.5233 5.21447 17.7727 6.23984 18.6518 7.55544C19.5308 8.87103 20 10.4177 20 12C20 14.1217 19.1571 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20V20Z" fill="currentColor"/>
                                                </svg>
                                                {item?.description || '-'}
                                            </span>
                                        </td> */}
                                    </>
                                )
                            ))
                                ) : (
                                    tasks.map((item) => (
                                    <>
                                        <tr style={{boxShadow: "0 0 30px #0000000d"}} className="text-right border-1 border-gray-200 rounded">
                                            <th className="p-3 w-80 flex items-center gap-1">
                                                {!saved && (
                                                    <span className="hover:cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 active:scale-90" onClick={() => toggleSaved(item.id)}>
                                                        {item.saved ? (
                                                            <svg xmlns="http://www.w3.org/2000/svg" 
                                                            width="18" height="18" 
                                                            viewBox="0 0 24 24" 
                                                            fill="currentColor">
                                                                <path d="M6 2C4.9 2 4 2.9 4 4v18l8-5 8 5V4c0-1.1-.9-2-2-2H6z"/>
                                                            </svg>

                                                        ) : (
                                                            <svg className="opacity-50" xmlns="http://www.w3.org/2000/svg" 
                                                            width="18" height="18" 
                                                            viewBox="0 0 24 24" 
                                                            fill="none" 
                                                            stroke="currentColor" 
                                                            stroke-width="2" 
                                                            stroke-linecap="round" 
                                                            stroke-linejoin="round">
                                                                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                                                            </svg>
                                                        )}
                                                    </span>
                                                )}
                                                {item.title}
                                            </th>
                                            <th className="p-3 w-60">
                                                <span className="flex items-center gap-1">
                                                    {tagIcons.find(i => i.id === (tags?.find(i => i.id === item?.category)?.icon))?.value}
                                                    {tags?.find(i => i.id === item.category)?.name}
                                                </span>
                                            </th>
                                            <th className="p-3 w-60">{item.deadline}</th>
                                            <th className="p-3 w-50">
                                                <span className="flex items-center gap-1">
                                                    {statusIcons.find(i => i.id === (status?.find(i => i.id === item.status)?.icon))?.value}
                                                    {status?.find(i => i.id === item.status)?.name}
                                                </span>
                                            </th>
                                            {/* <th className="p-3 w-50">
                                                <span className="flex items-center gap-1">
                                                    {userIcons.find(i => i.id === (users?.find(i => i.id === item.user)?.icon))?.value}
                                                    {users?.find(i => i.id === item.user)?.name}
                                                </span>
                                            </th> */}
                                            <th className="p-3 flex items-center gap-2">

                                                <button onClick={() => {router.push(`/showTask/${item.id}`)}} className="flex items-center justify-center p-2 rounded bg-green-600 hover:bg-green-800 text-white cursor-pointer">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12 5C6.5 5 2.1 8.6 1 12C2.1 15.4 6.5 19 12 19C17.5 19 21.9 15.4 23 12C21.9 8.6 17.5 5 12 5Z" stroke="currentColor" stroke-width="2" fill="none"/>
                                                        <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" fill="none"/>
                                                    </svg>
                                                </button>

                                                <button onClick={() => {setTask(item); setIsEdit(true); setNewTaskModal(true)}} className="flex items-center justify-center p-2 rounded bg-blue-600 hover:bg-blue-800 text-white cursor-pointer">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12 20H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                        <path d="M16.5 3.5C16.8978 3.10217 17.4374 2.87868 18 2.87868C18.2786 2.87868 18.5544 2.93355 18.8118 3.04015C19.0692 3.14676 19.303 3.30301 19.5 3.5C19.697 3.69698 19.8532 3.93083 19.9598 4.1882C20.0665 4.44557 20.1213 4.72142 20.1213 5C20.1213 5.27857 20.0665 5.55442 19.9598 5.81179C19.8532 6.06916 19.697 6.30301 19.5 6.5L7 19L3 20L4 16L16.5 3.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                    </svg>
                                                </button>

                                                <button onClick={() => {setDeleteModal(true); setDeleteItem(item)}} className="flex items-center justify-center p-2 rounded bg-red-500 hover:bg-red-700 text-white cursor-pointer">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                        <path d="M3 6h18"/>
                                                        <path d="M8 6V4h8v2"/>
                                                        <path d="M19 6l-1 14H6L5 6"/>
                                                        <path d="M10 11v6"/>
                                                        <path d="M14 11v6"/>
                                                    </svg>
                                                </button>

                                            </th>
                                        </tr>
                                        {/* <tr>
                                            <td colSpan={6} className="text-right text-blue-500 p-2 rounded bg-blue-50 whitespace-pre-wrap">
                                                <span className="flex items-center gap-1">
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12 11C11.7348 11 11.4804 11.1054 11.2929 11.2929C11.1054 11.4804 11 11.7348 11 12V16C11 16.2652 11.1054 16.5196 11.2929 16.7071C11.4804 16.8946 11.7348 17 12 17C12.2652 17 12.5196 16.8946 12.7071 16.7071C12.8946 16.5196 13 16.2652 13 16V12C13 11.7348 12.8946 11.4804 12.7071 11.2929C12.5196 11.1054 12.2652 11 12 11ZM12.38 7.08C12.1365 6.97998 11.8635 6.97998 11.62 7.08C11.4972 7.12759 11.3851 7.19896 11.29 7.29C11.2017 7.3872 11.1306 7.49881 11.08 7.62C11.024 7.73868 10.9966 7.86882 11 8C10.9992 8.13161 11.0245 8.26207 11.0742 8.38391C11.124 8.50574 11.1973 8.61656 11.29 8.71C11.3872 8.79833 11.4988 8.86936 11.62 8.92C11.7715 8.98224 11.936 9.00632 12.0989 8.99011C12.2619 8.97391 12.4184 8.91792 12.5547 8.82707C12.691 8.73622 12.8029 8.61328 12.8805 8.46907C12.9582 8.32486 12.9992 8.16378 13 8C12.9963 7.73523 12.8927 7.48163 12.71 7.29C12.6149 7.19896 12.5028 7.12759 12.38 7.08ZM12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51808 6.3459 2.7612 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92893 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2V2ZM12 20C10.4178 20 8.87103 19.5308 7.55544 18.6518C6.23984 17.7727 5.21447 16.5233 4.60896 15.0615C4.00346 13.5997 3.84504 11.9911 4.15372 10.4393C4.4624 8.88743 5.22433 7.46197 6.34315 6.34315C7.46197 5.22433 8.88743 4.4624 10.4393 4.15372C11.9911 3.84504 13.5997 4.00346 15.0615 4.60896C16.5233 5.21447 17.7727 6.23984 18.6518 7.55544C19.5308 8.87103 20 10.4177 20 12C20 14.1217 19.1571 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20V20Z" fill="currentColor"/>
                                                    </svg>
                                                    {item?.description || '-'}
                                                </span>
                                            </td>
                                        </tr> */}
                                    </>
                            ))
                                )
                            ) : (
                                <tr>
                                    <td colSpan={6} className="text-center opacity-50 p-4">
                                        هیچ آیتمی موجود نیست
                                    </td>
                                </tr>
                            ) }
                            
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="lg:hidden ">
                <div className=" w-full flex items-center justify-between pb-4 mb-4 border-b-1 border-gray-200">
                    <span className="font-bold">{tagId ? `کارهای ${tags?.find(i => i.id === tagId)?.name}` : name}</span>
                </div>
                {tasks?.length > 0 ? (
                                tagId ? (
                                    tasks.map((item) => (
                                item.category === tagId && (
                                    <>
                                        <div className="w-full h-full mt-4 text-sm">
                                            <div className="w-full border-1 border-gray-200 bg-white shadow-lg p-4 rounded flex flex-col gap-4">
                                                <span className="font-bold flex items-center gap-2">
                                                    {!saved && (
                                                        <span className="hover:cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 active:scale-90" onClick={() => toggleSaved(item.id)}>
                                                            {item.saved ? (
                                                                <svg xmlns="http://www.w3.org/2000/svg" 
                                                                width="18" height="18" 
                                                                viewBox="0 0 24 24" 
                                                                fill="currentColor">
                                                                    <path d="M6 2C4.9 2 4 2.9 4 4v18l8-5 8 5V4c0-1.1-.9-2-2-2H6z"/>
                                                                </svg>

                                                            ) : (
                                                                <svg className="opacity-50" xmlns="http://www.w3.org/2000/svg" 
                                                                width="18" height="18" 
                                                                viewBox="0 0 24 24" 
                                                                fill="none" 
                                                                stroke="currentColor" 
                                                                stroke-width="2" 
                                                                stroke-linecap="round" 
                                                                stroke-linejoin="round">
                                                                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                                                                </svg>
                                                            )}
                                                        </span>
                                                    )}
                                                    {item.title}
                                                </span>
                                                <div className="w-full flex items-center justify-between px-3 py-2 border-1 border-gray-100 rounded">
                                                    <span className="opacity-50">دسته بندی :</span>
                                                    <span className="flex items-center gap-1">
                                                        {tagIcons.find(i => i.id === (tags?.find(i => i.id === item?.category)?.icon))?.value}
                                                        {tags?.find(i => i.id === item.category)?.name}
                                                    </span>
                                                </div>
                                                <div className="w-full flex items-center justify-between px-3 py-2 border-1 border-gray-100 rounded">
                                                    <span className="opacity-50">ددلاین :</span>
                                                    <span className="">{item.deadline}</span>
                                                </div>
                                                <div className="w-full flex items-center justify-between px-3 py-2 border-1 border-gray-100 rounded">
                                                    <span className="opacity-50">وضعیت :</span>
                                                    <span className="flex items-center gap-1">
                                                        {statusIcons.find(i => i.id === (status?.find(i => i.id === item.status)?.icon))?.value}
                                                        {status?.find(i => i.id === item.status)?.name}
                                                    </span>
                                                </div>
                                                <span className="p-3 flex items-center gap-2">

                                                    <button onClick={() => {router.push(`/showTask/${item.id}`)}} className="w-full flex items-center justify-center gap-2 p-2 rounded bg-green-600 hover:bg-green-800 text-white cursor-pointer">
                                                        
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M12 5C6.5 5 2.1 8.6 1 12C2.1 15.4 6.5 19 12 19C17.5 19 21.9 15.4 23 12C21.9 8.6 17.5 5 12 5Z" stroke="currentColor" stroke-width="2" fill="none"/>
                                                            <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" fill="none"/>
                                                        </svg>
                                                        <span>نمایش</span>

                                                    </button>

                                                    <button onClick={() => {setTask(item); setIsEdit(true); setNewTaskModal(true)}} className="w-full flex items-center justify-center gap-2 p-2 rounded bg-blue-600 hover:bg-blue-800 text-white cursor-pointer">
                                                        
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M12 20H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                            <path d="M16.5 3.5C16.8978 3.10217 17.4374 2.87868 18 2.87868C18.2786 2.87868 18.5544 2.93355 18.8118 3.04015C19.0692 3.14676 19.303 3.30301 19.5 3.5C19.697 3.69698 19.8532 3.93083 19.9598 4.1882C20.0665 4.44557 20.1213 4.72142 20.1213 5C20.1213 5.27857 20.0665 5.55442 19.9598 5.81179C19.8532 6.06916 19.697 6.30301 19.5 6.5L7 19L3 20L4 16L16.5 3.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                        </svg>
                                                        <span>ویرایش</span>

                                                    </button>

                                                    <button onClick={() => {setDeleteModal(true); setDeleteItem(item)}} className="w-full flex items-center justify-center gap-2 p-2 rounded bg-red-500 hover:bg-red-700 text-white cursor-pointer">
                                                        
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                            <path d="M3 6h18"/>
                                                            <path d="M8 6V4h8v2"/>
                                                            <path d="M19 6l-1 14H6L5 6"/>
                                                            <path d="M10 11v6"/>
                                                            <path d="M14 11v6"/>
                                                        </svg>
                                                        <span>حذف</span>

                                                    </button>

                                                </span>
                                            </div>
                                        </div>
                                    </>
                                )
                            ))
                                ) :
                                saved ? (
                                    tasks.map((item) => (
                                item.saved && (
                                    <>
                                        <div className="w-full h-full mt-4 text-sm">
                                            <div className="w-full border-1 border-gray-200 bg-white shadow-lg p-4 rounded flex flex-col gap-4">
                                                <span className="font-bold">{item.title}</span>
                                                <div className="w-full flex items-center justify-between px-3 py-2 border-1 border-gray-100 rounded">
                                                    <span className="opacity-50">دسته بندی :</span>
                                                    <span className="flex items-center gap-1">
                                                        {tagIcons.find(i => i.id === (tags?.find(i => i.id === item?.category)?.icon))?.value}
                                                        {tags?.find(i => i.id === item.category)?.name}
                                                    </span>
                                                </div>
                                                <div className="w-full flex items-center justify-between px-3 py-2 border-1 border-gray-100 rounded">
                                                    <span className="opacity-50">ددلاین :</span>
                                                    <span className="">{item.deadline}</span>
                                                </div>
                                                <div className="w-full flex items-center justify-between px-3 py-2 border-1 border-gray-100 rounded">
                                                    <span className="opacity-50">وضعیت :</span>
                                                    <span className="flex items-center gap-1">
                                                        {statusIcons.find(i => i.id === (status?.find(i => i.id === item.status)?.icon))?.value}
                                                        {status?.find(i => i.id === item.status)?.name}
                                                    </span>
                                                </div>
                                                <span className="p-3 flex items-center gap-2">

                                                    <button onClick={() => {router.push(`/showTask/${item.id}`)}} className="w-full flex items-center justify-center gap-2 p-2 rounded bg-green-600 hover:bg-green-800 text-white cursor-pointer">
                                                        
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M12 5C6.5 5 2.1 8.6 1 12C2.1 15.4 6.5 19 12 19C17.5 19 21.9 15.4 23 12C21.9 8.6 17.5 5 12 5Z" stroke="currentColor" stroke-width="2" fill="none"/>
                                                            <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" fill="none"/>
                                                        </svg>
                                                        <span>نمایش</span>

                                                    </button>

                                                    <button onClick={() => {setTask(item); setIsEdit(true); setNewTaskModal(true)}} className="w-full flex items-center justify-center gap-2 p-2 rounded bg-blue-600 hover:bg-blue-800 text-white cursor-pointer">
                                                        
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M12 20H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                            <path d="M16.5 3.5C16.8978 3.10217 17.4374 2.87868 18 2.87868C18.2786 2.87868 18.5544 2.93355 18.8118 3.04015C19.0692 3.14676 19.303 3.30301 19.5 3.5C19.697 3.69698 19.8532 3.93083 19.9598 4.1882C20.0665 4.44557 20.1213 4.72142 20.1213 5C20.1213 5.27857 20.0665 5.55442 19.9598 5.81179C19.8532 6.06916 19.697 6.30301 19.5 6.5L7 19L3 20L4 16L16.5 3.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                        </svg>
                                                        <span>ویرایش</span>

                                                    </button>

                                                    <button onClick={() => {setDeleteModal(true); setDeleteItem(item)}} className="w-full flex items-center justify-center gap-2 p-2 rounded bg-red-500 hover:bg-red-700 text-white cursor-pointer">
                                                        
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                            <path d="M3 6h18"/>
                                                            <path d="M8 6V4h8v2"/>
                                                            <path d="M19 6l-1 14H6L5 6"/>
                                                            <path d="M10 11v6"/>
                                                            <path d="M14 11v6"/>
                                                        </svg>
                                                        <span>حذف</span>

                                                    </button>

                                                </span>
                                            </div>
                                        </div>
                                    </>
                                )
                            ))
                                ) : (
                                    tasks.map((item) => (
                                    <>
                                        <div className="w-full h-full mt-4 text-sm">
                                            <div className="w-full border-1 border-gray-200 bg-white shadow-lg p-4 rounded flex flex-col gap-4">
                                                <span className="font-bold flex items-center gap-2">
                                                    {!saved && (
                                                        <span className="hover:cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 active:scale-90" onClick={() => toggleSaved(item.id)}>
                                                            {item.saved ? (
                                                                <svg xmlns="http://www.w3.org/2000/svg" 
                                                                width="18" height="18" 
                                                                viewBox="0 0 24 24" 
                                                                fill="currentColor">
                                                                    <path d="M6 2C4.9 2 4 2.9 4 4v18l8-5 8 5V4c0-1.1-.9-2-2-2H6z"/>
                                                                </svg>

                                                            ) : (
                                                                <svg className="opacity-50" xmlns="http://www.w3.org/2000/svg" 
                                                                width="18" height="18" 
                                                                viewBox="0 0 24 24" 
                                                                fill="none" 
                                                                stroke="currentColor" 
                                                                stroke-width="2" 
                                                                stroke-linecap="round" 
                                                                stroke-linejoin="round">
                                                                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                                                                </svg>
                                                            )}
                                                        </span>
                                                    )}
                                                    {item.title}
                                                </span>
                                                <div className="w-full flex items-center justify-between px-3 py-2 border-1 border-gray-100 rounded">
                                                    <span className="opacity-50">دسته بندی :</span>
                                                    <span className="flex items-center gap-1">
                                                        {tagIcons.find(i => i.id === (tags?.find(i => i.id === item?.category)?.icon))?.value}
                                                        {tags?.find(i => i.id === item.category)?.name}
                                                    </span>
                                                </div>
                                                <div className="w-full flex items-center justify-between px-3 py-2 border-1 border-gray-100 rounded">
                                                    <span className="opacity-50">ددلاین :</span>
                                                    <span className="">{item.deadline}</span>
                                                </div>
                                                <div className="w-full flex items-center justify-between px-3 py-2 border-1 border-gray-100 rounded">
                                                    <span className="opacity-50">وضعیت :</span>
                                                    <span className="flex items-center gap-1">
                                                        {statusIcons.find(i => i.id === (status?.find(i => i.id === item.status)?.icon))?.value}
                                                        {status?.find(i => i.id === item.status)?.name}
                                                    </span>
                                                </div>
                                                <span className="p-3 flex items-center gap-2">

                                                    <button onClick={() => {router.push(`/showTask/${item.id}`)}} className="w-full flex items-center justify-center gap-2 p-2 rounded bg-green-600 hover:bg-green-800 text-white cursor-pointer">
                                                        
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M12 5C6.5 5 2.1 8.6 1 12C2.1 15.4 6.5 19 12 19C17.5 19 21.9 15.4 23 12C21.9 8.6 17.5 5 12 5Z" stroke="currentColor" stroke-width="2" fill="none"/>
                                                            <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" fill="none"/>
                                                        </svg>
                                                        <span>نمایش</span>

                                                    </button>

                                                    <button onClick={() => {setTask(item); setIsEdit(true); setNewTaskModal(true)}} className="w-full flex items-center justify-center gap-2 p-2 rounded bg-blue-600 hover:bg-blue-800 text-white cursor-pointer">
                                                        
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M12 20H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                            <path d="M16.5 3.5C16.8978 3.10217 17.4374 2.87868 18 2.87868C18.2786 2.87868 18.5544 2.93355 18.8118 3.04015C19.0692 3.14676 19.303 3.30301 19.5 3.5C19.697 3.69698 19.8532 3.93083 19.9598 4.1882C20.0665 4.44557 20.1213 4.72142 20.1213 5C20.1213 5.27857 20.0665 5.55442 19.9598 5.81179C19.8532 6.06916 19.697 6.30301 19.5 6.5L7 19L3 20L4 16L16.5 3.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                        </svg>
                                                        <span>ویرایش</span>

                                                    </button>

                                                    <button onClick={() => {setDeleteModal(true); setDeleteItem(item)}} className="w-full flex items-center justify-center gap-2 p-2 rounded bg-red-500 hover:bg-red-700 text-white cursor-pointer">
                                                        
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                            <path d="M3 6h18"/>
                                                            <path d="M8 6V4h8v2"/>
                                                            <path d="M19 6l-1 14H6L5 6"/>
                                                            <path d="M10 11v6"/>
                                                            <path d="M14 11v6"/>
                                                        </svg>
                                                        <span>حذف</span>

                                                    </button>

                                                </span>
                                            </div>
                                        </div>
                                    </>
                            ))
                                )
                            ) : (
                                <tr>
                                    <td colSpan={6} className="text-center opacity-50 p-4">
                                        هیچ آیتمی موجود نیست
                                    </td>
                                </tr>
                            ) }
            </div>

            {newTaskModal && (
                <AddAndEditTask endSend={endSend} isEdit={isEdit} item={task ? task : null} onClose={() => setNewTaskModal(false)}/>
            )}

            {deleteModal && (
                <DeleteModal 
                name={deleteItem?.title || ''} 
                onClose={() => setDeleteModal(false)} 
                success={() => {
                    deleteTask(deleteItem?.id || ''); 
                    setDeleteModal(false)
                    setShowMessage({
                        type: "success",
                        show: true,
                        text: 'حذف کار'
                    })
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

export default TaskList