import React, { useState, useEffect } from "react";
import { Add, GetCalledCount, onAddEvent } from "../utils/StringCalculator";

const StringCalculatorForm: React.FC = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [callCount, setCallCount] = useState<number>(0);

  useEffect(() => {
    onAddEvent((inputString, result) => {
      console.log("AddEvent Fired:", { inputString, result });
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const output = Add(input);
      setResult(output);
      setError(null);
      setCallCount(GetCalledCount());
    } catch (err: any) {
      setResult(null);
      setError(err.message || "Unknown error");
      setCallCount(GetCalledCount());
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center text-indigo-600">
        String Calculator
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Enter string like: 1,2 or //[*]\n1*2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-200"
        >
          Calculate
        </button>
      </form>

      {result !== null && (
        <div className="p-4 bg-green-100 text-green-700 rounded-md text-center">
          Result: <strong>{result}</strong>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-md text-center">
          Error: {error}
        </div>
      )}

      <div className="text-sm text-gray-500 text-center">
        Total Add() calls: <strong>{callCount}</strong>
      </div>
    </div>
  );
};

export default StringCalculatorForm;
