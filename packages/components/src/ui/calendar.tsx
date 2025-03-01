"use client";

import React from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { DayPicker } from "react-day-picker";

import { buttonVariants } from "../ui/button";
import { CalendarProps } from "../input.type";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLabelRenderer,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      classNames={{
        months: "months",
        month: "month",
        caption: "caption",
        caption_label: "caption-label",
        nav: "nav",
        nav_button: `${buttonVariants({ variant: "outline" })} nav-button`,
        nav_button_previous: "nav-prev",
        nav_button_next: "nav-next",
        table: "calendar-table",
        head_row: "head-row",
        head_cell: "head-cell",
        row: "row",
        cell: `cell ${props.mode === "range" ? "range-cell" : "single"}`,
        day: `${buttonVariants({ variant: "ghost" })} day`,
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected: "day-selected",
        day_today: "day-today",
        day_outside: "dayoutside day-outside",
        day_disabled: "day-disabled",
        day_range_middle: "day-range-middle",
        day_hidden: "day-hidden",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <LuChevronLeft className={`icon-size ${className}`} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <LuChevronRight className={`icon-size ${className}`} {...props} />
        ),
        CaptionLabel: captionLabelRenderer,
      }}
      // captionLayout="dropdown-buttons"
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
