'use client'

import Button from "@/components/mainComponents/Button/Button"
import SelectInput from "@/components/mainComponents/inputs/SelectInput/SelectInput"
import TextInput from "@/components/mainComponents/inputs/TextInput/TextInput"
import { useEffect, useState } from "react"
import { tagIcons } from "../tagIcons/tagIcons"
import { useSetting } from "@/app/context/SettingTask"
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

const AddAndEditTag = ({onClose, item, isEdit, endSend}: Props) => {

    const { addTag, editTag } = useSetting()

    const [tag, setTag] = useState<Tag | null>({
        id: crypto.randomUUID(),
        name: null,
        icon: null
    })

    useEffect(() => {
        if(item) {
            setTag({
                id: item.id,
                name: item.name,
                icon: item.icon
            })
        }
    },[])

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setTag(prev => {
            if (!prev) return prev
            return {...prev, name: value}
        })
    }

    const handleChangeIcon = (value:any) => {
        setTag(prev => {
            if (!prev) return prev
            return {...prev, icon: value.id}
        })
    }

    const handleSendData = () => {
        if(tag?.name && tag?.icon) {
            if(isEdit) {
                editTag(tag)
                onClose()
                endSend('edit')
            } else {
                addTag(tag)
                onClose()
                endSend('add')
            }
            
        }
    }

    useEffect(() => {
        console.log('tag: ', tag)
    }, [tag])

    return(
        <>
            <Modal size={150} name={isEdit ? `ویرایش - ${item?.name}` : "اضافه کردن دسته بندی"} onClose={onClose}>
                <div className="w-full flex flex-col mt-5">
                        <div className="w-full flex flex-col lg:flex-row gap-4">
                            <TextInput value={tag?.name || ''} onChange={handleChangeName} label='عنوان دسته بندی : ' placeholder={"مثل جلسه کاری..."} />
                            <span className="lg:w-80">
                                <SelectInput type="tag" selected={item?.icon || null} onChange={handleChangeIcon} items={tagIcons} label='آیکون : ' />
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

export default AddAndEditTag