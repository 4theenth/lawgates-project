import React, { useEffect, useRef, useState } from 'react';
import { Wand2, Check } from 'lucide-react';
import { cleanOcrText } from '../../../utils/ocrTextCleaner';

interface AutoResizeTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  enableAutoFormat?: boolean;
}

export const AutoResizeTextarea: React.FC<AutoResizeTextareaProps> = ({ value, className, enableAutoFormat, ...props }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFormatting, setIsFormatting] = useState(false);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  const handleAutoFormat = () => {
    if (!props.onChange) return;
    setIsFormatting(true);
    const cleaned = cleanOcrText(value);
    
    if (cleaned !== value) {
      const e = {
        target: { value: cleaned, name: props.name },
        currentTarget: { value: cleaned, name: props.name }
      } as React.ChangeEvent<HTMLTextAreaElement>;
      props.onChange(e);
    }
    
    setTimeout(() => setIsFormatting(false), 800);
  };

  const textareaElement = (
    <textarea
      {...props}
      ref={textareaRef}
      value={value}
      className={`${className} overflow-hidden text-justify ${enableAutoFormat ? 'pr-10' : ''}`}
      rows={props.rows || 1}
    />
  );

  if (enableAutoFormat) {
    return (
      <div className="relative w-full">
        {textareaElement}
        <button
          type="button"
          onClick={handleAutoFormat}
          title="Rapikan spasi & enter (Auto-Fix)"
          className={`absolute top-2 right-2 p-1.5 rounded-[6px] transition-colors cursor-pointer ${
            isFormatting 
              ? 'bg-green-50 text-green-500' 
              : 'text-neu-400 hover:text-amber-500 hover:bg-amber-50'
          }`}
        >
          {isFormatting ? <Check className="w-4 h-4" /> : <Wand2 className="w-4 h-4" />}
        </button>
      </div>
    );
  }

  return textareaElement;
};
