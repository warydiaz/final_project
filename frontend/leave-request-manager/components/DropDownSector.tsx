import React, { useState, useEffect, useRef } from 'react';
import {Sector}  from './types'; 

interface DropdownProps {
  data: Sector[];
  onSelect: (selectedItem: Sector) => void
}

export default function DropDownSector({ data, onSelect }: DropdownProps){
    const [selectedItem, setSelectedItem] = useState<Sector | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
  
    const handleSelect = (item: Sector) => {
      setSelectedItem(item);
      onSelect(item);
      toggleDropdown(); 
    };
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

    const handleItemMouseDown = (event: React.MouseEvent<HTMLLIElement>) => {
        event.preventDefault();
        const selectedItemName = event.currentTarget.textContent;
        const selectedItem = data.find((item) => item.name === selectedItemName);
    
        if (selectedItem) {
          handleSelect(selectedItem);
        }
      };
  
    return (
      <div className="relative">
        <button
          type="button"
          className="block w-full px-4 py-2 text-left bg-white border rounded shadow-sm focus:ring focus:ring-opacity-50"
          onClick={toggleDropdown}
        >
          {selectedItem ? selectedItem.name : 'Selecciona un sector'}
        </button>
        {isOpen && (
          <ul className="absolute w-full py-2 mt-1 space-y-1 bg-white border rounded shadow-sm">
            {data.map((item) => (
              <li
                key={item.id}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onMouseDown={handleItemMouseDown}
              >
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

