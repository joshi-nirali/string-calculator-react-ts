export function add(numbers: string): number {
    if (numbers === '') return 0;
    const parts = numbers.split(',');
    return Number(parts[0]) + Number(parts[1]);
}
