'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface HashLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    to: string;
    children: React.ReactNode;
}

const HashLink: React.FC<HashLinkProps> = ({ to, children, ...props }) => {
    const router = useRouter();
    const pathname = usePathname();
    const hash = to.startsWith('#') ? to : `#${to.split('#')[1]}`;

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        if (pathname === '/') {
            // Already on homepage, just scroll to element
            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // On a different page, navigate to homepage first
            router.push('/');
            // Wait for navigation to complete, then scroll
            setTimeout(() => {
                const element = document.querySelector(hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    };

    return <a href={`/${hash}`} onClick={handleClick} {...props}>{children}</a>;
};

export default HashLink;