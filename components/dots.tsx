import React, { useState, useEffect, useRef, MutableRefObject } from 'react';


function useInterval(callback: () => void, delay: number | null) {
    const savedCallback: MutableRefObject<(() => void) | undefined> = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            if (savedCallback.current) {
                savedCallback.current();
            }
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}


const ThinkingDots = () => {
    const [dots, setDots] = useState('');

    useInterval(() => {
        setDots((prevDots) => (prevDots.length >= 3 ? '' : prevDots + '.'));
    }, 500); // 500 milliseconds

    return <h1 className='text-2xl text-brendan font-bold'>Thinking{dots}</h1>;
};

export default ThinkingDots;
