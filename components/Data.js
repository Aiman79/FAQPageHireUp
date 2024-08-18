import Head from "next/head";
import '../src/app/globals.css';
import React from "react";
import { useState } from "react";
import { Collapse } from "react-collapse";
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";

const Data = ({open, toggle, question, answer}) => {
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

export default Data; 