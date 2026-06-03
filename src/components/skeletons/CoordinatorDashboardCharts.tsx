"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface TrendData {
  month: string;
  students: number;
  placements: number;
}

interface IndustryStat {
  name: string;
  count: number;
  subIndustries?: string[];
}

export function ProgramMomentumChart({ data }: { data: TrendData[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--foreground)" opacity={0.1} />
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 10, fill: "var(--foreground)", opacity: 0.7 }}
          dy={10}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 10, fill: "var(--foreground)", opacity: 0.7 }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--background)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            fontSize: "12px",
            color: "var(--foreground)",
          }}
          itemStyle={{ color: "var(--foreground)" }}
        />
        <Area
          type="monotone"
          dataKey="students"
          stroke="var(--primary)"
          fillOpacity={0.1}
          fill="var(--primary)"
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="placements"
          stroke="var(--foreground)"
          fillOpacity={0}
          strokeWidth={2}
          strokeDasharray="5 5"
          opacity={0.4}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function IndustryDistributionChart({ data }: { data?: IndustryStat[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical" margin={{ left: -20 }}>
        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--foreground)" opacity={0.1} />
        <XAxis type="number" hide />
        <YAxis
          dataKey="name"
          type="category"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 10, fill: "var(--foreground)", fontWeight: "bold", opacity: 0.8 }}
          width={80}
        />
        <Tooltip
          cursor={{ fill: "var(--muted)", opacity: 0.2 }}
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const item = payload[0].payload as IndustryStat;
              return (
                <div className="bg-background border border-border p-3 rounded-xl shadow-xl min-w-[120px]">
                  <p className="text-xs font-bold text-foreground mb-1">{item.name}</p>
                  <p className="text-[10px] text-foreground/70">
                    Partners: <span className="text-foreground font-medium">{item.count}</span>
                  </p>
                  {item.name === "Other" && item.subIndustries && item.subIndustries.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-border">
                      <p className="text-[9px] font-mono uppercase text-foreground/40 mb-1">Includes:</p>
                      <div className="flex flex-wrap gap-1">
                        {item.subIndustries.map((subIndustry, index) => (
                          <span
                            key={`${subIndustry}-${index}`}
                            className="text-[9px] px-1.5 py-0.5 bg-muted rounded text-foreground/80"
                          >
                            {subIndustry}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }
            return null;
          }}
        />
        <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={20}>
          {data?.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={index === 0 ? "var(--primary)" : "var(--foreground)"}
              fillOpacity={index === 0 ? 1 : 0.4 - index * 0.05}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
