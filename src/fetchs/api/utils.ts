export const UtilsApi = {

    async ping()  {
        return await fetch("http://localhost:3000/api/ping", {cache : "no-store"})
    }
}