import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface TabsHeadProps {
    routes: TabRoute[];
}

const TabsHead: React.FC<TabsHeadProps> = ({ routes }) => {
    const router = useRouter();
    const currentPath = router.query.route;

    return (
        <div className="w-full bg-light-grey rounded-2xl p-2 px-3 flex justify-evenly">
            {routes.map((route) => (
                <Link
                    key={route.slug}
                    href={{
                        href: route.slug,
                        query: { ...router.query, route: route.slug },
                    }}
                    replace
                >
                    <div
                        className={`w-full flex justify-center items-center p-2 rounded cursor-pointer ${
                            route.slug === currentPath
                                ? "bg-link-purple text-white"
                                : "text-black"
                        }`}
                    >
                        {route.label}
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default TabsHead;
