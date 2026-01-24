type Props = {
  entries: { name: string; area: number }[];
  onClear: () => void;
};

export default function CalculationEntry({ entries, onClear }: Props) {
  const lastTenEntries = entries.slice(-10);

  return (
    <div className="sticky top-5 border border-[#888] rounded-2xl py-4 px-6 md:col-span-1 col-span-1">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl">Area Calculator</h2>
      </div>
      {entries.length > 0 ? (
        <button
          onClick={onClear}
          className="text-sm bg-red-500 w-full cursor-pointer text-white px-3 py-1 rounded-lg"
        >
          Clear All
        </button>
      ) : (
        ""
      )}

      {lastTenEntries.length === 0 && (
        <p className="text-gray-400">No history yet</p>
      )}

      {lastTenEntries.map((e, i) => (
        <p key={i}>
          {entries.length - lastTenEntries.length + i + 1}. {e.name} {e.area} cm
          <sup>2</sup>
        </p>
      ))}
    </div>
  );
}
