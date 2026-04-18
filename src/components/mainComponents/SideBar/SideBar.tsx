"use client";

import { useState } from "react";
import SideBarItem from "./SideBarItem/SideBarItem";
import ProfileLarg from "../profile/ProfileLarg/ProfileLarg";
import { useSetting } from "@/app/context/SettingTask";

interface Props {
  size: string
}
const SideBar = ({size}: Props) => {
  const [open, setOpen] = useState(true);

  const { tags } = useSetting()

  if(size === 'larg') {
    return (
    <div className={`${open ? 'w-full lg:w-1/6' : 'w-14'} lg:flex hidden`}>

      <aside
        className={`bg-white shadow-lg border-1 border-gray-200 text-white transition-all duration-300 rounded p-2
        ${open ? "w-full" : "w-14"}`}
      >
        <button
          className={`w-full p-2 border-b-1 border-gray-200 text-gray-800 flex items-center ${open ? 'justify-between' : 'justify-center'} `}
        >
            

          {open && (
            <div className="flex items-center gap-1">
                <svg width="24" height="24" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="60" cy="60" r="50" fill="#4F46E5"/>
                    <path d="M38 62L52 76L82 46" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="30" y="30" width="40" height="6" rx="3" fill="white" opacity="0.6"/>
                </svg>
                <span className="text-sm font-bold">تسک لــی</span>
            </div>
          )}
          <span onClick={() => setOpen(!open)} className="hover:cursor-pointer">
            {open ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M9.46967 5.46967C9.76256 5.17678 10.2374 5.17678 10.5303 5.46967L16.5303 11.4697C16.8232 11.7626 16.8232 12.2374 16.5303 12.5303L10.5303 18.5303C10.2374 18.8232 9.76256 18.8232 9.46967 18.5303C9.17678 18.2374 9.17678 17.7626 9.46967 17.4697L14.9393 12L9.46967 6.53033C9.17678 6.23744 9.17678 5.76256 9.46967 5.46967Z" fill="#030D45"/>
                </svg>
            ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M14.5303 18.5303C14.2374 18.8232 13.7626 18.8232 13.4697 18.5303L7.46967 12.5303C7.17678 12.2374 7.17678 11.7626 7.46967 11.4697L13.4697 5.46967C13.7626 5.17678 14.2374 5.17678 14.5303 5.46967C14.8232 5.76256 14.8232 6.23744 14.5303 6.53033L9.06066 12L14.5303 17.4697C14.8232 17.7626 14.8232 18.2374 14.5303 18.5303Z" fill="#030D45"/>
                </svg>
            )}
          </span>
        </button>

        
        <div className="p-2 pt-5 text-black">
            {open && (
                <ProfileLarg size="larg" />
            )}
            <div className="w-full flex flex-col">
                <SideBarItem name="داشبورد" isOpen={open} pathName={'/'} subMenu={false} />
                <SideBarItem name="کارهای ذخیره شده" isOpen={open} pathName={'/saved'} subMenu={false} />
                {open && (
                    <span className="text-sm mt-1 mb-2 text-red-800">دسته بندی ها</span>
                )}
                <div className="w-fuul lg:max-h-64 lg:overflow-y-auto">
                    {tags ? tags.map(item => (
                        <SideBarItem name={item.name || ''} isOpen={open} pathName={`/tagList/${item.id}`} subMenu={false} />
                    )) : (
                      <span className="text-sm opacity-50">هیچ ایتمی نیست!</span>
                    )}
                </div>
                {/* <SideBarItem name="کارهای انجام شده" isOpen={open} pathName={'/done'} subMenu={false} />
                <SideBarItem name="کارهای انجام نشده" isOpen={open} pathName={'/noDone'} subMenu={false} />
                <SideBarItem name="کارهای درحال انجام" isOpen={open} pathName={'/performing'} subMenu={false} /> */}
                {open && (
                    <span className="text-sm mt-1 mb-2 text-red-800">مدیریت</span>
                )}
                <SideBarItem name="دسته بندی ها" isOpen={open} pathName={'/tags'} subMenu={false} />
                <SideBarItem name="وضعیت ها" isOpen={open} pathName={'/status'} subMenu={false} />
                <SideBarItem name="کاربر ها" isOpen={open} pathName={'/users'} subMenu={false} />
            </div>
        </div>
      </aside>

    </div>
  );
  } else{
    return (
    <div className={`${open ? 'w-full lg:w-1/6' : 'w-12'} flex max-h-190 overflow-y-auto`}>

      <aside
        className={`bg-white text-white transition-all duration-300 rounded p-2
        ${open ? "w-full" : "w-12"}`}
      >
        
        <div className="p-2 text-black">
            <div className="w-full flex flex-col">
                <SideBarItem name="داشبورد" isOpen={open} pathName={'/'} subMenu={false} />
                <SideBarItem name="کارهای ذخیره شده" isOpen={open} pathName={'/saved'} subMenu={false} />
                {open && (
                    <span className="text-sm mt-1 mb-2 text-red-800">دسته بندی ها</span>
                )}
                <div className="w-fuul">
                    {tags?.map(item => (
                        <SideBarItem name={item.name || ''} isOpen={open} pathName={`/tagList/${item.id}`} subMenu={false} />
                    ))}
                </div>
                {/* <SideBarItem name="کارهای انجام شده" isOpen={open} pathName={'/done'} subMenu={false} />
                <SideBarItem name="کارهای انجام نشده" isOpen={open} pathName={'/noDone'} subMenu={false} />
                <SideBarItem name="کارهای درحال انجام" isOpen={open} pathName={'/performing'} subMenu={false} /> */}
                {open && (
                    <span className="text-sm mt-1 mb-2 text-red-800">مدیریت</span>
                )}
                <SideBarItem name="دسته بندی ها" isOpen={open} pathName={'/tags'} subMenu={false} />
                <SideBarItem name="وضعیت ها" isOpen={open} pathName={'/status'} subMenu={false} />
                <SideBarItem name="کاربر ها" isOpen={open} pathName={'/users'} subMenu={false} />
            </div>
        </div>
      </aside>

    </div>
  );
  }
}


export default SideBar