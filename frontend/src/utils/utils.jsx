export const createClassName = (...classes) => {
    let finalClass = ''
    for (const c of classes) {
        if (c?.length > 0 && c.trim().length > 0) {
            finalClass += (finalClass.length > 0 && finalClass.trim().length > 0 ? ' ' : '') + c.trim();
        }
    }
    return finalClass;
}
