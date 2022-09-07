import { useRouter } from "next/router";
import { useMemo, useEffect } from "react";

interface useTabRoutingProps {
    routes: TabRoute[];
    queryParam?: string;
    defaultRedirect?: string;
}

export const useTabRouting: (
    config: useTabRoutingProps,
) => JSX.Element | undefined = ({
    routes,
    defaultRedirect = "/404",
    queryParam = "route",
}) => {
    const router = useRouter();
    const currentPath = router.query[queryParam];
    const isServerSide = typeof window === "undefined";
    const findSlugMatchingCmp = () =>
        routes.find((cmp) => {
            return cmp.slug === currentPath;
        })?.component;

    const cmp = useMemo(findSlugMatchingCmp, [router]);

    useEffect(() => {
        const foundComponent = findSlugMatchingCmp();

        if (currentPath && !foundComponent && !isServerSide)
            router.push(defaultRedirect);
    }, [router]);

    return cmp;
};
