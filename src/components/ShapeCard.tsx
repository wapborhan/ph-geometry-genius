"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  title: string;
  formula: string;
  image: string;
  onCalculate: (values: number[]) => number;
  inputs: { label: string }[];
  onResult: (title: string, area: number) => void;
};

export default function ShapeCard({
  title,
  formula,
  image,
  inputs,
  onCalculate,
  onResult,
}: Props) {
  const [values, setValues] = useState<string[]>(Array(inputs.length).fill(""));
  const [area, setArea] = useState<number>(0);

  const handleCalculate = () => {
    try {
      const nums = values.map((v) => {
        const n = parseFloat(v);

        // ❌ not a number
        if (isNaN(n)) throw new Error("NaN");

        // ❌ negative or zero
        if (n <= 0) throw new Error("NEGATIVE");

        return n;
      });

      const result = onCalculate(nums);
      setArea(result);
      onResult(title, result);

      // ✅ clear inputs
      setValues(Array(inputs.length).fill(""));
    } catch (err) {
      alert("Please insert positive numbers only");
    }
  };

  return (
    <div className="card w-full bg-base-100 shadow-md border rounded-2xl border-[#888] p-5">
      <figure className="flex justify-center items-center">
        <Image
          src={image}
          alt={title}
          width={200}
          height={150}
          className="w-40 h-40"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title text-2xl text-center font-bold mt-4">
          {title}
        </h2>
        <p>{formula}</p>

        <div className="flex gap-3 mb-3">
          {inputs.map((input, i) => (
            <input
              key={i}
              type="number"
              min={1}
              placeholder={input.label}
              value={values[i] || ""}
              className="border bg-gray-200 text-xl w-1/2 h-10 px-2 rounded-md capitalize"
              onChange={(e) => {
                const copy = [...values];
                copy[i] = e.target.value;
                setValues(copy);
              }}
            />
          ))}
        </div>
        <p className="text-2xl">
          Area : {area} cm<sup>2</sup>
        </p>
        <button
          onClick={handleCalculate}
          className="bg-green-600 p-3 rounded-xl text-white text-xl w-full cursor-pointer"
        >
          Calculate
        </button>
      </div>
    </div>
  );
}
