import { useRef, useEffect } from 'react';

export const createClassName = (...classes) => {
    let finalClass = ''
    for (const c of classes) {
        if (c?.length > 0 && c.trim().length > 0) {
            finalClass += (finalClass.length > 0 && finalClass.trim().length > 0 ? ' ' : '') + c.trim();
        }
    }
    return finalClass;
}

export const useOutsideClick = (callback) => {
    const ref = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        };

        document.addEventListener('mouseup', handleClickOutside);
        document.addEventListener('touchend', handleClickOutside);

        return () => {
            document.addEventListener('mouseup', handleClickOutside);
            document.addEventListener('touchend', handleClickOutside);
        };
    }, [ref]);

    return ref;
};
