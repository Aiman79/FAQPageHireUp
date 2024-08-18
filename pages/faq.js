import Head from "next/head";
import Data from "../components/Data";
import { data } from "autoprefixer";
import '../src/app/globals.css'
import { useState } from "react";

export default function Home(){

    
    const dataFaq = [
        { 
            "id": 1,
            question: 'What is Next.js?', 
            answer: 'Next.js is a React framework for building web applications.' 
        },
        { 
            "id": 2,
            question: 'How does Tailwind CSS work?', 
            answer: 'Tailwind CSS is a utility-first CSS framework for rapidly building custom designs.'
        },
        { 
            "id": 3,
            question: 'What is the purpose of getStaticProps?', 
            answer: 'getStaticProps is used to fetch data at build time in Next.js.' 
        },
    ]

    const [searchTerm, setSearchTerm] = useState('')

    const filteredData = dataFaq.filter((data) => {
        const questionLowerCase = data.question.toLowerCase();
        const searchTermLowerCase = searchTerm.toLowerCase();
        return questionLowerCase.includes(searchTermLowerCase);
    })

    const [open, setOpen] = useState(false)

    const toggle = (index) => {
        if(open === index){
            return setOpen(null)
        }

        setOpen(index)
    }
    const clearSearch = () => {
        setSearchTerm('')
        setOpen(null)
    }

    const [allExpanded, setAllExpanded] = useState(false)

    const expandAll = () =>{
        setAllExpanded(true)
        setOpen(filteredData.map((item) => item.id))
    }

    const collapseAll = () => {
        setAllExpanded(false)
        setOpen(null)
    }

    return(
        <div>
            <Head>
                <title>FAQ Page</title>
            </Head>
                <section className="bg-[#3d3db9] h-screen grid place-items-centre centered">
                <div className="px-40 max-w-[800px]">
                <div className="flex justify-between mb-4">
                    <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={expandAll}>Expand All</button>
                    <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={collapseAll}>Collapse All</button>
                </div>
                    <input
                        type="search"
                        placeholder="Search FAQs"
                        className="w-full p-2 mb-4 text-black"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onInput={(e) => {
                            if(e.target.value === ''){
                                collapseAll()
                            }
                        }}
                    />
                
                {
                    filteredData.map((data, index) => {
                    return <Data key={index} open={allExpanded || open === index} question={data.question} answer={data.answer} toggle={() => toggle(index)} />;
                })
                }
                    </div>
               
            </section>
        </div>
    );
}