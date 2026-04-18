import styled from '../FailedAlert/animation.module.css'

interface Props{
    title: string
}

const SuccessAlert = ({title}: Props) => {

    return(
        <>
            <div className={`${styled.alertAnimation} absolute bottom-8 right-8 py-3 px-4 bg-white shadow-lg z-9999 rounded flex gap-2 border-r-3 border-green-600`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 64 64">
                    <circle cx="32" cy="32" r="30" fill="#00a63e"/>
                    <path d="M20 33l8 8 16-18" stroke="#ffffff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                </svg>
                <div className="text-sm font-bold">{title} موفق بود.</div>
            </div>
        </>
    )
}

export default SuccessAlert