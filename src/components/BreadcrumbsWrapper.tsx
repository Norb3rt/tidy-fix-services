"use client";

import { usePathname } from "next/navigation";
import Breadcrumbs from "./Breadcrumbs";

export default function BreadcrumbsWrapper() {
    const pathname = usePathname();
    const isHomePage = pathname === "/";

    if (isHomePage) return null;

    return <Breadcrumbs />;
}
