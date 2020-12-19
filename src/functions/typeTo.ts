export function ifNan<T>(n:number,d:T):number|T{
    return isNaN(n)?d:n;
}
export function anyToNumber<T>(v:any,d:T):number|T{
    return ifNan(parseInt(v?.toString()) ,d);
}