import Head from "next/head";
import '../src/app/globals.css';
// import { useState, useEffect } from "react";
// import { useRouter } from "next/router";
import { useState } from "react";
import React from "react";
import { Collapse } from "react-collapse";
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";

export default function Home(){
    // const router = useRouter();
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

    // useEffect(() => {
    //     const query = router.query;
    //     if (query.search) {
    //       setSearchTerm(query.search);
    //     }
    //   }, [router.query]);
    
    //   useEffect(() => {
    //     const query = { ...router.query };
    //     if (searchTerm) {
    //       query.search = searchTerm;
    //     } else {
    //       delete query.search;
    //     }
    //     router.push({
    //       pathname: router.pathname,
    //       query,
    //     });
    //   }, [searchTerm, router]);

    const FaqItem = ({open, toggle, question, answer}) => {
        return(
            <div className="pt-[10x]">
               <div className="bg-white py-[25px] px-[50px] flex justify-between items-centre cursor-pointer"
                    onClick={toggle}>
                        <p className="text-[22px] text-black font-semibold">
                            {question}
                        </p>

                        <div className="text-[30px] text-black">
                            {
                                open ? <AiOutlineMinus color="black"/> : <AiOutlinePlus color="black"/>
                            }
                        </div>
               </div>

               <Collapse isOpened = {open}>
                    <div className="bg-white px-[50px] text-black pb-[20px]">{answer}
                        
                    </div>
               </Collapse>
            </div>
        );
    };

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
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onInput={(e) => {
                            if(e.target.value === ''){
                                collapseAll()
                            }
                        }}
                    />
                
                {
                    filteredData.map((data, index) => {
                    return <FaqItem key={index} open={allExpanded || open === index} question={data.question} answer={data.answer} toggle={() => toggle(index)} />;
                })
                }
                    </div>
               
            </section>
        </div>
    );
}