export function add(numbers: string): number {
    if (numbers === '') return 0;

    let delimiter = /,|\n/;
    if (numbers.startsWith('//')) {
        const parts = numbers.split('\n');
        delimiter = new RegExp(parts[0].slice(2));
        numbers = parts[1];
    }

    const parts = numbers.split(delimiter).map(Number);
    const negatives = parts.filter(n => n < 0);

    if (negatives.length > 0) {
        throw new Error(`Negative numbers not allowed: ${negatives.join(',')}`);
    }

    return parts.reduce((acc, curr) => acc + curr, 0);
}
