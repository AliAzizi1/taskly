import Image from "next/image";
import profileImg from "./../../../../assets/img/profile.jpg";

interface Props {
  size: string
}

const ProfileLarg = ({size}: Props) => {
  
  if(size === 'larg') {
    return (
      <div className={`pt-3 pb-6 w-full flex items-center justify-center flex-col gap-2`}>
        
        <div className={`w-20 h-20 rounded-full shadow-sm border-2 border-blue-200 p-1 relative`}>
          <Image
              src={profileImg}
              alt="profile"
              className="w-full h-full object-cover rounded-full"
          />
          <span className="absolute flex items-center justify-center shadow-sm top-12 left-12 bg-white w-6 h-6 rounded cursor-pointer">
            <svg className="opacity-50" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 20H21" stroke="#1a2dfb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16.5 3.5C16.8978 3.10217 17.4374 2.87868 18 2.87868C18.2786 2.87868 18.5544 2.93355 18.8118 3.04015C19.0692 3.14676 19.303 3.30301 19.5 3.5C19.697 3.69698 19.8532 3.93083 19.9598 4.1882C20.0665 4.44557 20.1213 4.72142 20.1213 5C20.1213 5.27857 20.0665 5.55442 19.9598 5.81179C19.8532 6.06916 19.697 6.30301 19.5 6.5L7 19L3 20L4 16L16.5 3.5Z" stroke="#1a2dfb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>

        <div className="flex items-center gap-1 cursor-pointer">
            <span>علی عزیزی</span>
          <svg className="opacity-50" width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M18.5303 9.46967C18.8232 9.76256 18.8232 10.2374 18.5303 10.5303L12.5303 16.5303C12.2374 16.8232 11.7626 16.8232 11.4697 16.5303L5.46967 10.5303C5.17678 10.2374 5.17678 9.76256 5.46967 9.46967C5.76256 9.17678 6.23744 9.17678 6.53033 9.46967L12 14.9393L17.4697 9.46967C17.7626 9.17678 18.2374 9.17678 18.5303 9.46967Z" fill="currentColor"/>
          </svg>
        </div>

      </div>
    );
  } else {
    return (
      <div className={`pt-3 pb-2 w-full flex items-center justify-center flex-col gap-2`}>
        
        <div className={`w-20 h-20 rounded-full shadow-sm border-2 border-blue-200 p-1 relative`}>
          <Image
              src={profileImg}
              alt="profile"
              className="w-full h-full object-cover rounded-full"
          />
          <span className="absolute flex items-center justify-center shadow-sm top-12 left-12 bg-white w-6 h-6 rounded cursor-pointer">
            <svg className="opacity-50" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 20H21" stroke="#1a2dfb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16.5 3.5C16.8978 3.10217 17.4374 2.87868 18 2.87868C18.2786 2.87868 18.5544 2.93355 18.8118 3.04015C19.0692 3.14676 19.303 3.30301 19.5 3.5C19.697 3.69698 19.8532 3.93083 19.9598 4.1882C20.0665 4.44557 20.1213 4.72142 20.1213 5C20.1213 5.27857 20.0665 5.55442 19.9598 5.81179C19.8532 6.06916 19.697 6.30301 19.5 6.5L7 19L3 20L4 16L16.5 3.5Z" stroke="#1a2dfb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>

        <div className="flex items-center gap-1 cursor-pointer">
            <span>علی عزیزی</span>
          <svg className="opacity-50" width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M18.5303 9.46967C18.8232 9.76256 18.8232 10.2374 18.5303 10.5303L12.5303 16.5303C12.2374 16.8232 11.7626 16.8232 11.4697 16.5303L5.46967 10.5303C5.17678 10.2374 5.17678 9.76256 5.46967 9.46967C5.76256 9.17678 6.23744 9.17678 6.53033 9.46967L12 14.9393L17.4697 9.46967C17.7626 9.17678 18.2374 9.17678 18.5303 9.46967Z" fill="currentColor"/>
          </svg>
        </div>

      </div>
    );
  }
  
};

export default ProfileLarg;
