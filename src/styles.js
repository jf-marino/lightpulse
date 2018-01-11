export function cssClasses(...classes) {
    return classes.reduce((acc, c) => ({ ...acc, [c]: true }), {});
}

export function Styled(styles) {
    return (...names) => {
        return cssClasses(...names.map(n => styles[n]));
    };
}
