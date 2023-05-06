
"use client";
import { CheckIcon, PlusIcon } from "@heroicons/react/24/solid"
import { useState } from "react"
import { GenericModalComponent } from "./GenericModal"

function ListModals({children} : {children : any}) {
    const [modal, setModal] = useState(0)
    const modalList = [
        <Modal button="update" values= {{login:"real_login", password:"real_password"}} ></Modal>,
        <Modal button="create" values= {{login:"Login", password:"Password"}}></Modal>
    ]
    return (
        <>
            {children}
            {modal !== null && modalList[modal]}
        </>
    )

}
export default ListModals
  
function Modal({button, values} : {button:string, values : {password:string, login:string}}) {

    const Icon = (val) => {
      const height = 22
      switch (val){
        case "create" : return <PlusIcon height={height}></PlusIcon>
        case "update" : return <CheckIcon height={height}></CheckIcon>
  
      }
    }
    const BgColor = (val) => {
      switch (val){
        case "create" : return "emerald"
        case "update" : return "orange"
      }
    }
    return (
  
            <GenericModalComponent 
            style={{ bgColor: "card-color-1", border:"", textColor: "", btn: ""} }
            modalTitle={button.charAt(0).toUpperCase() + button.slice(1) + " account"}
            >
                <form className=" text-white">
                <div className='w-2/3 mx-auto space-y-4'>
                    <input
                    name={"login"}
                    placeholder={values.login}
                    className="tremor-TextInput-input rounded w-full mx-auto bg-stone-600 focus:outline-none focus:ring-0 pl-4 pr-4 py-2 text-sm font-medium border-0 placeholder:text-gray-200"
                    />
                    <input
                    name={"password"}
                    placeholder={values.password}
                    className="tremor-TextInput-input rounded w-full mx-auto bg-stone-600 focus:outline-none focus:ring-0 pl-4 pr-4 py-2 text-sm font-medium border-0 placeholder:text-gray-200"
                    />
                
                    <button className={'flex gap-2 w-1/3 mx-auto py-1 px-2 text-bold rounded ' + `bg-${BgColor(button)}-500 ` +`hover:bg-${BgColor(button)}-600` }  >
                    <>
                        {button.charAt(0).toUpperCase() + button.slice(1)}
                        {
                        Icon(button)
                        }
                    </>
                    </button>
                </div>
                </form>
            </GenericModalComponent>
   
    )
  }