import React from "react";
import { Sparkles, Star } from "lucide-react";

interface InfoboxProps {
  title: string;
  data?: Record<string, string>;
  className?: string;
}

export function Infobox({ title, data, className = "" }: InfoboxProps) {
  if (!data || Object.keys(data).length === 0) return null;

  return (
    <div
      className={`my-4 md:my-0 md:ml-6 md:float-right md:w-72 lg:w-80 rounded-2xl border-2 border-pink-200 bg-white shadow-xs overflow-hidden text-xs ${className}`}
    >
      {/* 마법소녀 핑크-퍼플 헤더 */}
      <div className="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 text-white px-4 py-2.5 font-bold text-center flex items-center justify-center gap-1.5 tracking-tight border-b border-pink-300">
        <Sparkles className="w-3.5 h-3.5 text-amber-200" />
        <span className="text-sm font-extrabold">{title}</span>
        <Star className="w-3 h-3 text-amber-300 fill-amber-200" />
      </div>

      {/* 테이블 */}
      <table className="w-full border-collapse">
        <tbody className="divide-y divide-purple-100/70">
          {Object.entries(data).map(([key, value]) => (
            <tr key={key} className="hover:bg-pink-50/20 transition-colors">
              <th className="py-2.5 px-3 text-left font-semibold text-purple-950 bg-purple-50/60 w-1/3 border-r border-purple-100/70 align-top">
                {key}
              </th>
              <td className="py-2.5 px-3 text-wiki-text break-words font-medium leading-relaxed">
                {value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
