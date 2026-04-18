import { usePathname } from "next/navigation"
import { sidebarIcons } from "../icons/sidebarIcons"
import { useRouter } from "next/navigation"
import { tagIcons } from "@/app/tags/tagIcons/tagIcons"
import { useSetting } from "@/app/context/SettingTask"

type props ={
    isOpen : boolean,
    pathName: string,
    name: string,
    subMenu: boolean,
}

const SideBarItem = ({isOpen, pathName, name, subMenu} : props) => {

    const currntPath = usePathname();
    const router = useRouter();

    const { tags } = useSetting()

    return(
        <div title={name} onClick={() => router.push(pathName)} className={`w-full mb-2 flex items-center gap-2 cursor-pointer
            ${pathName === currntPath ? '': 'hover:bg-gray-100'}
            ${isOpen ? 'justify-between': 'justify-center'}
            ${(pathName === currntPath && isOpen) ? 'bg-blue-600': 'bg-white'}
            ${(pathName === currntPath && !isOpen) ? 'border-b-2 border-blue-500': ''}
            ${(isOpen) ? 'rounded': ''}
            ${isOpen ? 'p-2': 'p-1'}
            ${pathName === currntPath ? isOpen ? 'text-white': '' : 'text-gray-500'}
            `}>
                <div className="flex items-center gap-2">
                    {
                        pathName === '/' ?  sidebarIcons.dashboard :
                        pathName === '/saved' ?  sidebarIcons.saved :
                        pathName === '/done' ?  sidebarIcons.done :
                        pathName === '/noDone' ?  sidebarIcons.noDone :
                        pathName === '/performing' ?  sidebarIcons.performing :
                        pathName === '/tags' ?  sidebarIcons.tag :
                        pathName === '/users' ?  sidebarIcons.users :
                        pathName === '/status' ?  sidebarIcons.status : null
                    }
                    {tagIcons.find(i => i.id === (tags?.find(i => i.id === pathName.slice(9))?.icon))?.value}
                    {isOpen && (
                        <span className={`text-sm`}>{name}</span>
                    )}
                </div>
            {isOpen && subMenu && (
                <span className={`flex items-center justify-center opacity-50`}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M18.5303 9.46967C18.8232 9.76256 18.8232 10.2374 18.5303 10.5303L12.5303 16.5303C12.2374 16.8232 11.7626 16.8232 11.4697 16.5303L5.46967 10.5303C5.17678 10.2374 5.17678 9.76256 5.46967 9.46967C5.76256 9.17678 6.23744 9.17678 6.53033 9.46967L12 14.9393L17.4697 9.46967C17.7626 9.17678 18.2374 9.17678 18.5303 9.46967Z" fill="currentColor"/>
                    </svg>
                </span>
            )}
        </div>
    )
} 

export default SideBarItem