/**
 * TimeSlotPicker Component
 * Version: 1.0
 * Created: 2025-12-01
 * Modified By: Claude Code
 *
 * Time slot selection component with AM/PM columns
 * Shows available time slots as clickable buttons
 */

'use client';

interface TimeSlotPickerProps {
  selectedDate: string; // YYYY-MM-DD format
  selectedTime: string; // HH:MM format
  onTimeSelect: (time: string) => void;
  busySlots: string[]; // Array of busy time slots in HH:MM format
  isLoading: boolean;
}

export default function TimeSlotPicker({
  selectedDate,
  selectedTime,
  onTimeSelect,
  busySlots,
  isLoading,
}: TimeSlotPickerProps) {
  // Generate time slots (7:00 AM to 7:30 PM)
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 7; hour <= 19; hour++) {
      const hourStr = hour.toString().padStart(2, '0');
      slots.push(`${hourStr}:00`);
      slots.push(`${hourStr}:30`);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Convert 24-hour time to 12-hour format
  const formatTime = (time: string) => {
    const [hour, minute] = time.split(':');
    const hourNum = parseInt(hour);
    const period = hourNum >= 12 ? 'PM' : 'AM';
    const displayHour = hourNum === 0 ? 12 : hourNum > 12 ? hourNum - 12 : hourNum;
    return {
      display: `${displayHour}:${minute} ${period}`,
      hour: displayHour,
      minute,
      period,
    };
  };

  // Get day of week name
  const getDayName = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + 'T00:00:00');
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  };

  // Get formatted date
  const getFormattedDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + 'T00:00:00');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${getDayName(dateString)}, ${months[date.getMonth()]} ${date.getDate()}`;
  };

  // Split slots into AM and PM
  const amSlots = timeSlots.filter(slot => {
    const hour = parseInt(slot.split(':')[0]);
    return hour < 12;
  });

  const pmSlots = timeSlots.filter(slot => {
    const hour = parseInt(slot.split(':')[0]);
    return hour >= 12;
  });

  // Check if a slot is available
  const isSlotAvailable = (slot: string) => {
    return !busySlots.includes(slot);
  };

  const renderTimeSlotButton = (slot: string) => {
    const formatted = formatTime(slot);
    const isAvailable = isSlotAvailable(slot);
    const isSelected = selectedTime === slot;

    return (
      <button
        key={slot}
        type="button"
        onClick={() => isAvailable && onTimeSelect(slot)}
        disabled={!isAvailable || isLoading}
        className={`
          px-4 py-2.5 rounded-lg text-sm font-medium
          transition-all duration-200
          ${isSelected
            ? 'bg-[#16E3FF] text-slate-900 font-bold'
            : isAvailable
            ? 'bg-white/5 border border-white/20 text-white hover:bg-white/10 hover:border-[#16E3FF]'
            : 'bg-white/5 border border-white/10 text-white/30 cursor-not-allowed line-through'
          }
          ${!isAvailable && !isSelected ? 'opacity-40' : ''}
        `}
      >
        {formatted.display}
      </button>
    );
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-6">
      {/* Header */}
      <div className="mb-6">
        {selectedDate ? (
          <>
            <h3 className="text-white font-semibold text-lg mb-2">
              Available Times
            </h3>
            <p className="text-[#16E3FF] text-sm">
              {getFormattedDate(selectedDate)}
            </p>
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-white/60 text-lg">
              Select a date to view available times
            </p>
          </div>
        )}
      </div>

      {/* Loading State */}
      {isLoading && selectedDate && (
        <div className="text-center py-8">
          <div className="inline-block w-8 h-8 border-4 border-[#16E3FF] border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-white/60">Loading available times...</p>
        </div>
      )}

      {/* Time Slots */}
      {!isLoading && selectedDate && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* AM Column */}
          <div>
            <h4 className="text-[#16E3FF] font-semibold text-sm mb-3 text-center">
              Morning (AM)
            </h4>
            <div className="space-y-2">
              {amSlots.map(slot => renderTimeSlotButton(slot))}
            </div>
          </div>

          {/* PM Column */}
          <div>
            <h4 className="text-[#16E3FF] font-semibold text-sm mb-3 text-center">
              Afternoon/Evening (PM)
            </h4>
            <div className="space-y-2">
              {pmSlots.map(slot => renderTimeSlotButton(slot))}
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      {!isLoading && selectedDate && (
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-center gap-4 text-xs text-white/60">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-white/5 border border-white/20 rounded"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#16E3FF] rounded"></div>
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-white/5 border border-white/10 rounded opacity-40"></div>
            <span>Unavailable</span>
          </div>
        </div>
      )}
    </div>
  );
}
