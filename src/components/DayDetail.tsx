import { Task } from "@/lib/supabase";
import { Clock } from "lucide-react";

interface DayDetailProps {
  day: number;
  month: number;
  year: number;
  tasks: Task[];
  onClose: () => void;
}

export const DayDetail = ({ day, month, year, tasks, onClose }: DayDetailProps) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card w-full max-w-4xl rounded-xl shadow-lg animate-in zoom-in-90 duration-300 border-0">
        <div className="p-6 border-0 border-border/10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">
              {new Date(year, month, day).toLocaleDateString("default", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </h2>
            <button
              onClick={onClose}
              className="hover:bg-accent/10 p-2 rounded-full transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
        
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="space-y-4">
            {hours.map((hour) => {
              const hourTasks = tasks.filter(
                task => new Date(task.date).getHours() === hour
              );
              
              return (
                <div
                  key={hour}
                  className="group flex gap-4 p-4 rounded-lg hover:bg-accent/5 transition-colors"
                >
                  <div className="w-16 text-sm text-muted-foreground flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {hour.toString().padStart(2, "0")}:00
                  </div>
                  <div className="flex-1 min-h-[60px] border-l border-border/10 pl-4">
                    {hourTasks.map((task) => (
                      <div
                        key={task.id}
                        className="p-2 mb-2 rounded-md"
                        style={{ backgroundColor: task.color }}
                      >
                        <div className="font-medium text-white">{task.title}</div>
                        {task.description && (
                          <div className="text-sm text-white/80 mt-1">
                            {task.description}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}; 