

export default class Console {
    static log(...data : string[]) : void {
        console.log(...data)
    }
    static info(from_svc : string, message : string) : void {
        Console.log('%c' + "- ["+from_svc+"] " + message, 'color: blue');
    }
    static server_info(from_svc : string, message : string) : void {
        Console.log("\x1b[1;94m" + "- ["+from_svc+"] >> " + message+'\x1b[0m');
    }
       
}