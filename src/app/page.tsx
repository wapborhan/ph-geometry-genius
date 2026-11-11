"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ShapeCard from "@/components/ShapeCard";
import CalculationEntry from "@/components/CalculationEntry";
import {
  triangleArea,
  rectangleArea,
  parallelogramArea,
  rhombusArea,
  pentagonArea,
  ellipseArea,
} from "@/lib/areaUtils";
import triangleImg from "../../public/images/triangle.png";
import rectangleImg from "../../public/images/rectangle.png";
import parallelogramImg from "../../public/images/parallelogram.png";
import rhombusImg from "../../public/images/rhombus.png";
import pentagonImg from "../../public/images/pentagon.png";
import ellipseImg from "../../public/images/ellipse.png";

type Entry = {
  name: string;
  area: number;
};

const STORAGE_KEY = "geometry-entries";

const SHAPES = [
  {
    title: "Triangle",
    formula: "A = 0.5 × b × h",
    image: triangleImg,
    inputs: [{ label: "base" }, { label: "height" }],
    calculate: ([b, h]: number[]) => triangleArea(b, h),
  },
  {
    title: "Rectangle",
    formula: "A = w × l",
    image: rectangleImg,
    inputs: [{ label: "width" }, { label: "length" }],
    calculate: ([w, l]: number[]) => rectangleArea(w, l),
  },
  {
    title: "Parallelogram",
    formula: "A = b × h",
    image: parallelogramImg,
    inputs: [{ label: "base" }, { label: "height" }],
    calculate: ([b, h]: number[]) => parallelogramArea(b, h),
  },
  {
    title: "Rhombus",
    formula: "A = 0.5 × d₁ × d₂",
    image: rhombusImg,
    inputs: [{ label: "d1" }, { label: "d2" }],
    calculate: ([d1, d2]: number[]) => rhombusArea(d1, d2),
  },
  {
    title: "Pentagon",
    formula: "A = 0.5 × p × a",
    image: pentagonImg,
    inputs: [{ label: "perimeter" }, { label: "apothem" }],
    calculate: ([p, a]: number[]) => pentagonArea(p, a),
  },
  {
    title: "Ellipse",
    formula: "A = πab",
    image: ellipseImg,
    inputs: [{ label: "a" }, { label: "b" }],
    calculate: ([a, b]: number[]) => ellipseArea(a, b),
  },
];

export default function Home() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setEntries(parsed);
        }
      }
    } catch {
      // Ignore malformed localStorage data
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries, isHydrated]);

  const addEntry = (name: string, area: number) => {
    setEntries((prev) => [...prev, { name, area }]);
  };

  const clearEntries = () => {
    setEntries([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <>
      <header className="sticky top-0 z-20 bg-white/85 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm shadow-indigo-600/20 shrink-0">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
                aria-hidden="true"
              >
                <path d="M3 20h18L12 4Z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 leading-tight">
                Interactive Geometry Genius
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">
                Calculate 2D shape areas in cm<sup>2</sup> with instant history
              </p>
            </div>
          </div>

          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600">
            6 Shapes &middot; Unit: cm<sup>2</sup>
          </span>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
          <section
            aria-label="Geometry shapes"
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 lg:col-span-8 xl:col-span-9 gap-6"
          >
            {SHAPES.map((shape) => (
              <ShapeCard
                key={shape.title}
                title={shape.title}
                formula={shape.formula}
                image={shape.image}
                inputs={shape.inputs}
                onCalculate={shape.calculate}
                onResult={addEntry}
              />
            ))}
          </section>

          <div className="lg:col-span-4 xl:col-span-3">
            <CalculationEntry entries={entries} onClear={clearEntries} />
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200/80 bg-white/80 py-5 px-4 text-center text-sm text-slate-600">
        Created By{" "}
        <Link
          href="https://www.wapborhan.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-rose-600 hover:text-rose-700 underline underline-offset-4 decoration-rose-300 hover:decoration-rose-500 transition-colors"
        >
          Borhan Uddin
        </Link>
      </footer>
    </>
  );
}
