/**
 * CalendarPicker Component
 * Version: 1.0
 * Created: 2025-12-01
 * Modified By: Claude Code
 *
 * Visual month calendar picker for booking system
 * Features: Month navigation, date selection, highlight today, gray out past dates
 */

'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

interface CalendarPickerProps {
  selectedDate: string; // YYYY-MM-DD format
  onDateSelect: (date: string) => void;
  minDate?: string; // YYYY-MM-DD format
}

export default function CalendarPicker({ selectedDate, onDateSelect, minDate }: CalendarPickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Parse selected date
  const selectedDateObj = selectedDate ? new Date(selectedDate + 'T00:00:00') : null;

  // Parse min date
  const minDateObj = minDate ? new Date(minDate + 'T00:00:00') : today;

  // Get first day of the month (0 = Sunday, 6 = Saturday)
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const startingDayOfWeek = firstDayOfMonth.getDay();

  // Get number of days in the month
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();

  // Month names
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Navigate to previous month
  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Handle date click
  const handleDateClick = (day: number) => {
    const clickedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    clickedDate.setHours(0, 0, 0, 0);

    // Don't allow selecting past dates
    if (clickedDate < minDateObj) {
      return;
    }

    // Format as YYYY-MM-DD
    const year = clickedDate.getFullYear();
    const month = String(clickedDate.getMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    const dateString = `${year}-${month}-${dayStr}`;

    onDateSelect(dateString);
  };

  // Check if a date is today
  const isToday = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Check if a date is selected
  const isSelected = (day: number) => {
    if (!selectedDateObj) return false;
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return (
      date.getDate() === selectedDateObj.getDate() &&
      date.getMonth() === selectedDateObj.getMonth() &&
      date.getFullYear() === selectedDateObj.getFullYear()
    );
  };

  // Check if a date is in the past
  const isPast = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    date.setHours(0, 0, 0, 0);
    return date < minDateObj;
  };

  // Build calendar grid
  const calendarDays = [];

  // Empty cells before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="aspect-square" />);
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const isTodayDate = isToday(day);
    const isSelectedDate = isSelected(day);
    const isPastDate = isPast(day);

    calendarDays.push(
      <button
        key={day}
        type="button"
        onClick={() => handleDateClick(day)}
        disabled={isPastDate}
        className={`
          aspect-square rounded-lg flex items-center justify-center text-sm font-medium
          transition-all duration-200
          ${isPastDate
            ? 'text-white/20 cursor-not-allowed'
            : 'text-white hover:bg-white/10 cursor-pointer'
          }
          ${isSelectedDate
            ? 'bg-[#16E3FF] text-slate-900 font-bold hover:bg-[#16E3FF]'
            : ''
          }
          ${isTodayDate && !isSelectedDate
            ? 'border-2 border-[#16E3FF]'
            : 'border border-white/10'
          }
        `}
      >
        {day}
      </button>
    );
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-6">
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={previousMonth}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className="text-[#16E3FF]" size={20} />
        </button>

        <h3 className="text-white font-semibold text-lg">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>

        <button
          type="button"
          onClick={nextMonth}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="text-[#16E3FF]" size={20} />
        </button>
      </div>

      {/* Day Labels */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="aspect-square flex items-center justify-center text-xs font-semibold text-[#16E3FF]"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {calendarDays}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-center gap-4 text-xs text-white/60">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-[#16E3FF] rounded"></div>
          <span>Today</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#16E3FF] rounded"></div>
          <span>Selected</span>
        </div>
      </div>
    </div>
  );
}
