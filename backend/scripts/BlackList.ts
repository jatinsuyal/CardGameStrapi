export const BlackList = (key:string, value:any) => {

    if(key === "socket") return undefined;

    return value;
}