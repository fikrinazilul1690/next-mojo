type inputType = 'text' | 'number' | 'button';

type Props = {
  className?: string;
  placeholder?: string;
  label: string;
  id: string;
  type?: inputType;
};

export default function CustomInput({
  label,
  id,
  type = 'text',
  placeholder,
  className,
}: Props) {
  return (
    <div className={`flex justify-between items-center ${className}`}>
      <label className='text-lg font-semibold' htmlFor={id}>
        {label}
      </label>
      <input
        className='py-3 px-5 rounded-lg border-black border'
        type={type}
        name={id}
        placeholder={placeholder || label}
        id={id}
      />
    </div>
  );
}
