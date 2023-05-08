import { revalidateTag } from "next/cache";
import Fetch from "./fetch";

export async function actionOnContainer(name_or_id : string, action : "start"|"stop"|"restart"|"kill"|"update"|"pause"|"unpause"|"wait"|"attach", data={})  {
    console.log(`/containers/${name_or_id}/${action}`)
    const res = Fetch(`/containers/${name_or_id}/${action}`, {
        next : {revalidate : 0},
        cache : 'no-store',
        method : "POST",
        body: Object.keys(data).length > 0 ? JSON.stringify(data) :null
    })
    return res
}
