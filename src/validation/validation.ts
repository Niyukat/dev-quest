export function isValid(errors: object): boolean {
    return Object.keys(errors).length === 0;
}