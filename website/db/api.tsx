"use server";

import prisma from "./client";



export async function fetchUsers() {
    return await prisma.user.fetch({})
}


export async function createUser(login : string, password : string) {
    return await prisma.user.createHashed({data:{login, password}})
}

export async function updateUser(id :string, login : string, password : string) {
    return await prisma.user.updateHashed({
        where : {id},
        data :{
            ...(login.trim().length>0 ? {login}:{}),
            ...(password.trim().length>0 ? {password}:{})
        }
    })
}

export async function deleteUser(id :string) {
    return await prisma.user.delete({
        where : {id},
    })
}



