// DropdownComponent.jsx

import React from "react";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Button, DropdownMenu } from "@radix-ui/themes";

const Dropdown = ({ onEdit, onDelete, employeeId, employee }) => {
  const handleUpdateClick = () => {
    onEdit(employee);
  };
  const handleDeleteClick = () => {
    // Assuming you have access to the employee information, pass it to onDelete
    onDelete({ empId: employeeId });
  };
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="soft">
          <DotsHorizontalIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item onClick={handleUpdateClick} shortcut="⌘ E">
          Edit
        </DropdownMenu.Item>

        <DropdownMenu.Item
          onClick={handleDeleteClick}
          shortcut="⌘ ⌫"
          color="red"
        >
          Delete
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default Dropdown;
