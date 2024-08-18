import { useState } from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/20/solid';

const faqs = [
  { question: 'What is Next.js?', answer: 'Next.js is a React framework for building web applications.' },
  { question: 'How does Tailwind CSS work?', answer: 'Tailwind CSS is a utility-first CSS framework for rapidly building custom designs.' },
  { question: 'What is the purpose of getStaticProps?', answer: 'getStaticProps is used to fetch data at build time in Next.js.' },
  // Add more FAQs as needed
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState(null);

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const clearSearch = () => setSearchQuery('');

  const expandAll = () => setOpenIndex(faqs.map((_, i) => i));
  const collapseAll = () => setOpenIndex(null);

  return (
    <div>
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-center text-2xl font-bold">FAQ Page</h1>
      </header>
      <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {searchQuery && (
            <XIcon
              className="w-5 h-5 absolute top-3 right-3 text-gray-500 cursor-pointer"
              onClick={clearSearch}
            />
          )}
        </div>
        <div className="flex justify-end space-x-2 mb-4">
          <button onClick={expandAll} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Expand All</button>
          <button onClick={collapseAll} className="bg-red-500 text-white px-4 py-2 rounded-lg">Collapse All</button>
        </div>
        {filteredFaqs.map((faq, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4 mb-2">
            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFAQ(index)}>
              <h3 className="font-semibold text-lg">{faq.question}</h3>
              {openIndex === index ? <ChevronUpIcon className="w-4000 h-4000" /> : <ChevronDownIcon className="w-4000 h-4000" />}
            </div>
            <div className={`overflow-hidden transition-max-height duration-300 ${openIndex === index ? 'max-h-screen' : 'max-h-0'}`}>
              <p className="text-gray-600 mt-2">{faq.answer}</p>
            </div>
          </div>
        ))}
      </main>
      <footer className="bg-gray-800 text-white text-center p-4 mt-10">
        <p>© 2024 Your Company Name. All rights reserved.</p>
      </footer>
    </div>
  );
}