import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link2, CheckCircle } from 'lucide-react';
import themeColors from '@/tools/themeColors';
import Button from '@/components/Button/Button';

type CopyLinkProps = {
    url?: string;
    iconSize?: number;
    showText?: boolean;
    className?: string;
    variant?: 'inline' | 'standalone';
    size?: 'sm' | 'md' | 'lg' | 'mini' | 'xs';
};

const CopyNotification = styled.div`
    position: fixed;
    top: 4rem;
    left: 50%;
    transform: translateX(-50%);
    background-color: ${themeColors.colors.ui.dimmed};
    color: white;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    box-shadow: 0 4px 10px ${themeColors.shadow_purple_input_inset};
    font-size: ${themeColors.typography.body.small.fontSize}px;
    z-index: 1000;
    animation:
        fadeIn 0.3s,
        fadeOut 0.3s 1.7s;

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translate(-50%, -10px);
        }
        to {
            opacity: 1;
            transform: translate(-50%, 0);
        }
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translate(-50%, 0);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -10px);
        }
    }
`;

/**
 * CopyLink Component - Atom Component
 * @description A button that copies a URL to clipboard and shows a notification
 * @param {string} url - The URL to copy. If not provided, the current page URL is used.
 * @param {number} iconSize - The size of the icon.
 * @param {boolean} showText - Whether to show the text next to the icon.
 * @param {string} className - Additional class names for styling.
 */
export default function CopyLink({
    url,
    iconSize = 16,
    showText = true,
    className,
    variant = 'standalone',
    size = 'sm',
}: CopyLinkProps) {
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        return () => setShowNotification(false);
    }, []);

    const handleCopy = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const urlToCopy = url || window.location.href;
        navigator.clipboard.writeText(urlToCopy);

        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 2000);
    };

    const shouldBeFullWidth = variant === 'standalone' && window.innerWidth <= 768;

    return (
        <>
            <Button
                variant="share"
                size={size}
                onClick={handleCopy}
                className={className}
                fullWidth={shouldBeFullWidth}
            >
                <Link2 size={iconSize} />
                {showText && 'Copy Link'}
            </Button>

            {showNotification && (
                <CopyNotification>
                    <CheckCircle size={16} color="#4BB543" />
                    Link copied to clipboard
                </CopyNotification>
            )}
        </>
    );
}
