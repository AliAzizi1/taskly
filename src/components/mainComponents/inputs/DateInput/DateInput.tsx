
interface props {
    label: string,
    vlaue: string | null,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const DateInput = ({label, onChange, vlaue}: props) => {

    return(
        <>
            <div className="w-full flex flex-col gap-2">
                    <span className="text-sm">{label}</span>
                    <input value={vlaue || ''} onChange={onChange} className="p-2 border-1 border-gray-200 shadow-md rounded text-sm" type="date"/>
            </div>
        </>
    )
}

export default DateInput