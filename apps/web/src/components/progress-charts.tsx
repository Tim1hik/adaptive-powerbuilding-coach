"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Bar, BarChart } from "recharts";
import { useTranslations } from "next-intl";

const weightData = [
  { day: "1", weight: 80.4 },
  { day: "2", weight: 80.2 },
  { day: "3", weight: 80.1 },
  { day: "4", weight: 79.9 },
  { day: "5", weight: 79.8 },
  { day: "6", weight: 79.7 },
  { day: "7", weight: 79.6 }
];

const volumeData = [
  { day: "P", volume: 6800 },
  { day: "U", volume: 7200 },
  { day: "L", volume: 7600 }
];

export function ProgressCharts() {
  const t = useTranslations("progress");
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="h-72 rounded-lg border border-border bg-card p-4 text-card-foreground">
        <h2 className="mb-4 text-sm text-card-foreground">{t("weightChart")}</h2>
        <ResponsiveContainer width="100%" height="85%">
          <LineChart data={weightData}>
            <XAxis dataKey="day" stroke="#a1a1aa" />
            <YAxis stroke="#a1a1aa" domain={["dataMin - 1", "dataMax + 1"]} />
            <Tooltip />
            <Line type="monotone" dataKey="weight" stroke="#67e8f9" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="h-72 rounded-lg border border-border bg-card p-4 text-card-foreground">
        <h2 className="mb-4 text-sm text-card-foreground">{t("volumeChart")}</h2>
        <ResponsiveContainer width="100%" height="85%">
          <BarChart data={volumeData}>
            <XAxis dataKey="day" stroke="#a1a1aa" />
            <YAxis stroke="#a1a1aa" />
            <Tooltip />
            <Bar dataKey="volume" fill="#22d3ee" radius={6} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
