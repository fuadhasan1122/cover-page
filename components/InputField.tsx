// Inside components/InputField.tsx
export default function InputField({ label, value, onChange, type = "text", required }: any) {
  return (
    <div className="space-y-1 w-full">
      <label className="text-xs font-bold text-gray-500 ml-1 uppercase">
        {label} {required && "*"}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3.5 bg-gray-100 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
      />
    </div>
  );
}