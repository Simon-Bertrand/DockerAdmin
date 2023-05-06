"use client";
import { XMarkIcon } from "@heroicons/react/24/solid"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"


type ConfirmModalProps = {
    modalTitle: string,
    setModalOpen: Dispatch<SetStateAction<boolean>>,
    onConfirm: () => void,
    onCancel: () => void,
    onModalClose? : () => void,
    style: Style
    children?: JSX.Element,
    selectedRow?: { rowId: number, data: object},    
}

    type Style = {
        bgColor: string,
        border?:string
        textColor?: string,
        btn?: Button,
    }

    type Button = {
        color: string,
        hover?: string
    }



export const GenericModalComponent : React.FunctionComponent<ConfirmModalProps> = (props : ConfirmModalProps) : JSX.Element  => {

    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {    
              function handleClickOutside(event) {
                if (modalRef.current && !modalRef.current.contains(event.target)) {              
                    props.onCancel()
                }
              }             
              document.addEventListener("mousedown", handleClickOutside);
              return () => {
               
                document.removeEventListener("mousedown", handleClickOutside);
              };
    }, [modalRef]);


    // Close when Escape
    useEffect(() => {
		const keyHandler = ({ keyCode }: any) => {
			if ( keyCode !== 27) return;
                props.onCancel()
		};
		document.addEventListener("keydown", keyHandler);
		return () => document.removeEventListener("keydown", keyHandler);
	});






    return(
       <>
                <div  className={"justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "+(props?.style.textColor)}>
                    <div className="relative 2xl:w-1/4 xl:w-2/8 w-2/4 my-6 mx-auto max-w-3xl">
                        <div ref={modalRef} className={"rounded-md relative flex flex-col w-full outline-none focus:outline-none " + (props?.style?.bgColor) + ' ' + (props?.style?.border)}>
                            <div className="flex items-center justify-between p-4 border-b border-solid border-slate-200 rounded-t">
                                <h3 className={"text-xl font-semibold "}>{props.modalTitle}</h3>
                                <button
                                    className="flex bg-transparent border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none text-indigo-500"                                    
                                    onClick={props.onModalClose??props.onCancel}
                                >
                                    <div className="h-7 text-red-500">
                                        <XMarkIcon/>
                                    </div>
                                </button>
                            </div>
                            <div className="relative p-4">
                                <div className="flex flex-col">
                                    {props.children}
                                </div>					
                            </div>
                        </div>
                    </div>
                </div>
                <div className="opacity-40 fixed inset-0 z-40 bg-black"></div>
            </>
      
        )
  }