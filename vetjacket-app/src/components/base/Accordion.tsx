import React, { useState } from 'react';

type AccordionProps = {
  title: string;
  content: React.ReactNode;
};

const Accordion: React.FC<AccordionProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="rounded-lg border-0 bg-gradient-to-r from-blue-600 to-gray-500 shadow-lg overflow-hidden">
      <h2 className="mb-0">
        <button
          className="group relative flex w-full items-center rounded-none border-0 bg-transparent px-5 py-4 text-left text-base text-white transition hover:z-2 focus:z-3 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {title}
          <span className={`-mr-1 ml-auto h-5 w-5 shrink-0 transition-transform duration-200 ease-in-out ${isOpen ? 'rotate-0 fill-white' : 'rotate-[-180deg] fill-white'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </span>
        </button>
      </h2>
      {isOpen && (
        <div className="px-5 py-4 bg-gray-300 text-black-500">
          {content}
        </div>
      )}
    </div>
  );
  

};

export default Accordion;
