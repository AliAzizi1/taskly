
interface props {
    label: string,
    placeholder: string,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    value: string
}

const LongTextInput = ({label, placeholder, onChange, value}: props) => {

    return(
        <>
            <div className="w-full h-50 flex flex-col gap-2">
                    <span className="text-sm">{label}</span>
                    <textarea value={value} onChange={onChange} className="p-2 h-full min-h-[100px] border-1 border-gray-200 shadow-md rounded text-sm" placeholder={placeholder} />
            </div>
        </>
    )
}

export default LongTextInput