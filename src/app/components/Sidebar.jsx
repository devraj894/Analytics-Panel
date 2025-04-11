"use client";
import { TbPageBreak } from "react-icons/tb";
import { RiBarChartFill } from "react-icons/ri";
import { TfiMedallAlt } from "react-icons/tfi";
import { IoClose } from "react-icons/io5";

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 opacity-40 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        w-60 bg-white p-4 transition-transform duration-300 ease-in-out border-r border-gray-200
        ${isOpen ? "fixed top-0 left-0 h-full z-50 transform translate-x-0" : "fixed top-0 left-0 h-full z-50 transform -translate-x-full"}
        md:static md:translate-x-0 md:h-auto md:z-auto md:block
      `}
      >
        {/* Close button (mobile only) */}
        <div className="flex justify-end md:hidden text-black">
          <button onClick={onClose}>
            <IoClose size={24} />
          </button>
        </div>

        <ul className="space-y-4 text-sm mt-4 md:mt-7">
          <li className="flex items-center gap-3 font-bold text-gray-600 hover:bg-blue-50 px-3 py-2 rounded cursor-pointer">
            <RiBarChartFill />
            <span>Dashboard</span>
          </li>
          <li className="flex items-center gap-3 font-semibold text-blue-600 bg-blue-100 px-3 py-2 rounded font-medium cursor-pointer">
            <TfiMedallAlt />
            <span>Skill Test</span>
          </li>
          <li className="flex items-center gap-3 font-bold text-gray-600 hover:bg-blue-50 px-3 py-2 rounded cursor-pointer">
            <TbPageBreak />
            <span>Internship</span>
          </li>
        </ul>
      </aside>
    </>
  );
}
