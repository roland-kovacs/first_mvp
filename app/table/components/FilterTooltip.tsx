"use client";

import { Input } from "@/components/ui/input";
import { Filter, FilterX, X } from "lucide-react";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface FilterTooltipProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export function FilterTooltip({ value, onChange, placeholder }: FilterTooltipProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="p-1 hover:bg-gray-100 rounded-md">
          {value ? (
            <FilterX className="h-4 w-4 text-blue-500" />
          ) : (
            <Filter className="h-4 w-4" />
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-40 p-2" align="start" side="top">
        <div className="flex items-center gap-1">
          <Input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="h-8"
            autoFocus
          />
          {value && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onChange("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
} 