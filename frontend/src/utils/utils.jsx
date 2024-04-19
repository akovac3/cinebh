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
}

export const getPaginationParams = (search) => {
    const page = search.get('page');
    const size = search.get('size');
    return { page, size }
}

export const getFilterParams = (search) => {
    const city = search.get('city');
    const venue = search.get('venue');
    const genre = search.get('genre');
    const time = search.get('time');
    const contains = search.get('contains');
    const startDate = search.get('startDate');
    const endDate = search.get('endDate');
    return { city, venue, genre, time, contains, startDate, endDate }
}

export const handleFilterChange = (search, setSearch, field, value) => {
    if (value) {
        search.set(field, value);
        search.set('page', 1)
    } else {
        search.delete(field)
    }
    setSearch(search);
}

export const handlePageChange = (search, setSearch, { page = 1, size = 4 }) => {
    search.set('page', page)
    search.set('size', size)
    setSearch(search)
}
