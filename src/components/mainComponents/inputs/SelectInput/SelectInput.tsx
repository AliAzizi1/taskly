'use client'

import { statusIcons } from "@/app/status/statusIcons/statusIcons"
import { tagIcons } from "@/app/tags/tagIcons/tagIcons"
import { userIcons } from "@/app/users/userIcons/userIcons"
import { useState, useRef, useEffect } from "react"

interface props {
    selected: number | string | null
    label: string
    items: any[]
    type: string
    onChange: (value: any) => void
}

interface SelectedItem {
    id: string,
    value: any,
    name: string,
    icon: number
}

const SelectInput = ({ label, items, onChange, selected, type}: props) => {

    const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null)
    const [open, setOpen] = useState<boolean>(false)
    const ref = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if(selected) {
            setSelectedItem(items.find(i => i.id === selected))
        }
    }, [])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <div ref={ref} className="relative w-full flex flex-col gap-2">
            <span className="text-sm">{label}</span>

            <div
                onClick={() => setOpen(prev => !prev)}
                className="relative text-sm p-2 flex items-center justify-between border border-gray-200 hover:border-gray-400 shadow-md rounded text-sm cursor-pointer"
            >
                {selectedItem ? (
                    <span className="w-full flex items-center gap-1">
                        {
                            type === 'user' ? (userIcons.find(i => i.id === selectedItem.icon)?.value) :
                            type === 'tag' ? (tagIcons.find(i => i.id === selectedItem.icon)?.value) :
                            type === 'status' ? (statusIcons.find(i => i.id === selectedItem.icon)?.value) : null

                        }
                        <span className="text-blue-900">{selectedItem?.value || selectedItem?.name}</span>
                    </span>
                    
                ) : (
                    <span className="text-blue-900">یک آیتم انتخاب کنید</span>
                )}
                

                <span className="flex items-center justify-center opacity-50">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M18.5303 9.46967C18.8232 9.76256 18.8232 10.2374 18.5303 10.5303L12.5303 16.5303C12.2374 16.8232 11.7626 16.8232 11.4697 16.5303L5.46967 10.5303C5.17678 10.2374 5.17678 9.76256 5.46967 9.46967C5.76256 9.17678 6.23744 9.17678 6.53033 9.46967L12 14.9393L17.4697 9.46967Z"
                            fill="#030D45"
                        />
                    </svg>
                </span>
            </div>

            {open && (
                <div className="w-full max-h-50 overflow-y-auto flex flex-col gap-2 z-100 p-3 shadow-md absolute top-20 right-0 bg-white rounded">
                    {items.length> 0 ? items.map(item => (
                        <span key={item.id} onClick={() => {
                            setSelectedItem(item)
                            onChange(item)
                            setOpen(false)
                        }} 
                        className={`w-full p-1 ${selectedItem?.id === item.id ? 'bg-blue-500 text-white' : 'bg-gray-100'} text-sm flex items-center gap-1 rounded cursor-pointer`}
                        >
                            {
                                type === 'user' ? (userIcons.find(i => i.id === item.icon)?.value) :
                                type === 'tag' ? (tagIcons.find(i => i.id === item.icon)?.value) :
                                type === 'status' ? (statusIcons.find(i => i.id === item.icon)?.value) : null
                            }
                            {item.value || item.name}
                        </span>
                    )) : (
                        <span className="w-full text-sm opacity-50">هیچ آیتمی وجود ندارد</span>
                    )}
                </div>
            )}
        </div>
    )
}

export default SelectInput

