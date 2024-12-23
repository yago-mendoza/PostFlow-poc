import { Card } from "@/components/ui/card";
import { Sparkles, TrendingUp } from "lucide-react";

export const IdeasDashboard = () => {
  const trendingIdeas = [
    { title: "Behind the scenes studio session", category: "Video" },
    { title: "Cover song collaboration", category: "Music" },
    { title: "Music production tips", category: "Educational" },
    { title: "New release teaser", category: "Promotion" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Sparkles className="h-6 w-6 text-secondary" />
        <h2 className="text-2xl font-bold">Content Ideas</h2>
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Trending Topics</h3>
          </div>
          <div className="space-y-4">
            {trendingIdeas.map((idea, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium">{idea.title}</h4>
                <span className="text-sm text-gray-600">{idea.category}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};