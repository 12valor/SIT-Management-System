import { Clock, CheckCircle2, Timer, Activity } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Metrics Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Metric Card 1 */}
        <div className="rounded-xl border border-border bg-card text-card-foreground shadow-sm">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Total Hours Required</h3>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">600</div>
            <p className="text-xs text-muted-foreground">Standard SIT duration</p>
          </div>
        </div>

        {/* Metric Card 2 */}
        <div className="rounded-xl border border-border bg-card text-card-foreground shadow-sm">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-primary">Hours Completed</h3>
            <CheckCircle2 className="h-4 w-4 text-primary/80" />
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold text-primary">124.5</div>
            <p className="text-xs text-muted-foreground">+8.0 from last week</p>
          </div>
        </div>

        {/* Metric Card 3 */}
        <div className="rounded-xl border border-border bg-card text-card-foreground shadow-sm">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Pending Approvals</h3>
            <Timer className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold text-amber-600">3</div>
            <p className="text-xs text-muted-foreground">Awaiting supervisor review</p>
          </div>
        </div>

        {/* Metric Card 4 */}
        <div className="rounded-xl border border-border bg-card text-card-foreground shadow-sm">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Current Status</h3>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">Active</div>
            <p className="text-xs text-muted-foreground">Enrolled in SIT module</p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="rounded-xl border border-border bg-card text-card-foreground shadow-sm lg:col-span-4">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="font-semibold leading-none tracking-tight">Recent Logbook Entries</h3>
            <p className="text-sm text-muted-foreground">You submitted 5 entries this week.</p>
          </div>
          <div className="p-6 pt-0">
            <div className="space-y-8">
              {/* Mock items */}
              {[1, 2, 3].map((i) => (
                <div className="flex items-center" key={i}>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">April {15 - i}, 2026</p>
                    <p className="text-sm text-muted-foreground">System maintenance and bug fixing.</p>
                  </div>
                  <div className="ml-auto font-medium">+8 Hrs</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="rounded-xl border border-border bg-card text-card-foreground shadow-sm lg:col-span-3">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="font-semibold leading-none tracking-tight">Upcoming Deadlines</h3>
            <p className="text-sm text-muted-foreground">Required documents and evaluations.</p>
          </div>
          <div className="p-6 pt-0">
             <div className="space-y-8">
                <div className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Midterm Evaluation Form</p>
                    <p className="text-sm text-destructive font-medium">Due in 3 days</p>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
