let timeoutId: ReturnType<typeof setTimeout> | undefined;

export function debounce(func: Function, delay: number){
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    return (...args: any[]) => {
        if (timeoutId){
            clearTimeout(timeoutId)
        } 
        timeoutId = setTimeout(() =>{
            func(...args)
            timeoutId = null;
        }, delay)
    }
}