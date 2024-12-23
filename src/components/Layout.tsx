import { Button } from "@/components/ui/button";
import { PlusCircle, Calendar, Lightbulb } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-primary p-4 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">MusicFlow</h1>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="secondary" className="bg-secondary hover:bg-secondary/90">
                <PlusCircle className="mr-2 h-4 w-4" />
                New Post
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Post</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <Input placeholder="Post Title" />
                <Textarea placeholder="Post Content" />
                <Input type="date" />
                <Button onClick={() => setIsOpen(false)} className="w-full">
                  Schedule Post
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </nav>

      <div className="container mx-auto py-6">
        <div className="grid grid-cols-12 gap-6">
          <aside className="col-span-2">
            <nav className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Calendar
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Lightbulb className="mr-2 h-4 w-4" />
                Ideas
              </Button>
            </nav>
          </aside>
          <main className="col-span-10">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};