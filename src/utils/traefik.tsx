import Link from "next/link"

export const detectTraefik = (container) => {
    return  (container.Config.Labels["traefik.enable"]??"false") === "true"
}

  
export const parseTraefikRouterRules =  (container) => {
    const keys = Object.keys(container.Config.Labels).filter((x) => x.startsWith("traefik.http.routers") && x.endsWith(".rule") )
  
    return( keys && 
        keys.map((key) => {
            return [...container.Config.Labels[key].matchAll(/Host\(`([a-z.0-9]*)`\)/ig)].map((x)=> x[1]).join(", ")
        }).map((x)=> {return(<Link href={"http://" + x} target="_blank">{x}</Link>)}).reduce((prev, curr) => [prev, '- ', curr], [])) 
        || ["Unknown"]
  }