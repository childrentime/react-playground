import React, { useEffect, useState } from 'react'

export interface MessageProps {
    type: 'error' | 'warn'
    content: string
}

export const Message: React.FC<MessageProps> = (props) => {
  const { type, content } = props
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(!!content)
  }, [content])

  const typeClasses = {
    error: 'bg-red-50 border-red-500 text-red-700',
    warn: 'bg-yellow-50 border-yellow-500 text-yellow-700'
  }

  return visible ? (
    <div className={`absolute right-2 bottom-0 left-2 z-10 flex flex-col max-h-[calc(100%-300px)] min-h-[40px] mb-2 border-2 border-solid rounded-md overflow-hidden ${typeClasses[type]}`}>
      <div className="flex-grow overflow-auto">
        <pre 
          className="p-3 m-0 whitespace-pre-wrap break-words"
          dangerouslySetInnerHTML={{ __html: content }}
        ></pre>
      </div>
      <button 
        className={`absolute top-0.5 right-0.5 w-[18px] h-[18px] p-0 text-[9px] leading-[18px] text-center cursor-pointer border-none rounded-full ${type === 'error' ? 'bg-red-500 text-red-50' : 'bg-yellow-500 text-yellow-50'}`}
        onClick={() => setVisible(false)}
      >
        ✕
      </button>
    </div>
  ) : null
}