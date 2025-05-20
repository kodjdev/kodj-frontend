import themeColors from '@/tools/themeColors';

export const modalSizes = {
    sm: '400px',
    md: themeColors.modal_width || '500px',
    lg: themeColors.modal_width_large || '700px',
    xl: '900px',
    full: '90%',
};

export type Sizes = 'sm' | 'md' | 'lg' | 'xl' | 'full';
