import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
    const { pathname } = useLocation();

    /* i put the small delay on purpose to ensure the DOM is ready so that we can scroll to the top to focus on*/
    useEffect(() => {
        const timer = setTimeout(() => {
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }, 0);

        return () => clearTimeout(timer);
    }, [pathname]);

    return null;
}
