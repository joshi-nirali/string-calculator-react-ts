import { Add, GetCalledCount, onAddEvent } from "../utils/StringCalculator";

describe("StringCalculator", () => {
  beforeEach(() => {
    (global as any).calledCount = 0;
  });

  test("adds empty string to 0", () => {
    expect(Add("")).toBe(0);
  });

  test("adds single number", () => {
    expect(Add("5")).toBe(5);
  });

  test("adds two numbers with comma", () => {
    expect(Add("1,2")).toBe(3);
  });

  test("adds multiple numbers with comma and newline", () => {
    expect(Add("1\n2,3")).toBe(6);
  });

  test("supports custom single-char delimiter", () => {
    expect(Add("//;\n1;2")).toBe(3);
  });

  test("Supports Multiplication useing single asterisk", () => {
    expect(Add("//*\n1*2")).toBe(2);
  });

  test("supports custom multi-char delimiter", () => {
    expect(Add("//[***]\n1***2***3")).toBe(6);
  });

  test("supports multiple custom delimiters", () => {
    expect(Add("//[*][%]\n1*2%3")).toBe(6);
  });

  test("supports multiple custom delimiters with multiple chars", () => {
    expect(Add("//[**][%%]\n1**2%%3")).toBe(6);
  });

  test("ignores numbers greater than 1000", () => {
    expect(Add("2,1001")).toBe(2);
  });

  test("throws error on negative numbers", () => {
    expect(() => Add("1,-2,3")).toThrow("negatives not allowed: -2");
  });

  test("throws error on multiple negative numbers", () => {
    expect(() => Add("1,-2,-3")).toThrow("negatives not allowed: -2, -3");
  });

  test("throws error on invalid number tokens", () => {
    expect(() => Add("1,abc")).toThrow('Invalid number found: "abc"');
  });

  test("throws error on malformed custom delimiter without newline", () => {
    expect(() => Add("//[***]1***2")).toThrow(
      "Invalid delimiter format: missing newline after delimiter declaration.",
    );
  });

  test("calls AddEvent with input and result", () => {
    let receivedInput = "";
    let receivedResult: number | string = 0;

    onAddEvent((input, result) => {
      receivedInput = input;
      receivedResult = result;
    });

    const result = Add("1,2,3");

    expect(receivedInput).toBe("1,2,3");
    expect(receivedResult).toBe(6);
    expect(result).toBe(6);
  });

  test("tracks Add call count", () => {
    Add("1,2");
    Add("3,4");
    expect(GetCalledCount()).toBeGreaterThanOrEqual(2); // depending on run order
  });

  test('allows newline between numbers: "1\\n2,3"', () => {
    expect(Add("1\n2,3")).toBe(6);
  });

  test('allows multiple newlines between numbers: "1\\n2\\n3"', () => {
    expect(Add("1\n2\n3")).toBe(6);
  });

  test('throws error on comma followed by newline: "1,\\n"', () => {
    expect(() => Add("1,\n")).toThrow(
      "Invalid input format: '\\n' must only appear between numbers and not adjacent to commas.",
    );
  });

  test('throws error on newline followed by comma: "1\\n,2"', () => {
    expect(() => Add("1\n,2")).toThrow(
      "Invalid input format: '\\n' must only appear between numbers and not adjacent to commas.",
    );
  });

  test('throws error on input starting with newline: "\\n1,2"', () => {
    expect(() => Add("\n1,2")).toThrow(
      "Invalid input format: '\\n' must only appear between numbers and not adjacent to commas.",
    );
  });

  test('throws error on input ending with newline: "1,2\\n"', () => {
    expect(() => Add("1,2\n")).toThrow(
      "Invalid input format: '\\n' must only appear between numbers and not adjacent to commas.",
    );
  });

  test('throws error on comma-newline-combo: "1,\\n2"', () => {
    expect(() => Add("1,\n2")).toThrow(
      "Invalid input format: '\\n' must only appear between numbers and not adjacent to commas.",
    );
  });
});
