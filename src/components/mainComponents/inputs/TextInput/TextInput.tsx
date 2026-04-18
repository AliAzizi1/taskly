interface Props {
  label: string
  value: string
  placeholder: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const TextInput = ({ label, placeholder, onChange, value}: Props) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <span className="text-sm">{label}</span>

      <input
        onChange={onChange}
        className="p-2 border border-gray-200 shadow-md rounded text-sm"
        type="text"
        value={value}
        placeholder={placeholder}
      />
    </div>
  )
}

export default TextInput
