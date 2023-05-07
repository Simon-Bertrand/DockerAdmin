import Link from "next/link"

export const detectTraefik = (container) => {
    if (container.Labels) {
        return  (container.Labels["traefik.enable"]??"false") === "true"
    } else {
        return false
    }
}

  
export const parseTraefikRouterRules =  (container) => {
    const keys = Object.keys(container.Labels).filter((x) => x.startsWith("traefik.http.routers") && x.endsWith(".rule") )
  
    return( keys && 
        keys.map((key) => {
            return [...container.Labels[key].matchAll(/Host\(`([a-z.0-9]*)`\)/ig)].map((x)=> x[1]).join(", ")
        }).map((x)=> {return(<Link href={"http://" + x} target="_blank">{x}</Link>)}).reduce((prev, curr) => [prev, '- ', curr], [])) 
        || ["Unknown"]
  }