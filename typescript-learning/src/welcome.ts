function welcome(name: string | null): number {
    if (name === null) {
        return `Welcome!`;
    }
    return `Welcome, ${name}!`;
};