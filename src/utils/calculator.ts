export function add(numbers: string): number {
    if (numbers === '') return 0;
    const parts = numbers.split(',').map(Number);
    return parts.reduce((acc, curr) => acc + curr, 0);
}
