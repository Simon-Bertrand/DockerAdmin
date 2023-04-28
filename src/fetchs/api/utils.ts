export const UtilsApi = {

    async ping()  {
        return await fetch("http://localhost:3000/back/ping", {cache : "no-store"})
    }
}