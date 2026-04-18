'use client'

import Button from "@/components/mainComponents/Button/Button"
import SelectInput from "@/components/mainComponents/inputs/SelectInput/SelectInput"
import TextInput from "@/components/mainComponents/inputs/TextInput/TextInput"
import { useEffect, useState } from "react"
import { useSetting } from "@/app/context/SettingTask"
import { userIcons } from "../userIcons/userIcons"
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

const AddAndEditUser = ({onClose, item, isEdit, endSend}: Props) => {

    const { addUser, editUser } = useSetting()

    const [user, setUser] = useState<Tag | null>({
        id: crypto.randomUUID(),
        name: null,
        icon: null
    })

    useEffect(() => {
        if(item) {
            setUser({
                id: item.id,
                name: item.name,
                icon: item.icon
            })
        }
    },[])

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setUser(prev => {
            if (!prev) return prev
            return {...prev, name: value}
        })
    }

    const handleChangeIcon = (value:any) => {
        setUser(prev => {
            if (!prev) return prev
            return {...prev, icon: value.id}
        })
    }

    const handleSendData = () => {
        if(user?.name && user?.icon) {
            if(isEdit) {
                editUser(user)
                onClose()
                endSend('edit')
            } else {
                addUser(user)
                onClose()
                endSend('add')
            }
            
        }
    }

    useEffect(() => {
        console.log('tag: ', user)
    }, [user])

    return(
        <>
            <Modal size={150} name={isEdit ? `ویرایش - ${item?.name}` : "افزودن کاربر"} onClose={onClose}>
                <div className="w-full flex flex-col mt-5">
                        <div className="w-full flex flex-col lg:flex-row gap-4">
                            <TextInput value={user?.name || ''} onChange={handleChangeName} label='نام کاربر : ' placeholder={"مثل علی عزیزی..."} />
                            <span className="lg:w-80">
                                <SelectInput type="user" selected={item?.icon || null} onChange={handleChangeIcon} items={userIcons} label='آیکون : ' />
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

export default AddAndEditUser