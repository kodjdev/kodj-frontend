import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';

type User = {
    id: string;
    email: string;
    username: string;
    name: string;
    imageUrl: string;
    createdAt: string;
    role: 'user' | 'admin';
    isVerified: boolean;
};

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <BrowserRouter>
            <RecoilRoot>{children}</RecoilRoot>
        </BrowserRouter>
    );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
    render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };

type CustomEvent = {
    id: string;
    title: string;
    description: string;
    date: string;
    author: string;
    imageUrl: string;
    registeredCount: number;
    maxSeats: number;
    readonly availableSeats: number;
    status: 'active' | 'inactive';
    category: string;
    location: string;
};

export const createMockEvent = (overrides: Partial<CustomEvent> = {}) => ({
    id: `event-${Math.random().toString(36).substr(2, 9)}`,
    title: 'Frontend Development Workshop',
    description: 'Learn modern React patterns and testing strategies',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    author: 'Jane Developer',
    imageUrl: 'https://via.placeholder.com/400x200?text=Workshop',
    registeredCount: Math.floor(Math.random() * 20) + 5,
    maxSeats: 50,
    get availableSeats() {
        return this.maxSeats - this.registeredCount;
    },
    status: 'active' as const,
    category: 'technology',
    location: 'Virtual',
    ...overrides,
});

export const createMockUser = (overrides: Partial<User> = {}) => ({
    id: `user-${Math.random().toString(36).substr(2, 9)}`,
    email: `user-${Date.now()}@example.com`,
    username: `user${Math.random().toString(36).substr(2, 6)}`,
    name: 'Alex Johnson',
    imageUrl: 'https://via.placeholder.com/150x150?text=Avatar',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    role: 'user' as const,
    isVerified: true,
    ...overrides,
});
