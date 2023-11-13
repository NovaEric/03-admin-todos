'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface SidebarMenuItemProps {
    path: string;
    icon: JSX.Element;
    title: string;
    subtitle: string;
 }

export const SidebarMenuItem = ({ path, icon, title, subtitle }: SidebarMenuItemProps) => {
    
    const currentPath = usePathname();

    return (
        <Link href={path}
            className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl text-gray-600 ${currentPath === path ? 'text-white bg-gradient-to-r from-sky-600 to-cyan-400' : ''} `}>

            <div>
                {icon}
            </div>
            <div className="flex flex-col">
                <span className="text-lg font-bold leading-5">{title}</span>
                <span className="text-sm hidden md:block">{subtitle}</span>
            </div>
        </Link>
    );
}