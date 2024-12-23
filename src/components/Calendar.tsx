import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Task, supabase } from "@/lib/supabase";
import { SortableTask } from "./SortableTask";
import { useToast } from "./ui/use-toast";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const gradients = [
  "linear-gradient(90deg, hsla(277, 75%, 84%, 1) 0%, hsla(297, 50%, 51%, 1) 100%)",
  "linear-gradient(90deg, hsla(221, 45%, 73%, 1) 0%, hsla(220, 78%, 29%, 1) 100%)",
  "linear-gradient(90deg, hsla(39, 100%, 77%, 1) 0%, hsla(22, 90%, 57%, 1) 100%)",
  "linear-gradient(90deg, hsla(46, 73%, 75%, 1) 0%, hsla(176, 73%, 88%, 1) 100%)",
];

export const Calendar = () => {
  const [currentDate] = useState(new Date());
  const [tasks, setTasks] = useState<Task[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('date');
    
    if (error) {
      toast({
        title: "Error fetching tasks",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setTasks(data || []);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over || active.id === over.id) return;

    const oldIndex = tasks.findIndex(task => task.id === active.id);
    const newIndex = tasks.findIndex(task => task.id === over.id);

    const newTasks = arrayMove(tasks, oldIndex, newIndex);
    setTasks(newTasks);

    // Update in Supabase
    const { error } = await supabase
      .from('tasks')
      .update({ date: newTasks[newIndex].date })
      .eq('id', active.id);

    if (error) {
      toast({
        title: "Error updating task",
        description: error.message,
        variant: "destructive",
      });
    }
  };

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
      const currentDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayTasks = tasks.filter(task => new Date(task.date).toDateString() === currentDay.toDateString());
      const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];

      days.push(
        <div 
          key={day} 
          className="p-2 group relative transition-all duration-300 hover:scale-[1.02] hover:shadow-xl rounded-xl"
        >
          <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300" />
          <DndContext 
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext 
              items={dayTasks}
              strategy={verticalListSortingStrategy}
            >
              <div 
                className="h-24 rounded-lg mb-2 overflow-hidden relative z-10 transition-transform duration-300 group-hover:transform group-hover:translate-y-[-2px]"
                style={{ background: randomGradient }}
              >
                {dayTasks.map((task) => (
                  <SortableTask key={task.id} task={task} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
          <div className="relative z-10 transition-all duration-300 group-hover:text-primary">
            <div className="text-xs text-gray-400 pl-1 group-hover:text-primary/70">{day}:00</div>
            <div className="text-xs truncate pl-1 group-hover:text-primary/90">Daily Mix {day}</div>
          </div>
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