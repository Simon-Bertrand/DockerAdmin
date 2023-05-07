

import { GenericModalComponent } from '@/src/widgets/modals/GenericModal';
import { CheckIcon, ListBulletIcon, PlusIcon, TrashIcon, XMarkIcon} from '@heroicons/react/24/solid';
import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  TextInput,
  Flex,
  Button
} from '@tremor/react';
import { Dispatch, SetStateAction, useState } from 'react';
import { ModalState } from './modals/ListModals';


function GenerateButtonProps({color} : {color : string}){
  return {
    height : 23,
    className : [color].join(" "),
  }
}

function UpdateButton({user, setModal}){
  return (<button onClick={()=>setModal(curr => {return {...curr, state:0, user}})}><ListBulletIcon {...GenerateButtonProps({color:"text-cyan-500"})} /></button>)
}
function DeleteButton({user, setModal}){
  return (<button onClick={()=>setModal(curr => {return {...curr, state:2, user}})}><TrashIcon {...GenerateButtonProps({color:"text-red-500"})} /></button>)
}

export default function GenericTable(
    { data, fields, formatCell, idField, rowExecute, setModal }:
    {
      data: object[],
      fields : string[],
      formatCell : (d : any, k : string) => JSX.Element,
      idField : string, 
      rowExecute : string[],
      setModal : Dispatch<SetStateAction<ModalState>>
    }
  ) {


  return (
    <>
    <div className='flex justify-end pb-2'>
      <button onClick={()=>setModal(curr => {return {...curr, state:1, user:{}}})}className="rounded text-white flex gap-2 px-2 py-1 bg-emerald-500" >Create <PlusIcon {...GenerateButtonProps({color:"text-white-500"})} /></button>
    </div>
    <Table>
      <TableHead>
        <TableRow>
          {fields.map(x=><TableHeaderCell>{x.charAt(0).toUpperCase()+x.slice(1)}</TableHeaderCell>)}
          {rowExecute.map((x)=><TableHeaderCell>{x.charAt(0).toUpperCase()+x.slice(1)}</TableHeaderCell>)}
        </TableRow>
      </TableHead>
      <TableBody>
        {
            data.map((d) => {
              return(
                  <TableRow key={d.id}>
                    {
                      fields.map(x=> <TableCell>{formatCell(d[x], x)}</TableCell>)
                    }
                    {
                    rowExecute
                    .map(y=>{
                      switch (y) {
                        case "update" : return <UpdateButton user={d} setModal={setModal} />
                        case "delete" : return <DeleteButton user={d} setModal={setModal} />
                        default : return <></>
                      }
                    })
                    .map(x=><TableCell>{x}</TableCell>)
                    }
                  </TableRow>
                )
            })
        }

        
      </TableBody>
    </Table>


    </>
  );
}

