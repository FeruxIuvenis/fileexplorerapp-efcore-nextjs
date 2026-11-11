"use client";

import { Suspense } from "react";
import { Card } from "@/components/ui";
import SearchInput from "./SearchInput";
import { PathBreadcrumb } from "./PathBreadcrumb";
import { usePathname } from "next/navigation";

const HeaderContent = () => {
    const pathname = usePathname();
    const segments = pathname?.split("/").filter(Boolean) || [];

    return (
        <Card className="w-full flex items-center p-4 flex-row rounded-md">
            <SearchInput />
            <div className="flex items-center gap-2 flex-row">
                <PathBreadcrumb segments={segments} />
            </div>
        </Card>
    );
};

const Header = () => {
    return (
        <Suspense
            fallback={
                <Card className="w-full flex items-center p-4 flex-row rounded-md">
                    <SearchInput />
                </Card>
            }
        >
            <HeaderContent />
        </Suspense>
    );
};

export default Header;