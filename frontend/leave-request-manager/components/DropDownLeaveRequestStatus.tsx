import React, { useState, useEffect } from "react";

interface DropdownProps {
  leaveRequestStatusOld?: string;
  onSelect: (selectedItem: string) => void;
}

export default function DropDownLeaveRequestStatus({
  leaveRequestStatusOld,
  onSelect,
}: DropdownProps) {
  const [selectedStatud, setSelectedStatud] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [zIndex, setZIndex] = useState(1);
  const data = ["Requested", "Approved", "Rejected"];

  const handleSelect = (item: string) => {
    setSelectedStatud(item);
    onSelect(item);
    toggleDropdown();
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setZIndex(2);
    } else {
      setZIndex(1);
    }
  };

  const handleItemMouseDown = (event: React.MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    const selectedItemName = event.currentTarget.textContent;
    const selectedItem = data.find((item) => item === selectedItemName);

    if (selectedItem) {
      handleSelect(selectedItem);
    }
  };

  useEffect(() => {
    if (leaveRequestStatusOld !== undefined) {
      const leaveRequestStatus = data.find(
        (item) => item === leaveRequestStatusOld
      );
      if (leaveRequestStatus) {
        setSelectedStatud(leaveRequestStatus);
      }
    }
  }, [leaveRequestStatusOld]);

  return (
    <div className="relative">
      <button
        type="button"
        className="block w-full px-4 py-2 text-left bg-white border rounded shadow-sm focus:ring focus:ring-opacity-50"
        onClick={toggleDropdown}
      >
        {selectedStatud ? selectedStatud : "Select a Status"}
      </button>
      {isOpen && (
          <ul
          className="absolute w-full py-2 mt-1 space-y-1 bg-white border rounded shadow-sm"
          style={{ zIndex: zIndex }}
        >
          {data.map((item) => (
            <li
              key={item}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onMouseDown={handleItemMouseDown}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
