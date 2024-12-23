import { Card } from "@/components/ui/card";
import { useState } from "react";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const gradients = [
  "linear-gradient(90deg, hsla(277, 75%, 84%, 1) 0%, hsla(297, 50%, 51%, 1) 100%)",
  "linear-gradient(90deg, hsla(221, 45%, 73%, 1) 0%, hsla(220, 78%, 29%, 1) 100%)",
  "linear-gradient(90deg, hsla(39, 100%, 77%, 1) 0%, hsla(22, 90%, 57%, 1) 100%)",
  "linear-gradient(90deg, hsla(46, 73%, 75%, 1) 0%, hsla(176, 73%, 88%, 1) 100%)",
];

export const Calendar = () => {
  const [currentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-32" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
      days.push(
        <div key={day} className="p-2">
          <div 
            className="h-24 rounded-lg mb-2 hover:scale-105 transition-transform cursor-pointer"
            style={{ background: randomGradient }}
          />
          <div className="text-xs text-gray-400 pl-1">{day}:00</div>
          <div className="text-xs truncate pl-1">Daily Mix {day}</div>
        </div>
      );
    }

    return days;
  };

  return (
    <Card className="p-6 bg-background/50 backdrop-blur-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">
          {currentDate.toLocaleString("default", { month: "long", year: "numeric" })}
        </h2>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center font-medium text-gray-400 text-sm">
            {day}
          </div>
        ))}
        {renderCalendarDays()}
      </div>
    </Card>
  );
};