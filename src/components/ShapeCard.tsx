"use client";

import Image, { type StaticImageData } from "next/image";
import { FormEvent, useId, useState } from "react";
import { formatArea } from "@/lib/areaUtils";

type Props = {
  title: string;
  formula: string;
  image: StaticImageData | string;
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
  const [values, setValues] = useState<string[]>(() =>
    Array(inputs.length).fill("")
  );
  const [area, setArea] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const baseId = useId();

  const handleCalculate = (e: FormEvent) => {
    e.preventDefault();

    const parsed: number[] = [];
    for (const raw of values) {
      const n = parseFloat(raw);
      if (isNaN(n) || n <= 0) {
        setError("Please enter positive numbers greater than 0.");
        return;
      }
      parsed.push(n);
    }

    const result = onCalculate(parsed);
    setError(null);
    setArea(result);
    onResult(title, result);
    setValues(Array(inputs.length).fill(""));
  };

  return (
    <article className="group bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col overflow-hidden">
      <div className="relative h-44 bg-geo-grid border-b border-slate-100 px-6 py-5 flex items-center justify-center overflow-hidden">
        <Image
          src={image}
          alt={`${title} diagram`}
          width={typeof image === "string" ? 200 : undefined}
          height={typeof image === "string" ? 150 : undefined}
          className="max-h-28 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-xs"
        />
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center justify-between gap-2 mb-4">
          <h2 className="text-lg font-bold tracking-tight text-slate-900">
            {title}
          </h2>
          <span className="font-mono text-xs font-medium text-indigo-700 bg-indigo-50 border border-indigo-200/70 px-2.5 py-1 rounded-full whitespace-nowrap">
            {formula}
          </span>
        </div>

        <form onSubmit={handleCalculate} noValidate className="flex flex-col flex-1 gap-3.5">
          <div className="grid grid-cols-2 gap-3">
            {inputs.map((input, i) => {
              const inputId = `${baseId}-${i}`;
              return (
                <div key={input.label} className="flex flex-col gap-1">
                  <label
                    htmlFor={inputId}
                    className="text-xs font-medium tracking-wide text-slate-600 capitalize"
                  >
                    {input.label}
                  </label>
                  <div className="relative">
                    <input
                      id={inputId}
                      type="number"
                      step="any"
                      min="0"
                      placeholder="0"
                      value={values[i] ?? ""}
                      onChange={(e) => {
                        const copy = [...values];
                        copy[i] = e.target.value;
                        setValues(copy);
                        if (error) setError(null);
                      }}
                      className={`w-full h-10 pl-3 pr-9 rounded-xl border bg-slate-50/70 text-sm font-mono text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:bg-white focus:ring-2 ${
                        error
                          ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/20"
                          : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20"
                      }`}
                    />
                    <span className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center text-xs font-medium text-slate-400">
                      cm
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {error && (
            <p role="alert" className="text-xs font-medium text-rose-600">
              {error}
            </p>
          )}

          <div className="mt-auto pt-1 flex flex-col gap-3">
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl px-3.5 py-2.5 flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
                Area
              </span>
              <span className="font-mono text-base font-bold text-slate-900 tabular-nums">
                {formatArea(area)}{" "}
                <span className="text-xs font-medium text-slate-500">
                  cm<sup>2</sup>
                </span>
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-sm shadow-xs transition-colors cursor-pointer"
            >
              Calculate
            </button>
          </div>
        </form>
      </div>
    </article>
  );
}
