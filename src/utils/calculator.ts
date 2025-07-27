export function add(numbers: string): number {
    if (numbers === '') return 0;
    if (!numbers.includes(',')) return parseInt(numbers);
    return 0;
}
