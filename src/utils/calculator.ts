export function add(numbers: string): number {
    if (numbers === '') return 0;
    const normalized = numbers.replace(/\n/g, ',');
    const parts = normalized.split(',').map(Number);
    return parts.reduce((acc, curr) => acc + curr, 0);
}
