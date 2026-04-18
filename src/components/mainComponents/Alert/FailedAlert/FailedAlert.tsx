import styled from './animation.module.css'

interface Props{
    title: string
}

const FailedAlert = ({title} : Props) => {

    return(
        <>
            <div className={`${styled.alertAnimation} absolute bottom-8 right-8 py-3 px-4 bg-white shadow-lg z-9999 rounded flex gap-2 border-r-3 border-red-600`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 64 64">
                    <circle cx="32" cy="32" r="30" fill="#F44336"/>
                    <path d="M22 22l20 20M42 22L22 42" stroke="#ffffff" stroke-width="6" stroke-linecap="round"/>
                </svg>
                <div className="text-sm font-bold">{title} ناموفق بود.</div>
            </div>
        </>
    )
}

export default FailedAlert