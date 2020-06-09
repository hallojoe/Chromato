import React from 'react';
import { defaultHtmlTemplate } from '../Store/Data/DefaultTemplates';

export interface IUnsafeHtml {
  value: string | undefined | null
}

const UnsafeHtmlElement: React.FC<IUnsafeHtml> = ({value}) => {  
  if(!value) value = defaultHtmlTemplate;
  return (
    <div className="unsafeHtmlElement" dangerouslySetInnerHTML={{__html: value}}></div>
  );
};

export default UnsafeHtmlElement;
