import { buttonIcon } from "./buttonIcon/buttonIcon"

type props = {
    cancel: boolean,
    name: string,
    icon: string,
    color: string
    onClick: () => void
}

const colors: any = {
  red: "bg-red-600 hover:bg-red-800",
  blue: "bg-blue-600 hover:bg-blue-800",
  green: "bg-green-600 hover:bg-green-800",
  yellow: "bg-yellow-600 hover:bg-yellow-800",
}

const Button = ({name, icon, onClick, cancel, color} : props) => {

    if(cancel) {
        return(
            <button onClick={onClick} className="flex transition duration-300 hover:scale-105 items-center justify-center gap-1 bg-gray-600 text-white p-2 lg:py-1 lg:px-3 rounded cursor-pointer hover:bg-gray-800 text-sm whitespace-nowrap">
                {
                    icon === 'new' ? buttonIcon.new :
                    icon === 'tick' ? buttonIcon.tick :
                    icon === 'back' ? buttonIcon.back :
                    icon === 'edit' ? buttonIcon.edit :
                    icon === 'delete' ? buttonIcon.delete :
                    icon === 'add' ? buttonIcon.add : null
                }
                <span>{name}</span>
            </button>  
        )
    } else {
        if(color === 'red') {
            return(
                <button onClick={onClick} className={`flex transition duration-300 hover:scale-105 items-center justify-center gap-1 bg-red-600 text-white p-2 lg:py-1 lg:px-3 rounded cursor-pointer hover:bg-red-800 text-sm whitespace-nowrap`}>
                    {
                        icon === 'new' ? buttonIcon.new :
                        icon === 'tick' ? buttonIcon.tick :
                        icon === 'back' ? buttonIcon.back :
                        icon === 'edit' ? buttonIcon.edit :
                        icon === 'delete' ? buttonIcon.delete :
                        icon === 'add' ? buttonIcon.add : null
                    }
                    <span className="hidden lg:inline-block">{name}</span>
                </button>  
            )
        } else if(color === 'blue'){
            return(
                <button onClick={onClick} className={`flex transition duration-300 hover:scale-105 items-center justify-center gap-1 bg-blue-600 text-white p-2 lg:py-1 lg:px-3 rounded cursor-pointer hover:bg-blue-800 text-sm whitespace-nowrap`}>
                    {
                        icon === 'new' ? buttonIcon.new :
                        icon === 'tick' ? buttonIcon.tick :
                        icon === 'back' ? buttonIcon.back :
                        icon === 'edit' ? buttonIcon.edit :
                        icon === 'delete' ? buttonIcon.delete :
                        icon === 'add' ? buttonIcon.add : null
                    }
                    <span className="hidden lg:inline-block">{name}</span>
                </button>  
            )
        } else if(color === 'green'){
            return(
                <button onClick={onClick} className={`flex transition duration-300 hover:scale-105 items-center justify-center gap-1 bg-green-600 text-white p-2 lg:py-1 lg:px-3 rounded cursor-pointer hover:bg-green-800 text-sm whitespace-nowrap`}>
                    {
                        icon === 'new' ? buttonIcon.new :
                        icon === 'tick' ? buttonIcon.tick :
                        icon === 'back' ? buttonIcon.back :
                        icon === 'edit' ? buttonIcon.edit :
                        icon === 'delete' ? buttonIcon.delete :
                        icon === 'add' ? buttonIcon.add : null
                    }
                    <span className="hidden lg:inline-block">{name}</span>
                </button>  
            )
        }
        
    }
}

export default Button