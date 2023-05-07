
"use client";
import { CheckIcon, PlusIcon } from "@heroicons/react/24/solid"
import { createUser, deleteUser, fetchUsers, updateUser } from "db/api";
import { prisma } from "db/client";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { toast } from "react-toastify";
import GenericTable from "../table";
import { GenericModalComponent } from "./GenericModal"

export interface ModalState {
  state : null|number,
  user : object
}

export function AccountList({} : {}) {
  const [modal, setModal] = useState<ModalState>({state : null, user:{}})
  const [data, setData] = useState<any>(null)
  
  const fetch = () => {
    fetchUsers().then(
      onSuccess => {setData(onSuccess)},
      onFail => {
        toast.error("Could not fetch the administrator accounts")
      },
    )
  }

  useEffect(() => {
    fetch()
  }, [])
  


  function formatCell(x : any, k : string) {
    switch (k) {
      case 'createdAt':
      case "updatedAt": 
        return x.toLocaleString()
      case "login":
        return x
      default : return x.toString()
    }
  }
    
  const actions = {
    "create" : (data) => {
      createUser(data.login, data.password)
      .then(
        x=>{
          setModal({state : null, user:{}})
          toast.success("Successfully created the account")
          fetch()
        },
        x=>{
          toast.error(x.toString())
        }
      )
    },
    "update" : (data) => {
      updateUser(data.id, data.login, data.password)
      .then(
        x=>{
          setModal({state : null, user:{}})
          toast.success("Successfully updated the account")
          fetch()
        },
        x=>{
          toast.error(x.toString())
        }
      )
    },
    "delete" : (data) => {

      deleteUser(data.id)
      .then(
        x=>{
          setModal({state : null, user:{}})
          toast.success("Successfully deleted the account")
          fetch()
        },
        x=>{
          toast.error(x.toString())
        }
      )
    },
  }
    const modalList = [
        <Modal modalState={[modal, setModal]} button="update" actions={actions} ></Modal>,
        <Modal modalState={[modal, setModal]} button="create" actions={actions}></Modal>,
        <Modal modalState={[modal, setModal]} button="delete" actions={actions}></Modal>
    ]
    if(data) {
      return (
        <>
            <GenericTable
            data={data}
            idField = {"id"}
            rowExecute = {["update", "delete"]}
            fields={["id", "login", "createdAt", "updatedAt"]}
            formatCell={formatCell}
            setModal={setModal}
            />
            {modal !== null && modalList[modal.state]}
        </>
      )
    } else {
      return (<h1 className="w-full text-center py-8">Loading...</h1>)
    }
     
   

}

  

function Modal({button, actions, modalState} : {button:string, actions : object, modalState : [ModalState, Dispatch<SetStateAction<ModalState>>]}) {
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
    const Widget = (val) => {
      switch (val){
        case "create" : return  <ModalForm button={button} values={modalState[0].user} BgColor={BgColor} Icon={Icon} action={actions["create"]} />
        case "update" : return  <ModalForm button={button} values={modalState[0].user} BgColor={BgColor} Icon={Icon} action={actions["update"]} />
        case "delete" : return <ModalConfirm values={modalState[0].user} action={actions["delete"]} />
      }
    }
    return (
            <GenericModalComponent 
            style={{ bgColor: "card-color-1", border:"", textColor: "", btn: ""} }
            modalTitle={button.charAt(0).toUpperCase() + button.slice(1) + " account"}
            onModalClose={() => modalState[1](curr => {return {...curr, user:{},  state:null}})}
            onCancel={() => modalState[1](curr => {return {...curr, user:{}, state:null}})}
            >
              {Widget(button)}
            </GenericModalComponent>
    )
  }


function ModalForm({button, values, BgColor, Icon, action}) {
  const formRef = useRef(null)
  const onConfirm = (e) => {
    e.preventDefault()
    formRef.current && action({...(Object.fromEntries(new FormData(formRef.current))), id:values.id})
  }
  return(
    <form ref={formRef} className=" text-white">
      <div className='w-2/3 mx-auto space-y-3'>
          <h4 className="text-center">Login</h4>
          <input
          name={"login"}
          type="text"
          defaultValue={values.login}
          className="tremor-TextInput-input rounded w-full mx-auto bg-stone-600 focus:outline-none focus:ring-0 pl-4 pr-4 py-2 text-sm font-medium border-0 placeholder:text-gray-200"
          />
          <h4 className="text-center">Password</h4>
          <input
          name={"password"}
          type="password"
          className="tremor-TextInput-input rounded w-full mx-auto bg-stone-600 focus:outline-none focus:ring-0 pl-4 pr-4 py-2 text-sm font-medium border-0 placeholder:text-gray-200"
          />
      
          <button onClick={onConfirm} className={'flex gap-2 w-1/3 mx-auto py-1 px-2 text-bold rounded ' + `bg-${BgColor(button)}-500 ` +`hover:bg-${BgColor(button)}-600` }  >
          <>
              {button.charAt(0).toUpperCase() + button.slice(1)}
              {
              Icon(button)
              }
          </>
          </button>
      </div>
  </form>
  )
}

function ModalConfirm({values, action} : {values : object, action : any}) {
  const onConfirm = (e) => {
    e.preventDefault()
    action(values)
  }
  return(
    <form className=" text-white">
      <div className='w-2/3 mx-auto space-y-2 text-center'>
        <h1>Are you sure ?</h1>
        <p>You are going to delete the user : <b>{values.login}</b></p>
        <p className="italic text-sm !text-stone-500">(#{values.id})</p>
        <button onClick={onConfirm} className={'flex gap-2 w-1/3 mx-auto py-1 px-2 text-bold rounded bg-red-500 hover:bg-red-600'}  >
          <p className="w-full text-center">Confirm</p>
        </button>
      </div>
  </form>
  )
}