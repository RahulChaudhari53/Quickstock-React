// src/components/ui/Modal.jsx 
import { X } from "lucide-react";

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) {
    return null;
  }

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
      onClick={onClose} // Close modal on backdrop click
    >
      {/* Modal Content */}
      <div
        className="relative w-full max-w-lg p-6 bg-gray-800 rounded-lg shadow-xl text-white font-inter border border-gray-700"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the content
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-600">
          <h2 className="text-2xl font-bold text-emerald-400">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}