
interface Props {
    onClose: () => void
    children: React.ReactNode
    name: string
    size: number
}

const Modal = ({children, onClose, name, size}: Props) => {
    
    if(size === 200) {
        return(
            <>
                <div className="fixed z-1002 inset-0 bg-black/50 flex items-center justify-center">
                    <div onClick={(e) =>{
                        e.stopPropagation()
                    }} className={`w-full lg:w-200 bg-white p-6 rounded-lg`}>
                        <div className="w-full flex flex-row items-center justify-between font-bold pb-2 mb-2 border-b-1 border-gray-200">
                            <span className="">{name}</span>
                            <span onClick={onClose} className="p-1 flex items-center jstify-center bg-red-50 hover:bg-red-100 cursor-pointer rounded">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.22676 4.22676C4.5291 3.92441 5.01929 3.92441 5.32163 4.22676L12 10.9051L18.6784 4.22676C18.9807 3.92441 19.4709 3.92441 19.7732 4.22676C20.0756 4.5291 20.0756 5.01929 19.7732 5.32163L13.0949 12L19.7732 18.6784C20.0756 18.9807 20.0756 19.4709 19.7732 19.7732C19.4709 20.0756 18.9807 20.0756 18.6784 19.7732L12 13.0949L5.32163 19.7732C5.01929 20.0756 4.5291 20.0756 4.22676 19.7732C3.92441 19.4709 3.92441 18.9807 4.22676 18.6784L10.9051 12L4.22676 5.32163C3.92441 5.01929 3.92441 4.5291 4.22676 4.22676Z" fill="#ab0606"/>
                                </svg>
                            </span>
                        </div>
                        {children}
                    </div>
                </div>
            </>
        )
    } else if(size === 150) {
        return(
            <>
                <div className="fixed z-1002 inset-0 bg-black/50 flex items-center justify-center">
                    <div onClick={(e) =>{
                        e.stopPropagation()
                    }} className={`w-full lg:w-150 bg-white p-6 rounded-lg`}>
                        <div className="w-full flex flex-row items-center justify-between font-bold pb-2 mb-2 border-b-1 border-gray-200">
                            <span className="">{name}</span>
                            <span onClick={onClose} className="p-1 flex items-center jstify-center bg-red-50 hover:bg-red-100 cursor-pointer rounded">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.22676 4.22676C4.5291 3.92441 5.01929 3.92441 5.32163 4.22676L12 10.9051L18.6784 4.22676C18.9807 3.92441 19.4709 3.92441 19.7732 4.22676C20.0756 4.5291 20.0756 5.01929 19.7732 5.32163L13.0949 12L19.7732 18.6784C20.0756 18.9807 20.0756 19.4709 19.7732 19.7732C19.4709 20.0756 18.9807 20.0756 18.6784 19.7732L12 13.0949L5.32163 19.7732C5.01929 20.0756 4.5291 20.0756 4.22676 19.7732C3.92441 19.4709 3.92441 18.9807 4.22676 18.6784L10.9051 12L4.22676 5.32163C3.92441 5.01929 3.92441 4.5291 4.22676 4.22676Z" fill="#ab0606"/>
                                </svg>
                            </span>
                        </div>
                        {children}
                    </div>
                </div>
            </>
        )
    }
}

export default Modal