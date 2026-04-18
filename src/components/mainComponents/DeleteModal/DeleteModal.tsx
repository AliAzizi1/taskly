import Button from "../Button/Button"

interface Props {
    onClose: () => void
    success: () => void
    name: string
}

const DeleteModal = ({ onClose, success, name}: Props) => {
    
    
    return(
        <>
            <div className="fixed z-1002 inset-0 bg-black/50 flex items-center justify-center">
                <div onClick={(e) =>{
                    e.stopPropagation()
                }} className="w-90 lg:w-100 bg-white p-6 rounded-lg">
                    <div className="w-full flex flex-col gap-2 items-center justify-between pb-2 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 64 64">
                            <path d="
                                M32 6
                                C36 6 38 8 40 12
                                L58 48
                                C60 52 57 56 52 56
                                L12 56
                                C7 56 4 52 6 48
                                L24 12
                                C26 8 28 6 32 6
                                Z
                            " fill="#ff07070f"/>
                            <rect x="30" y="24" width="4" height="18" rx="2" fill="#ff4747"/>
                            <circle cx="32" cy="47" r="3" fill="#ff4747"/>
                        </svg>

                        <span className="font-bold">حذف {name}</span>
                        <span className="opacity-50 text-center">آیا از حذف {name}  اطمینان دارید؟ این عمل قابل بازگشت نیست.</span>
                        {/* <span onClick={onClose} className="p-1 flex items-center jstify-center bg-red-50 hover:bg-red-100 cursor-pointer rounded">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.22676 4.22676C4.5291 3.92441 5.01929 3.92441 5.32163 4.22676L12 10.9051L18.6784 4.22676C18.9807 3.92441 19.4709 3.92441 19.7732 4.22676C20.0756 4.5291 20.0756 5.01929 19.7732 5.32163L13.0949 12L19.7732 18.6784C20.0756 18.9807 20.0756 19.4709 19.7732 19.7732C19.4709 20.0756 18.9807 20.0756 18.6784 19.7732L12 13.0949L5.32163 19.7732C5.01929 20.0756 4.5291 20.0756 4.22676 19.7732C3.92441 19.4709 3.92441 18.9807 4.22676 18.6784L10.9051 12L4.22676 5.32163C3.92441 5.01929 3.92441 4.5291 4.22676 4.22676Z" fill="#ab0606"/>
                            </svg>
                        </span> */}
                    </div>
                    <div className="w-full flex flex-row gap-2 items-center justify-end font-bold pt-4 mt-2 border-t-1 border-gray-200">
                        <Button color="" cancel={true} name="لغو" icon="noIcon" onClick={onClose} />
                        <Button color="red" cancel={false} name={"حذف شود"} icon={'tick'} onClick={success} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeleteModal