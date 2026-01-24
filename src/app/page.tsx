"use client";

import { useEffect, useState } from "react";
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
import Link from "next/link";

type Entry = {
  name: string;
  area: number;
};

export default function Home() {
  const [entries, setEntries] = useState<Entry[]>([]);

  // ✅ Load from localStorage (only once)
  useEffect(() => {
    const stored = localStorage.getItem("geometry-entries");
    if (stored) {
      setEntries(JSON.parse(stored));
    }
  }, []);

  // ✅ Save to localStorage whenever entries change
  useEffect(() => {
    localStorage.setItem("geometry-entries", JSON.stringify(entries));
  }, [entries]);

  const addEntry = (name: string, area: number) => {
    setEntries((prev) => [...prev, { name, area }]);
  };
  const clearEntries = () => {
    setEntries([]);
    localStorage.removeItem("geometry-entries");
  };

  return (
    <>
      <header className="py-5 text-center text-2xl font-bold border-b border-[#888]">
        <h2>Interactive Geometry Genius</h2>
      </header>

      <main className="container mx-auto mt-5 grid grid-cols-1 md:grid-cols-3 gap-5 p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:col-span-2 gap-6">
          <ShapeCard
            title="Triangle"
            formula="A = 0.5 × b × h"
            image="/images/triangle.png"
            inputs={[{ label: "base" }, { label: "height" }]}
            onCalculate={([b, h]) => triangleArea(b, h)}
            onResult={addEntry}
          />

          <ShapeCard
            title="Rectangle"
            formula="A = w × l"
            image="/images/rectangle.png"
            inputs={[{ label: "width" }, { label: "length" }]}
            onCalculate={([w, l]) => rectangleArea(w, l)}
            onResult={addEntry}
          />

          <ShapeCard
            title="Parallelogram"
            formula="A = b × h"
            image="/images/parallelogram.png"
            inputs={[{ label: "base" }, { label: "height" }]}
            onCalculate={([b, h]) => parallelogramArea(b, h)}
            onResult={addEntry}
          />

          <ShapeCard
            title="Rhombus"
            formula="A = 0.5 × d₁ × d₂"
            image="/images/rhombus.png"
            inputs={[{ label: "d1" }, { label: "d2" }]}
            onCalculate={([d1, d2]) => rhombusArea(d1, d2)}
            onResult={addEntry}
          />

          <ShapeCard
            title="Pentagon"
            formula="A = 0.5 × p × a"
            image="/images/pentagon.png"
            inputs={[{ label: "perimeter" }, { label: "apothem" }]}
            onCalculate={([p, a]) => pentagonArea(p, a)}
            onResult={addEntry}
          />

          <ShapeCard
            title="Ellipse"
            formula="A = πab"
            image="/images/ellipse.png"
            inputs={[{ label: "a" }, { label: "b" }]}
            onCalculate={([a, b]) => ellipseArea(a, b)}
            onResult={addEntry}
          />
        </div>

        <CalculationEntry entries={entries} onClear={clearEntries} />
      </main>
      <footer className="py-5 text-center text-2xl font-bold border-t border-[#888]">
        Created By{" "}
        <Link href="https://www.wapborhan.com" className="text-red-600">
          Borhan Uddin
        </Link>
      </footer>
    </>
  );
}
