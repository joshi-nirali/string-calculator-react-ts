# 🧮 String Calculator - TDD Kata

This project is a React + TypeScript implementation of the classic **String Calculator Kata** by Roy Osherove. It is built with a test-driven development (TDD) approach and follows the step-by-step scenarios defined in the kata.

## 🚀 Features Implemented

- ✅ `Add(string numbers)` method:
  - Returns `0` for empty string
  - Returns the sum of up to 2 numbers (e.g. `"1,2"` → `3`)
  - Handles any number of comma-separated numbers
  - Accepts newlines as delimiters (e.g. `"1\n2,3"` → `6`)
  - Supports custom delimiters (e.g. `"//;\n1;2"` → `3`)
  - Supports multiple and multi-character delimiters (e.g. `"//[***][%%]\n1***2%%3"` → `6`)
  - Throws an error if any negative number is present
  - Ignores numbers greater than 1000
  - Tracks how many times `Add()` has been called

- ✅ `GetCalledCount()` method
- ✅ Optional event trigger after `Add()` (used for logging)
- ✅ Full test coverage with **Jest**
- ✅ User interface built with **React**, **Tailwind CSS**, and functional components

---

## 🧪 Run Tests

```bash
npm install
npm test
```
