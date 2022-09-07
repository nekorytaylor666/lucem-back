interface TabRoute {
    slug: string;
    label: string;
    component: (props: any) => JSX.Element | JSX.Element;
}
