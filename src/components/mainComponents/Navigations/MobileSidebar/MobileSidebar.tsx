'use client'
import { useEffect, useRef } from 'react'
import ProfileLarg from '../../profile/ProfileLarg/ProfileLarg'
import SideBar from '../../SideBar/SideBar'
import styled from './aimation.module.css'

interface Props {
    onClose: () => void
}

const MobileSidebar = ({onClose}: Props) => {

    const boxRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
                onClose()
            }
        }
    
        document.addEventListener("mousedown", handleClickOutside)
    
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return(
        <>
            <div  className={`w-full h-full h-23 absolute top-0 right-0 bg-black/50 z-9999999 ${styled.overlayAnimation}`}>
                <div ref={boxRef} className={`w-80 h-full absolute top-0 right-0 bg-white p-4 z-9999999 ${styled.boxAnimation}`}>
                    <div
                    className={`w-full mb-5 p-2 border-b-1 border-gray-200 text-gray-800 flex items-center justify-between `}
                    >
                        <div className="flex items-center gap-1">
                            <svg width="24" height="24" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="60" cy="60" r="50" fill="#4F46E5"/>
                                <path d="M38 62L52 76L82 46" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
                                <rect x="30" y="30" width="40" height="6" rx="3" fill="white" opacity="0.6"/>
                            </svg>
                            <span  className="text-sm font-bold">تسک لــی</span>
                        </div>
                        <span onClick={onClose} style={{width: '28px', height: "28px"}} className="flex items-center justify-center p-1 rounded border-1 border-gray-300 bg-gray-100">
                            <svg width="24" height="24" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.58859 3.10681L2.64645 3.03756C2.82001 2.86399 3.08944 2.84471 3.28431 2.9797L3.35355 3.03756L8 7.68411L12.6464 3.03756C12.8417 2.8423 13.1583 2.8423 13.3536 3.03756C13.5488 3.23282 13.5488 3.5494 13.3536 3.74467L8.707 8.39111L13.3536 13.0376C13.5271 13.2111 13.5464 13.4806 13.4114 13.6754L13.3536 13.7447C13.18 13.9182 12.9106 13.9375 12.7157 13.8025L12.6464 13.7447L8 9.09811L3.35355 13.7447C3.15829 13.9399 2.84171 13.9399 2.64645 13.7447C2.45118 13.5494 2.45118 13.2328 2.64645 13.0376L7.293 8.39111L2.64645 3.74467C2.47288 3.5711 2.4536 3.30168 2.58859 3.10681L2.64645 3.03756L2.58859 3.10681Z" fill="currentColor"/>
                            </svg>
                        </span>
                    </div>
                    <ProfileLarg size='small' />
                    <div onClick={onClose}>
                        <SideBar size='small' />
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default MobileSidebar