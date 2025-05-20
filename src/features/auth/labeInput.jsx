import React from 'react';

export default function LabeledInput({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  name,
}) {
  return (
    <div className='flex items-center gap-3 mb-4'>
      <label htmlFor={name} className='w-24  text-yellow-900 font-playwrite opacity-80'>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={""}
        className='flex-1 px-2 rounded-md border-b-2 bg-transparent focus:outline-none  border-yellow-900 '
      />
  
    </div>
  );
}
