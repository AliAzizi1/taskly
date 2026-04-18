'use client'
import { useSetting } from "@/app/context/SettingTask"
import { useTask } from "@/app/context/TaskContext"
import { tagIcons } from "@/app/tags/tagIcons/tagIcons"
import { useRouter } from "next/navigation"
import React, { useRef, useState, useEffect } from "react"

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

const Searchox = () =>{

    const [open, setOpen] = useState<boolean>(false)
    const [searchKey, setSearchKey] = useState<string>('')
    const [findItemns, setFindItemns] = useState<Task[] | null>(null)

    const { tasks } = useTask()
    const { tags } = useSetting()

    const router = useRouter()

    const boxRef = useRef<HTMLDivElement | null>(null)

    useEffect(()=> {
        if(searchKey) {
            setFindItemns(tasks.filter(i => i.title?.includes(searchKey)))
        } else {
            setFindItemns(null)
        }
    }, [searchKey])


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
                setOpen(false)
            }
        }
    
        document.addEventListener("mousedown", handleClickOutside)
    
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return(
        <>
            <div className="p-2 z-99999 rounded shadow-sm flex items-center gap-2 relative">
                <svg className="opacity-50" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M11.4872 3.53846C7.09639 3.53846 3.53846 7.09356 3.53846 11.4771C3.53846 15.8607 7.09639 19.4158 11.4872 19.4158C13.6777 19.4158 15.6599 18.5318 17.0983 17.1C18.5433 15.6617 19.4359 13.6742 19.4359 11.4771C19.4359 7.09356 15.878 3.53846 11.4872 3.53846ZM2 11.4771C2 6.24221 6.24839 2 11.4872 2C16.726 2 20.9744 6.24221 20.9744 11.4771C20.9744 13.8225 20.1207 15.9697 18.7083 17.624L21.7744 20.6865C22.075 20.9868 22.0752 21.4738 21.775 21.7744C21.4748 22.075 20.9877 22.0752 20.6872 21.775L17.6182 18.7096C15.965 20.1093 13.8242 20.9542 11.4872 20.9542C6.24839 20.9542 2 16.712 2 11.4771Z" fill="#1B1B1B"/>
                </svg>
                <input 
                    onFocus={() => setOpen(true)} 
                    onChange={(e) => {
                        setSearchKey(e.target.value)
                    }} 
                    className="outline-none text-xs "
                    value={searchKey} 
                    type="search"  
                    placeholder="کار موردنظر را جستجو کنید..."
                />
                {open && (
                    <div tabIndex={0} ref={boxRef} className="absolute top-10 right-0 bg-white w-80 lg:w-150 p-4 rounded shadow-lg">
                        <div className="w-full flex flex-col gap-2 max-h-56 overflow-y-auto pl-2">
                            <span className="text-xs sticky top-0 bg-white p-1">ایتم های پیدا شده :</span>
                            {findItemns ? findItemns.map(item => (
                                <span onClick={() => {router.push(`/showTask/${item.id}`); setOpen(false)}} className="text-xs cursor-pointer p-2 rounded border-1 border-gray-200 flex items-center gap-2 justify-between">
                                    <span className="font-bold">{item.title}</span>
                                    <svg className="opacity-50" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.5303 18.5303C14.2374 18.8232 13.7626 18.8232 13.4697 18.5303L7.46967 12.5303C7.17678 12.2374 7.17678 11.7626 7.46967 11.4697L13.4697 5.46967C13.7626 5.17678 14.2374 5.17678 14.5303 5.46967C14.8232 5.76256 14.8232 6.23744 14.5303 6.53033L9.06066 12L14.5303 17.4697C14.8232 17.7626 14.8232 18.2374 14.5303 18.5303Z" fill="#1B1B1B"/>
                                    </svg>
                                </span>
                            )) : (
                                <span className="text-xs opacity-50">ایتمی پیدا نشد</span>
                            )}
                        </div>
                        <div className="mt-2 text-sm pt-2 border-t-1 border-gray-200 w-full flex flex-col gap-2 ">
                            <span className="text-xs sticky top-0 bg-white p-1">دسته بندی ها :</span>
                            <div className="w-full flex items-center gap-2 flex-wrap">
                                {tags?.map(item => (
                                    <div onClick={() => {router.push(`/tagList/${item.id}`); setOpen(false)}} className="flex items-center gap-1 py-1 px-3 bg-gray-50 border-1 border-gray-200 hover:bg-gray-100 cursor-pointer rounded">
                                        {tagIcons.find(i => i.id === (tags?.find(i => i.id === item.id)?.icon))?.value}
                                        <span>{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                
            </div>
        </>
    )
}

export default Searchox