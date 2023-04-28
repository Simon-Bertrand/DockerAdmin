export const ContainersApi = {

    async getContainers()  {
        return await fetch("http://localhost:3000/back/containers", {next : {revalidate : 0}, cache : 'no-store'})
    },
    getContainer(name_or_id : string)  {
        return async () => await fetch(`http://localhost:3000/back/containers/${name_or_id}`, {next : {revalidate : 0}, cache : 'no-store'})
    }
}