import { Layout } from "@/components/Layout";
import { Calendar } from "@/components/Calendar";
import { IdeasDashboard } from "@/components/IdeasDashboard";
import { useState } from "react";

const Index = () => {
  const [activeView, setActiveView] = useState<"calendar" | "ideas">("calendar");

  return (
    <Layout>
      {activeView === "calendar" ? <Calendar /> : <IdeasDashboard />}
    </Layout>
  );
};

export default Index;