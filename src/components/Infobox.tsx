import React from "react";
import { Sparkles } from "lucide-react";

interface InfoboxProps {
  title: string;
  data?: Record<string, string>;
  className?: string;
}

export function Infobox({ title, data, className = "" }: InfoboxProps) {
  if (!data || Object.keys(data).length === 0) return null;

  return (
    <div
      className={`my-4 md:my-0 md:ml-6 md:float-right md:w-72 lg:w-80 rounded-xl border border-brand-200 bg-white shadow-sm overflow-hidden text-sm ${className}`}
    >
      <div className="bg-gradient-to-r from-brand-600 to-brand-500 text-white px-4 py-3 font-bold text-center flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 text-brand-200" />
        <span>{title}</span>
      </div>
      <table className="w-full border-collapse">
        <tbody>
          {Object.entries(data).map(([key, value], idx) => (
            <tr
              key={key}
              className={idx % 2 === 0 ? "bg-brand-50/40" : "bg-white"}
            >
              <th className="py-2.5 px-3.5 text-left font-semibold text-wiki-text text-xs uppercase tracking-wider w-1/3 border-b border-brand-100/60 align-top">
                {key}
              </th>
              <td className="py-2.5 px-3.5 text-wiki-text text-xs border-b border-brand-100/60 break-words font-medium">
                {value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
