let calledCount = 1;

type AddEventHandler = (input: string, result: number | string) => void;
let addEventCallback: AddEventHandler | null = null;

export function onAddEvent(cb: AddEventHandler) {
  addEventCallback = cb;
}

export function GetCalledCount() {
  return calledCount;
}

export function Add(input: string): number {
  calledCount++;

  if (typeof input !== "string") {
    throw new Error("Invalid input: must be a string.");
  }

  input = input.replace(/\\n/g, "\n");

  let delimiters: string[] = [",", "\n"];
  let numStr = input;
  const newlineIndex = input.indexOf("\n");
  const delimiterDef = input.substring(2, newlineIndex);

  if (input.startsWith("//")) {

    if (newlineIndex === -1) {
      throw new Error(
        "Invalid delimiter format: missing newline after delimiter declaration.",
      );
    }

    numStr = input.substring(newlineIndex + 1);

    const matches = [...delimiterDef.matchAll(/\[(.+?)\]/g)].map((m) => m[1]);

    if (matches.length > 0) {
      delimiters = matches;
    } else if (delimiterDef.length === 1) {
      delimiters = [delimiterDef];
    } else {
      throw new Error(
        `Invalid custom delimiter format: "${delimiterDef}". Use //[delim]\\n or //[d1][d2]\\n`,
      );
    }
  }

  if (
    numStr.includes(",\n") ||
    numStr.includes("\n,") ||
    numStr.startsWith("\n") ||
    numStr.endsWith("\n")
  ) {
    throw new Error(
      "Invalid input format: '\\n' must only appear between numbers and not adjacent to commas.",
    );
  }

  const delimiterRegex = new RegExp(
    delimiters.map((d) => d.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&")).join("|"),
    "g",
  );

  const tokens = numStr.split(delimiterRegex);

  const negatives: string[] = [];
  let sum = 0;
  let multiply = 1;

  for (const token of tokens) {
    const t = token.trim();
    if (!t) continue;

    const num = Number(t);
    if (isNaN(num)) {
      throw new Error(`Invalid number found: "${token}"`);
    }

    if (num < 0) {
      negatives.push(num.toString());
    } else if (num <= 1000) {
      sum += num;
      multiply *= num;
    }
  }

  if (negatives.length > 0) {
    throw new Error(`negatives not allowed: ${negatives.join(", ")}`);
  }

  if (addEventCallback) {
    addEventCallback(input, sum);
  }
  if (delimiterDef === "*") {
    return multiply;
  } else {
    return sum;
  }
}
