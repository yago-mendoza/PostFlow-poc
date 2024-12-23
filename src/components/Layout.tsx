import { Button } from "@/components/ui/button";
import { PlusCircle, Calendar, Lightbulb, Zap, MessageSquare } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-card/50 backdrop-blur-sm border-b border-white/10 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-4xl font-bold text-white">PostFlow</h1>
          <div className="flex gap-2">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button variant="secondary">
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
            <Button variant="secondary">Scheduler</Button>
            <Button variant="secondary">Serializer</Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto py-6">
        <div className="grid grid-cols-12 gap-6">
          <aside className="col-span-2 space-y-6">
            <nav className="space-y-2">
              <Button variant="ghost" className="w-full justify-start text-white hover:text-primary hover:bg-white/5">
                <Calendar className="mr-2 h-4 w-4" />
                Calendar
              </Button>
              <Button variant="ghost" className="w-full justify-start text-white hover:text-primary hover:bg-white/5">
                <Lightbulb className="mr-2 h-4 w-4" />
                Ideas
              </Button>
              <Button variant="ghost" className="w-full justify-start text-white hover:text-primary hover:bg-white/5">
                <Zap className="mr-2 h-4 w-4" />
                Flash
              </Button>
            </nav>
            
            <Card className="p-4 bg-card/50 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="h-5 w-5 text-primary" />
                <h3 className="font-medium text-white">Assistant</h3>
              </div>
              <div className="h-[693px] rounded-lg bg-background/50 p-4">
                <div className="text-sm text-gray-400">
                  How can I help you today?
                </div>
              </div>
            </Card>
          </aside>
          <main className="col-span-10">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};