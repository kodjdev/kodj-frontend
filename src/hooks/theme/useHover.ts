import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';

type HoverProps = {
    onMouseEnter: () => void;
    onMouseDown: () => void;
    onTouchStart: () => void;
    onMouseLeave: () => void;
    onMouseUp: () => void;
    onTouchEnd: () => void;
    onTouchCancel: () => void;
};

type HoverReturn = [HoverProps, boolean, boolean, Dispatch<SetStateAction<boolean>>, Dispatch<SetStateAction<boolean>>];

/**
 * useHover - Custom Hook for Handling Hover and Click States
 * @returns [hoverProps, isHover, isClicked, setIsHover, setIsClicked]
 */
export default function useHover(): HoverReturn {
    const [isHover, setIsHover] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const setBoth = useCallback((v: boolean) => {
        setIsHover(v);
        setIsClicked(v);
    }, []);

    const hoverProps = useMemo(
        () => ({
            onMouseEnter: () => setIsHover(true),
            onMouseDown: () => setIsClicked(true),
            onTouchStart: () => setBoth(true),
            onMouseLeave: () => setBoth(false),
            onMouseUp: () => setIsClicked(false),
            onTouchEnd: () => setBoth(false),
            onTouchCancel: () => setBoth(false),
        }),
        [setBoth],
    );

    return [hoverProps, isHover, isClicked, setIsHover, setIsClicked];
}
