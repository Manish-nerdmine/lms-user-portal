import React, { useState } from "react";

// --- Inline SVG Icons (Replacing react-icons/ai) ---

// Close Icon (AiOutlineClose equivalent)
const CloseIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

// Upload Icon (AiOutlineUpload equivalent)
const UploadIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
    />
  </svg>
);

// --- TicketModal Component ---

const TicketModal = ({ isOpen, onClose }) => {
  // State variables for the form inputs
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null); // File is initialized to null

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic (simulated)
    console.log("Submitting Ticket:", {
      title,
      description,
      file: file ? file.name : "No file",
    });

    // Close the modal and reset state
    onClose();
    setTitle("");
    setDescription("");
    setFile(null);
  };

  if (!isOpen) return null;

  return (
    // Modal Backdrop
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0 bg-gray-900 bg-opacity-70 backdrop-blur-sm transition-opacity duration-300">
      {/* Modal Content Card */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-auto transform transition-all duration-300 scale-100 p-6 relative border border-gray-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition duration-150 p-1 rounded-full hover:bg-gray-100"
          aria-label="Close modal"
        >
          <CloseIcon className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Raise a Support Ticket
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div>
            <label
              htmlFor="ticket-title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title <span className="text-red-500">*</span>
            </label>
            <input
              id="ticket-title"
              type="text"
              placeholder="Brief description of your issue"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm"
              required
            />
          </div>

          {/* Description Textarea */}
          <div>
            <label
              htmlFor="ticket-description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="ticket-description"
              placeholder="Please provide detailed information about your issue..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 w-full h-32 resize-none focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm"
              required
            />
          </div>

          {/* File Upload Area */}
          {/* File Upload Area */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Attach File (Optional)
            </label>
            <label className="flex flex-col items-center border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition duration-200">
              <UploadIcon className="text-blue-500 mb-1 h-5 w-5" />{" "}
              {/* chhota icon */}
              <span className="text-gray-600 text-sm font-medium mb-1 text-center">
                {file ? `File selected: ${file.name}` : "Click to upload files"}
              </span>
              <span className="text-gray-500 text-xs text-center">
                Max 10MB each (JPG, PNG, PDF, DOC, TXT)
              </span>
              <input
                type="file"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition duration-150"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-150 shadow-md shadow-blue-300"
            >
              Submit Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketModal;
