import React, { useEffect } from 'react';

export default function TitleScreen({ onTimeout }) {
    useEffect(() => {
        const timer = setTimeout(onTimeout, 3000);
        return () => clearTimeout(timer);
    }, [onTimeout]);

    return null;
}
