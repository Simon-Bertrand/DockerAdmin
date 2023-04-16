export const ContainersApi = {

    async getContainers()  {
        return await fetch("http://localhost:3000/api/containers", {next : {revalidate : 0}, cache : 'no-store'})
    }
}