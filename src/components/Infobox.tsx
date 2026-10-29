import React from "react";

interface InfoboxProps {
  title: string;
  data?: Record<string, string>;
  className?: string;
}

export function Infobox({ title, data, className = "" }: InfoboxProps) {
  if (!data || Object.keys(data).length === 0) return null;

  return (
    <div
      className={`my-4 md:my-0 md:ml-6 md:float-right md:w-72 lg:w-80 border border-[#DDD8E6] bg-white rounded shadow-2xs overflow-hidden text-xs ${className}`}
    >
      {/* 나무위키형 상단 헤더 */}
      <div className="bg-[#58307E] text-white px-3 py-2 font-bold text-center border-b border-[#472566]">
        <span className="text-sm tracking-tight">{title}</span>
      </div>

      {/* 속성 테이블 */}
      <table className="w-full border-collapse">
        <tbody className="divide-y divide-[#EBE7F2]">
          {Object.entries(data).map(([key, value]) => (
            <tr key={key} className="hover:bg-[#FAF8FD] transition-colors">
              <th className="py-2 px-3 text-left font-semibold text-[#2A1740] bg-[#F1EDF6] w-1/3 border-r border-[#EBE7F2] align-top select-none">
                {key}
              </th>
              <td className="py-2 px-3 text-[#212529] break-words font-medium leading-relaxed">
                {value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
