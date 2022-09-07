import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface TabsHeadProps {
    routes: TabRoute[];
    onStepClick: (step: number) => void;
    activeStep: number;
}

const TabsHeadForStaff: React.FC<TabsHeadProps> = ({
    routes,
    activeStep,
    onStepClick,
}) => {
    const router = useRouter();
    const currentPath = router.query.route;

    return (
        <div className="space-y-2">
            {routes.map((route, i) => (
                <button
                    type="button"
                    onClick={() => onStepClick(i)}
                    className={`cursor-pointer w-full flex justify-start ${
                        i === activeStep ? "text-black" : "text-gray-400"
                    }`}
                >
                    {route.label}
                </button>
            ))}
        </div>
    );
};

export default TabsHeadForStaff;
