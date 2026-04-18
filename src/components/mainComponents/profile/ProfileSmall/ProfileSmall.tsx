import Image from "next/image"
import profileImg from "./../../../../assets/img/profile.jpg";

const ProfileSmall = () => {

    return(
        <>
            <div className={`w-full flex items-center justify-center gap-1 cursor-pointer`}>
        
                <div className={`w-8 h-8 rounded-full overflow-hidden shadow-sm border-2 border-blue-200 p-1`}>
                    <Image
                        src={profileImg}
                        alt="profile"
                        className="w-full h-full object-cover rounded-full"
                    />
                </div>

                <div className="flex items-center gap-1">
                    <svg className="opacity-50" width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M18.5303 9.46967C18.8232 9.76256 18.8232 10.2374 18.5303 10.5303L12.5303 16.5303C12.2374 16.8232 11.7626 16.8232 11.4697 16.5303L5.46967 10.5303C5.17678 10.2374 5.17678 9.76256 5.46967 9.46967C5.76256 9.17678 6.23744 9.17678 6.53033 9.46967L12 14.9393L17.4697 9.46967C17.7626 9.17678 18.2374 9.17678 18.5303 9.46967Z" fill="currentColor"/>
                    </svg>
                </div>

            </div>
        </>
    )
}

export default ProfileSmall