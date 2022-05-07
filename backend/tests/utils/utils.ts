export const isArrayOfString = (arr : []) : boolean => {
    return arr.every(el => typeof el === 'string')
}