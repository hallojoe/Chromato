import React, { useRef, PropsWithChildren } from 'react';

export interface IFileInput {
  multiple?: boolean, 
  typePattern?: string,
  triggerText?: string,
  onStart?: Function
  onChange?: Function
  onComplete?: Function
}


const FileInput: React.FC<IFileInput> = (props: PropsWithChildren<IFileInput>) => {

  const FileInputRef = useRef<HTMLInputElement>(null);

  const showFileDialog = () => FileInputRef.current && FileInputRef.current.click();

  const handleChange = (files: FileList | null) => {

    if(!files || files === null) return;    

    if(props.onStart) props.onStart(files);

    for(let i = 0; i < files.length; i++) {

      const file = files[i];
      const typePattern: string | null = props.typePattern ? props.typePattern : null;

      if (typePattern === null || !file.type.match(typePattern)) continue;  

      const reader = new FileReader();  
      reader.readAsText(file);      
      reader.onload = ((file: File) => {

        return  (e: ProgressEvent) => {      
          const text:string | undefined = reader.result?.toString();                    

          
          if(text && props.onChange) props.onChange(text);

        };

      })(file);

    }

    if(props.onComplete) props.onComplete(true);

  };
    
  return (    
    <div className="FileInput">
      <input
        type="file"
        style={{ display: 'none' }}
        ref={FileInputRef}
        multiple={props.multiple}
        accept={props.typePattern}
        onChange={e => handleChange(e.target.files)}
      />
      <button onClick={(event) => {event.preventDefault(); showFileDialog(); }}>{props.children}</button>
    </div>
  );
};

export default FileInput;