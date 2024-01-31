import React from "react";
// Icons
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
// Component
import * as Select from "@radix-ui/react-select";
import classnames from "classnames";

const SelectionBox = ({ onChange }) => {
  const handleSelectionChange = (value) => {
    console.log("SelectionBox - Selected Value:", value);
    onChange(value);
  };
  return (
    <Select.Root>
      <Select.Trigger
        className="inline-flex items-center justify-center rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-white text-secondBlack shadow-3xl shadow-shadow-500  focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-black outline-none"
        aria-label="number"
      >
        <Select.Value placeholder="5" />
        <Select.Icon className="text-violet11">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
          <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-secondBlack cursor-default">
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className="p-[5px]">
            <Select.Group>
              <Select.Label className="px-[25px] text-xs leading-[25px] text-white">
                5
              </Select.Label>
              <SelectItem value="5" onSelect={() => handleSelectionChange(5)}>
                5
              </SelectItem>
              <SelectItem value="10" onSelect={() => handleSelectionChange(10)}>
                10
              </SelectItem>
              <SelectItem value="15" onSelect={() => handleSelectionChange(15)}>
                15
              </SelectItem>
              <SelectItem value="20" onSelect={() => handleSelectionChange(20)}>
                20
              </SelectItem>
              <SelectItem value="25" onSelect={() => handleSelectionChange(25)}>
                25
              </SelectItem>
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-navy-500 cursor-default">
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

const SelectItem = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={classnames(
          "text-[13px] leading-none text-secondBlack rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-white data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-navy-500 data-[highlighted]:text-white",
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

export default SelectionBox;
