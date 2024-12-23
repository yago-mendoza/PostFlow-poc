import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "@/lib/supabase";
import { Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface SortableTaskProps {
  task: Task;
}

export const SortableTask = ({ task }: SortableTaskProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    backgroundColor: task.color,
    cursor: 'grab',
    opacity: isDragging ? 0.5 : 1,
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({ x: rect.left, y: rect.top });
    setIsHovered(true);
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="p-1.5 mb-0.5 rounded-md text-sm text-white hover:brightness-110 transition-all h-6 flex items-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center gap-1.5 w-full">
          <Clock className="w-2.5 h-2.5 opacity-50 flex-shrink-0" />
          <span className="font-medium truncate text-[10px]">{task.title}</span>
        </div>
      </div>

      {isHovered && createPortal(
        <div 
          className="fixed inset-0 pointer-events-none"
          style={{
            perspective: "1000px"
          }}
        >
          <div 
            className="absolute rounded-xl shadow-2xl transition-all duration-300"
            style={{
              backgroundColor: task.color,
              left: `${position.x}px`,
              top: `${position.y}px`,
              transform: `scale(3) translateY(20px)`,
              transformOrigin: "top left",
              width: "300px",
              padding: "1rem",
              opacity: isHovered ? 1 : 0,
            }}
          >
            <h3 className="text-xl font-bold text-white mb-3">{task.title}</h3>
            <p className="text-white/80 mb-4">{task.description}</p>
            <div className="flex items-center gap-2 text-white/60">
              <Clock className="w-4 h-4" />
              {new Date(task.date).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true
              })}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};