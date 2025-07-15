import styled from 'styled-components';

type CheckIconProps = {
    width?: number;
    height?: number;
    color?: string;
    backgroundColor?: string;
    animate?: boolean;
    rounded?: boolean;
    strokeWidth?: number;
    hoverColor?: string;
    className?: string;
    onClick?: () => void;
};

const IconWrapper = styled.div<{
    animate?: boolean;
    rounded?: boolean;
    backgroundColor?: string;
    hoverColor?: string;
}>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: ${(props) => props.backgroundColor || 'transparent'};
    border-radius: ${(props) => (props.rounded ? '50%' : '0')};
    transition: all 0.3s ease;
    cursor: ${(props) => (props.onClick ? 'pointer' : 'default')};

    ${(props) =>
        props.animate &&
        `
        &:hover {
            transform: scale(1.1);
        }
    `}

    svg {
        transition: fill 0.3s ease;
        &:hover {
            fill: ${(props) => props.hoverColor};
        }
    }
`;

/**
 * CheckIcon - Atom Component
 * @param width - Icon width in pixels
 * @param height - Icon height in pixels
 * @param color - Icon color
 * @param backgroundColor - Background color of the icon container
 * @param animate - Enable hover animation
 * @param rounded - Make the background circular
 * @param strokeWidth - Width of the check mark
 * @param hoverColor - Color on hover
 * @param className - Additional CSS classes
 * @param onClick - Click handler
 */
export default function CheckIcon({
    width = 24,
    height = 24,
    color = 'currColor',
    backgroundColor,
    animate = false,
    rounded = false,
    strokeWidth = 2,
    hoverColor,
    className,
    onClick,
}: CheckIconProps) {
    return (
        <IconWrapper
            backgroundColor={backgroundColor}
            animate={animate}
            rounded={rounded}
            hoverColor={hoverColor}
            className={className}
            onClick={onClick}
            role={onClick ? 'button' : 'img'}
            aria-label="check mark"
        >
            <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill={color} strokeWidth={strokeWidth} />
            </svg>
        </IconWrapper>
    );
}
