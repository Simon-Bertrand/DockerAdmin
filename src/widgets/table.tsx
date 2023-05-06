

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
import { useState } from 'react';


function GenerateButtonProps({color} : {color : string}){
  return {
    height : 23,
    className : [color].join(" "),
  }
}

function UpdateButton(){
  return (<button><ListBulletIcon {...GenerateButtonProps({color:"text-cyan-500"})} /></button>)
}
function DeleteButton(){
  return (<button><TrashIcon {...GenerateButtonProps({color:"text-red-500"})} /></button>)
}

export default function GenericTable(
    { data, fields, formatCell, idField, rowExecute }:
    {
      data: object[],
      fields : string[],
      formatCell : (d : any, k : string) => JSX.Element,
      idField : string, 
      rowExecute : {[ k : string ]:(id : string)=>void}[],
    }
  ) {



  return (
    <>
    <div className='flex justify-end pb-2'>
      <button className="rounded text-white flex gap-2 px-2 py-1 bg-emerald-500" >Create <PlusIcon {...GenerateButtonProps({color:"text-white-500"})} /></button>
    </div>
    <Table>
      <TableHead>
        <TableRow>
          {fields.map(x=><TableHeaderCell>{x.charAt(0).toUpperCase()+x.slice(1)}</TableHeaderCell>)}
          {rowExecute.map(x=>Object.keys(x)[0]).map((x)=><TableHeaderCell>{x.charAt(0).toUpperCase()+x.slice(1)}</TableHeaderCell>)}
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
                    .map(x=>[Object.keys(x)[0], Object.values(x)[0]])
                    .map(y=>{
                      switch (y[0]) {
                        case "update" : return <UpdateButton />
                        case "delete" : return <DeleteButton />
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

