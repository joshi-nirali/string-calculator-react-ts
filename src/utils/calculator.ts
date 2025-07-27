export function add(numbers: string): number {
    if (numbers === '') return 0;
    const parts = numbers.split(',');
    return parts.reduce((acc, curr) => acc + Number(curr), 0);
}  
