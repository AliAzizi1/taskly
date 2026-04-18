'use client'

import Button from "@/components/mainComponents/Button/Button"
import SelectInput from "@/components/mainComponents/inputs/SelectInput/SelectInput"
import TextInput from "@/components/mainComponents/inputs/TextInput/TextInput"
import { useEffect, useState } from "react"
import { useSetting } from "@/app/context/SettingTask"
import { statusIcons } from "../statusIcons/statusIcons"
import Modal from "@/components/mainComponents/Modal/Modal"

interface Tag {
    id: string 
    name: string | null
    icon: number | null
}

interface Props {
    onClose: () => void,
    item: Tag | null
    isEdit: boolean
    endSend: (type: string) => void
}

const AddAndEditStatus = ({onClose, item, isEdit, endSend}: Props) => {

    const { addStatus, editStatus } = useSetting()

    const [status, setStatus] = useState<Tag | null>({
        id: crypto.randomUUID(),
        name: null,
        icon: null
    })

    useEffect(() => {
        if(item) {
            setStatus({
                id: item.id,
                name: item.name,
                icon: item.icon
            })
        }
    },[])

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setStatus(prev => {
            if (!prev) return prev
            return {...prev, name: value}
        })
    }

    const handleChangeIcon = (value:any) => {
        setStatus(prev => {
            if (!prev) return prev
            return {...prev, icon: value.id}
        })
    }

    const handleSendData = () => {
        if(status?.name && status?.icon) {
            if(isEdit) {
                editStatus(status)
                onClose()
                endSend('edit')
            } else {
                addStatus(status)
                onClose()
                endSend('add')
            }
            
        }
    }

    useEffect(() => {
        console.log('tag: ', status)
    }, [status])

    return(
        <>
            <Modal size={150} name={isEdit ? `ویرایش - ${item?.name}` : "اضافه کردن وضعیت"} onClose={onClose}>
                <div className="w-full flex flex-col mt-5">
                        <div className="w-full flex flex-col lg:flex-row gap-4">
                            <TextInput value={status?.name || ''} onChange={handleChangeName} label='عنوان وضعیت : ' placeholder={"مثل جلسه کاری..."} />
                            <span className="lg:w-80">
                                <SelectInput type="status" selected={item?.icon || null} onChange={handleChangeIcon} items={statusIcons} label='آیکون : ' />
                            </span>
                        </div>
                    </div>

                    <div className="w-full flex flex-row gap-2 items-center justify-end font-bold pt-4 mt-6 border-t-1 border-gray-200">
                        <Button color="blue" cancel={true} name="لغو" icon="noIcon" onClick={onClose} />
                        <Button color="blue" cancel={false} name={isEdit ? "ویرایش" : "اضافه کردن"} icon={isEdit ? 'tick' : "add"} onClick={handleSendData} />
                    </div>
            </Modal> 
        </>
    )
}

export default AddAndEditStatus