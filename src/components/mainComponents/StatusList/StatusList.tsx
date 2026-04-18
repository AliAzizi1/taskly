'use client'

import { useSetting } from "@/app/context/SettingTask"
import { useEffect, useState } from "react"
import AddAndEditTag from "@/app/tags/AddAndEditTag/AddAndEditTag"
import { tagIcons } from "@/app/tags/tagIcons/tagIcons"
import Button from "../Button/Button"
import AddAndEditStatus from "@/app/status/AddAndEditStatus/AddAndEditStatus"
import DeleteModal from "../DeleteModal/DeleteModal"
import { statusIcons } from "@/app/status/statusIcons/statusIcons"
import SuccessAlert from "../Alert/SuccessAlert/SuccessAlert"
import FailedAlert from "../Alert/FailedAlert/FailedAlert"


type SettingItems = {
    id: string,
    name: string | null,
    icon: number | null
}

interface ShowMessage {
    type: string
    show: boolean
    text: string
}


const StatusList = () => {
    const { removeStatus, status } = useSetting()

    const[newStatus, setNewStatus] = useState<boolean>(false)
    const[editStatus, setEditStatus] = useState<SettingItems | null>(null)
    const [isEdit, setIsEdit] = useState<boolean>(false)

    const [deleteModal, setDeleteModal] = useState<boolean>(false)
    const [deleteItem, setDeleteItem] = useState<SettingItems | null>(null)

    const [showMessage, setShowMessage] = useState<ShowMessage>({
        type: "success",
        show: false,
        text: ''
    })

    const endSend = (type: string) => {
        setIsEdit(false);
        setEditStatus(null)
        if(type === 'add' || type === 'edit') {
            setShowMessage({
            type: "success",
            show: true,
            text: type === 'add' ? 'اضافه کردن وضعیت'  : 'ویرایش وضعیت'
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
            <div className="h-full">
                <div className="w-full flex items-center justify-between pb-4 mb-4 border-b-1 border-gray-200">
                    <span className="font-bold">همه وضعیت ها</span>
                    <Button color="green" name="وضعیت جدید" icon="add" onClick={() => setNewStatus(true)} cancel={false} />
                </div>
                <div className="w-full lg:h-full lg:overflow-auto pl-2">
                    <table className="table text-sm w-full border-separate border-spacing-y-4">
                        <thead className="sticky top-0 bg-white z-10">
                            <tr className="text-right">
                                <th className="p-2 text-sm text-gray-500 border-b-1 border-gray-200 font-normal">عنوان وضعیت</th>
                                <th className="p-2 text-sm text-gray-500 border-b-1 border-gray-200 font-normal">آیکون</th>
                                <th className="p-2 text-sm text-gray-500 border-b-1 border-gray-200 font-normal">عملیات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {status &&  status.length > 0 ? status?.map((item) => (
                                <tr key={item.id} style={{boxShadow: "0 0 30px #0000000d"}} className="text-right border-1 border-gray-200 rounded">
                                    <th className="p-3 w-200">{item?.name || null}</th>
                                    <th className="p-3 w-50">
                                        {statusIcons.find(i => i.id === item.icon)?.value}
                                    </th>
                                    <th className="p-3 flex items-center gap-2">
                                        <button onClick={() => {setEditStatus(item ? item : null); setNewStatus(true); setIsEdit(true)}} className="flex items-center justify-center p-2 rounded bg-blue-600 hover:bg-blue-800 text-white cursor-pointer">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 20H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M16.5 3.5C16.8978 3.10217 17.4374 2.87868 18 2.87868C18.2786 2.87868 18.5544 2.93355 18.8118 3.04015C19.0692 3.14676 19.303 3.30301 19.5 3.5C19.697 3.69698 19.8532 3.93083 19.9598 4.1882C20.0665 4.44557 20.1213 4.72142 20.1213 5C20.1213 5.27857 20.0665 5.55442 19.9598 5.81179C19.8532 6.06916 19.697 6.30301 19.5 6.5L7 19L3 20L4 16L16.5 3.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        </button>
                                        <button onClick={() => {setDeleteItem(item) ;setDeleteModal(true)}} className="flex items-center justify-center p-2 rounded bg-red-500 hover:bg-red-700 text-white cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M3 6h18"/>
                                                <path d="M8 6V4h8v2"/>
                                                <path d="M19 6l-1 14H6L5 6"/>
                                                <path d="M10 11v6"/>
                                                <path d="M14 11v6"/>
                                            </svg>
                                        </button>
                                    </th>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={3} className="text-center opacity-50 p-4">
                                        هیچ آیتمی موجود نیست
                                    </td>
                                </tr>
                            )}
                            
                        </tbody>
                    </table>
                </div>
            </div>

            {newStatus && (
                <AddAndEditStatus endSend={endSend} isEdit={isEdit} item={editStatus || null} onClose={() => {setNewStatus(false); endSend('')}} />
            )}

            {deleteModal && (
                <DeleteModal 
                    name={deleteItem?.name || ''} 
                    onClose={() => setDeleteModal(false)} 
                    success={() => {
                        removeStatus(deleteItem?.id || ''); 
                        setDeleteModal(false)
                        setShowMessage({
                            type: "success",
                            show: true,
                            text: 'حذف وضعیت'
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

export default StatusList