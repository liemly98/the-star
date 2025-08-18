import React from "react";
import DashboardLayout from "../../hoc/DashboardLayout";

function WorkDashboardPage() {
  return (
    <DashboardLayout
      breadcrumbItems={[{ label: "Dashboard", isCurrent: true }]}
    >
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div>Work Page</div>
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
      </div>
      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
    </DashboardLayout>
  );
}

export default WorkDashboardPage;
