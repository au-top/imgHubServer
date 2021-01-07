declare interface ResponseContentObject{
    "description":string,
    "content":{
        [indexS:string]:any
        [indexN:number]:any
    },
    "version":string
}