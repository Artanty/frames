import { useState, useEffect, useRef } from 'react';

export default function useComponentVisible(initialIsVisible: any) {
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
    const ref = useRef(null);

    const handleClickOutside = (event: any) => {
        if (ref.current && !(ref as any).current.contains(event.target)) {
            setIsComponentVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return { ref, isComponentVisible, setIsComponentVisible };
}

// OTHER
export const jsps = (data: any) => JSON.parse(JSON.stringify(data))

export const upd = (data: any, name: string, value: any) => ({ ...jsps(data), [name]: value })

