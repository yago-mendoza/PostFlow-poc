import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "@/lib/supabase";
import { Clock } from "lucide-react";

interface SortableTaskProps {
  task: Task;
}

export const SortableTask = ({ task }: SortableTaskProps) => {
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

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-2 mb-1 rounded-md text-sm text-white hover:brightness-110 transition-all animate-fade-in group"
    >
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 opacity-50 group-hover:opacity-100" />
        <span className="font-medium">{task.title}</span>
      </div>
      {task.description && (
        <p className="text-xs opacity-75 mt-1 truncate">{task.description}</p>
      )}
    </div>
  );
};