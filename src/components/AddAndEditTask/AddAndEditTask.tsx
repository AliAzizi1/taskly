'use client'

import { useTask } from "@/app/context/TaskContext"
import { useEffect, useState } from "react"
import TextInput from "../mainComponents/inputs/TextInput/TextInput"
import SelectInput from "../mainComponents/inputs/SelectInput/SelectInput"
import DateInput from "../mainComponents/inputs/DateInput/DateInput"
import LongTextInput from "../mainComponents/inputs/LongTextInput/LongTextInput"
import Button from "../mainComponents/Button/Button"
import { useSetting } from "@/app/context/SettingTask"
import { title } from "process"
import Modal from "../mainComponents/Modal/Modal"


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

interface props{
    onClose: () => void,
    endSend: (type: string) => void,
    item: Task | null
    isEdit: boolean
}

const AddAndEditTask = ({onClose, item, isEdit, endSend}: props) => {
    
    const [task, setTask] = useState<Task | null>({
        id: crypto.randomUUID(),
        title: null,
        category: null,
        deadline: null,
        status: null,
        user: null,
        description: null,
        saved: false,
    })

    const {newTask, editTask } = useTask()
    const {users, tags, status } = useSetting()

    useEffect(() => {
        if(item){
            setTask({
                id: item.id,
                title: item.title,
                category: item.category,
                deadline: item.deadline,
                status: item.status,
                user: item.user,
                description: item.description,
                saved: item.saved,
            })
        }
    },[])

    const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setTask(prev => {
            if (!prev) return prev
            return { ...prev, title: value }
        })

    }

    const handleChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value
        setTask(prev => {
            if (!prev) return prev
            return { ...prev, description: value }
        })

    }

    const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setTask(prev => {
            if (!prev) return prev
            return { ...prev, deadline: value }
        })

    }

    const handleChangeStatus = (value:any) => {
        setTask(prev => {
            if (!prev) return prev
            return {...prev, status: value.id}
        })
    }

    const handleChangeTag = (value:any) => {
        setTask(prev => {
            if (!prev) return prev
            return {...prev, category: value.id}
        })
    }

    const handleChangeUser = (value:any) => {
        setTask(prev => {
            if (!prev) return prev
            return {...prev, user: value.id}
        })
    }

    const taskSend = () => {
        if(task?.id) {
            if(isEdit) {
                editTask(task)
                endSend('edit')
                onClose()
            } else{
                newTask(task)
                endSend('add')
                onClose()
            }
            
        }
    }

    useEffect(() => {
        console.log(task)
    }, [task])

    return(
        <>
            <Modal size={200} name="اضافه کردن کار" onClose={onClose}>
                    <div className="w-full flex flex-col mt-5">
                        <div className="w-full flex flex-col lg:flex-row gap-4">
                            <TextInput value={task?.title || ''} onChange={handleChangeTitle} label='عنوان کار : ' placeholder={"مثل جلسه روز یکشنبه ساعت 12..."} />
                            <span className="lg:w-80">
                                <SelectInput type="status" selected={item?.status || null} onChange={handleChangeStatus} items={status || []} label='وضعیت : ' />
                            </span>
                        </div>
                        
                        <div className="w-full flex flex-row gap-4 mt-5">
                            <LongTextInput value={task?.description || ''} onChange={handleChangeDescription} label='توضیحات : ' placeholder={"مثل جلسه روز یکشنبه باید با همکاران هماهنگ شود..."}/>
                        </div>
                        <div className="w-full flex flex-col lg:flex-row gap-4 mt-5">
                            <SelectInput type="tag" selected={item?.category || null} onChange={handleChangeTag} items={tags ||[]} label='دسته بندی : ' />
                            <SelectInput type="user" selected={item?.user || null} onChange={handleChangeUser} items={users || []} label='کاربر انجام دهنده : ' />
                            <DateInput vlaue={task?.deadline || null} onChange={handleChangeDate} label='تاریخ سررسید : ' />
                        </div>

                    </div>

                    <div className="w-full flex flex-row gap-2 items-center justify-end font-bold pt-4 mt-6 border-t-1 border-gray-200">
                        <Button color="blue" cancel={true} name="لغو" icon="noIcon" onClick={onClose} />
                        <Button color="blue" cancel={false} name={isEdit ? "ویرایش" : "اضافه کردن"} icon={isEdit ? 'tick' : "add"} onClick={taskSend} />
                    </div>
            </Modal>
        </>
    )
}

export default AddAndEditTask