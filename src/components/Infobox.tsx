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
      className={`my-4 md:my-0 md:ml-6 md:float-right md:w-72 lg:w-80 rounded-xl border border-brand-300 bg-white shadow-xs overflow-hidden text-xs ${className}`}
    >
      {/* 헤더 */}
      <div className="bg-brand-600 text-white px-4 py-2.5 font-bold text-center flex items-center justify-center gap-1.5 tracking-tight border-b border-brand-700">
        <Sparkles className="w-3.5 h-3.5 text-brand-200" />
        <span className="text-sm">{title}</span>
      </div>

      {/* 테이블 */}
      <table className="w-full border-collapse">
        <tbody className="divide-y divide-brand-100/70">
          {Object.entries(data).map(([key, value]) => (
            <tr key={key} className="hover:bg-brand-50/20 transition-colors">
              <th className="py-2 px-3 text-left font-semibold text-brand-950 bg-brand-50/70 w-1/3 border-r border-brand-100/70 align-top">
                {key}
              </th>
              <td className="py-2 px-3 text-wiki-text break-words font-medium leading-relaxed">
                {value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
