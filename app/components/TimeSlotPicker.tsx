/**
 * TimeSlotPicker Component
 * Version: 1.1
 * Modified: 2025-12-01 00:15:00 UTC
 * Modified By: Claude Code
 * Changes:
 * - Fixed availability check to properly filter busy slots
 * - Hide unavailable slots completely (don't show them)
 * - Improved button layout: group by hour pairs with consistent width
 */

'use client';

interface TimeSlotPickerProps {
  selectedDate: string; // YYYY-MM-DD format
  selectedTime: string; // HH:MM format
  onTimeSelect: (time: string) => void;
  busySlots: string[]; // Array of busy time slots in HH:MM format
  isLoading: boolean;
  timezone: string;
  onTimezoneChange: (timezone: string) => void;
}

export default function TimeSlotPicker({
  selectedDate,
  selectedTime,
  onTimeSelect,
  busySlots,
  isLoading,
  timezone,
  onTimezoneChange,
}: TimeSlotPickerProps) {
  // Tony's availability is 7:00 AM - 7:30 PM Phoenix time (UTC-7, no DST)
  const PHOENIX_OFFSET = -7;

  // Standard timezone offsets (winter/standard time)
  // Note: DST handling would require more complex logic
  const timezoneOffsets: Record<string, number> = {
    'America/Phoenix': -7,      // MST (no DST)
    'America/Los_Angeles': -8,  // PST
    'America/Denver': -7,       // MST
    'America/Chicago': -6,      // CST
    'America/New_York': -5,     // EST
    'America/Anchorage': -9,    // AKST
    'Pacific/Honolulu': -10,    // HST
    'Europe/London': 0,         // GMT
    'Europe/Paris': 1,          // CET
    'Asia/Tokyo': 9,            // JST
    'Australia/Sydney': 11,     // AEDT
  };

  // Calculate hour shift based on timezone difference from Phoenix
  const selectedOffset = timezoneOffsets[timezone] ?? -7;
  const hourShift = selectedOffset - PHOENIX_OFFSET;

  // Generate time slots shifted to user's timezone
  const generateTimeSlots = () => {
    const slots = [];
    const phoenixStartHour = 7;  // 7:00 AM Phoenix
    const phoenixEndHour = 19;   // 7:00 PM Phoenix (last slot 7:30 PM)

    const startHour = phoenixStartHour + hourShift;
    const endHour = phoenixEndHour + hourShift;

    for (let hour = startHour; hour <= endHour; hour++) {
      // Handle hour wraparound for extreme timezones
      const displayHour = ((hour % 24) + 24) % 24;
      const hourStr = displayHour.toString().padStart(2, '0');
      slots.push(`${hourStr}:00`);
      slots.push(`${hourStr}:30`);
    }
    return slots;
  };

  const allTimeSlots = generateTimeSlots();

  // DEBUG: Log availability data
  console.log('[BOOKING] TimeSlotPicker Debug:', {
    selectedDate,
    selectedTime,
    busySlotsReceived: busySlots,
    busySlotsLength: busySlots.length,
    isLoading,
    allTimeSlotsCount: allTimeSlots.length
  });

  // Filter out busy slots - only show available times
  const availableSlots = allTimeSlots.filter(slot => !busySlots.includes(slot));

  console.log('[BOOKING] After filtering:', {
    availableSlotsCount: availableSlots.length,
    availableSlots: availableSlots,
    filteredOutCount: allTimeSlots.length - availableSlots.length
  });

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

  // Group slots by hour pairs (e.g., [7:00, 7:30], [8:00, 8:30])
  const groupSlotsByHour = (slots: string[]) => {
    const groups: { hour: number; slots: string[] }[] = [];
    const hourMap = new Map<number, string[]>();

    // Group slots by their hour
    slots.forEach(slot => {
      const hour = parseInt(slot.split(':')[0]);
      if (!hourMap.has(hour)) {
        hourMap.set(hour, []);
      }
      hourMap.get(hour)!.push(slot);
    });

    // Sort by hour and create groups
    const sortedHours = Array.from(hourMap.keys()).sort((a, b) => a - b);
    sortedHours.forEach(hour => {
      const hourSlots = hourMap.get(hour)!;
      hourSlots.sort((a, b) => a.localeCompare(b));
      groups.push({ hour, slots: hourSlots });
    });

    return groups;
  };

  // Split available slots into AM and PM
  const amSlots = availableSlots.filter(slot => {
    const hour = parseInt(slot.split(':')[0]);
    return hour < 12;
  });

  const pmSlots = availableSlots.filter(slot => {
    const hour = parseInt(slot.split(':')[0]);
    return hour >= 12;
  });

  const amGroups = groupSlotsByHour(amSlots);
  const pmGroups = groupSlotsByHour(pmSlots);

  const renderTimeSlotButton = (slot: string) => {
    const formatted = formatTime(slot);
    const isSelected = selectedTime === slot;

    return (
      <button
        key={slot}
        type="button"
        onClick={() => onTimeSelect(slot)}
        disabled={isLoading}
        className={`
          w-28 px-4 py-2.5 rounded-lg text-sm font-medium
          transition-all duration-200
          ${isSelected
            ? 'bg-[#16E3FF] text-slate-900 font-bold'
            : 'bg-white/5 border border-white/20 text-white hover:bg-white/10 hover:border-[#16E3FF]'
          }
        `}
      >
        {formatted.display}
      </button>
    );
  };

  const renderHourGroup = (group: { hour: number; slots: string[] }) => {
    return (
      <div key={group.hour} className="flex gap-2 justify-center">
        {group.slots.map(slot => renderTimeSlotButton(slot))}
      </div>
    );
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-6">
      {/* Header */}
      <div className="mb-6">
        {selectedDate ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold text-lg">
                Available Times
              </h3>
              <p className="text-[#16E3FF] text-sm">
                {getFormattedDate(selectedDate)}
              </p>
            </div>

            {/* Timezone Selector */}
            <div className="flex items-center gap-3 mb-4">
              <label className="text-[#16E3FF] text-sm font-medium whitespace-nowrap">
                Select Your Time Zone
              </label>
              <select
                value={timezone}
                onChange={(e) => onTimezoneChange(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-[#16E3FF] focus:outline-none [&>option]:bg-[#1D1D1D] [&>option]:text-white"
              >
                <option value="America/New_York">Eastern Time (ET)</option>
                <option value="America/Chicago">Central Time (CT)</option>
                <option value="America/Denver">Mountain Time (MT)</option>
                <option value="America/Phoenix">Mountain Time - Arizona (MST)</option>
                <option value="America/Los_Angeles">Pacific Time (PT)</option>
                <option value="America/Anchorage">Alaska Time (AKT)</option>
                <option value="Pacific/Honolulu">Hawaii Time (HST)</option>
                <option value="Europe/London">London (GMT/BST)</option>
                <option value="Europe/Paris">Central Europe (CET)</option>
                <option value="Asia/Tokyo">Tokyo (JST)</option>
                <option value="Australia/Sydney">Sydney (AEDT)</option>
              </select>
            </div>
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
        <>
          {availableSlots.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-white/60 text-lg mb-2">
                No available times on this date
              </p>
              <p className="text-white/40 text-sm">
                Please select a different date
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {/* AM Column */}
              {amSlots.length > 0 && (
                <div>
                  <h4 className="text-[#16E3FF] font-semibold text-sm mb-4 text-center">
                    Morning (AM)
                  </h4>
                  <div className="space-y-3">
                    {amGroups.map(group => renderHourGroup(group))}
                  </div>
                </div>
              )}

              {/* PM Column */}
              {pmSlots.length > 0 && (
                <div>
                  <h4 className="text-[#16E3FF] font-semibold text-sm mb-4 text-center">
                    Afternoon/Evening (PM)
                  </h4>
                  <div className="space-y-3">
                    {pmGroups.map(group => renderHourGroup(group))}
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Legend - Only show when there are available slots */}
      {!isLoading && selectedDate && availableSlots.length > 0 && (
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-center gap-4 text-xs text-white/60">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-white/5 border border-white/20 rounded"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#16E3FF] rounded"></div>
            <span>Selected</span>
          </div>
        </div>
      )}
    </div>
  );
}
