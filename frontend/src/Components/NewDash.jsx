// UniqueDash.jsx
import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Cell,
} from "recharts";

export default function UniqueDash() {
  const performanceData = [
    { day: "Mon", value: 65 },
    { day: "Tue", value: 72 },
    { day: "Wed", value: 80 },
    { day: "Thu", value: 76 },
    { day: "Fri", value: 85 },
    { day: "Sat", value: 90 },
    { day: "Sun", value: 78 },
  ];

  const civilScore = 72; // Civil Score %
  const categoryData = [
    { name: "Spam", value: 65 },
    { name: "Manual", value: 25 },
    { name: "Auto", value: 45 },
    { name: "Threat", value: 15 },
  ];

  return (
    <div
      className="min-h-screen px-6 py-10 text-white antialiased"
      style={{
        background:
          "linear-gradient(135deg, #0B3D91 0%, #042A5C 35%, #8A4FFF 70%, #FF2D8A 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-bold tracking-wide">Dashboard Overview</h1>
          <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg">
            Profile
          </button>
        </header>

        {/* Top Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard title="Reported Messages" value="2,095" />
          <StatCard title="Automatically Resolved" value="1,264" />
          <StatCard title="Manually Resolved" value="794" />
          <StatCard title="Unresolved" value="37" />
        </section>

        {/* Top Graphs Row */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <Card title="Performance Graph">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="perfGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF2D8A" stopOpacity={0.6} />
                      <stop offset="95%" stopColor="#8A4FFF" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
                  <XAxis dataKey="day" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip contentStyle={{ background: "#0B3D91", color: "#fff" }} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#FF2D8A"
                    fill="url(#perfGrad)"
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card title="Civil Score">
            <div className="flex justify-center items-center h-64">
              <CivilScoreSmoothWaveGauge value={civilScore} />
            </div>
          </Card>
        </section>

        {/* Bottom Diagrams Row */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <Card title="Animated Thin Wave">
            <SmoothThinWaveDiagram />
          </Card>

          <Card title="Category Distribution">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData} margin={{ top: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
                  <XAxis dataKey="name" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip contentStyle={{ background: "#0B3D91", color: "#fff" }} />
                  <Bar dataKey="value">
                    {categoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={["#FF2D8A", "#8A4FFF", "#0B3D91", "#6C63FF"][index % 4]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </section>

        {/* Training Section */}
        <Card title="Training Progress">
          <div className="bg-white/10 p-6 rounded-xl">
            <div className="text-lg mb-2">Completed 5 of 8 Assignments</div>
            <div className="w-full bg-white/20 h-4 rounded-full mb-4">
              <div
                className="h-4 rounded-full bg-gradient-to-r from-[#FF2D8A] to-[#8A4FFF]"
                style={{ width: "63%" }}
              ></div>
            </div>
            <button className="bg-gradient-to-r from-[#FF2D8A] to-[#8A4FFF] text-white px-4 py-2 rounded-lg">
              Go to Training
            </button>
          </div>
        </Card>

        {/* Footer */}
        <footer className="mt-10 text-center text-white/70 text-sm">
          Made with ❤️ using React + Tailwind | Theme: Magenta, Violet, Navy Blue, Dark Blue
        </footer>
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */
function StatCard({ title, value }) {
  return (
    <div className="p-6 bg-white/10 rounded-xl text-center shadow-md hover:bg-white/20 transition">
      <div className="text-sm text-white/70">{title}</div>
      <div className="text-3xl font-bold mt-2">{value}</div>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="bg-white/10 rounded-xl p-6 shadow-md backdrop-blur-md">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}

/* ---------------- Civil Score Gauge + Smooth Thin Wave ---------------- */
function CivilScoreSmoothWaveGauge({ value }) {
  const [waveOffset, setWaveOffset] = useState(0);
  const radius = 60;

  useEffect(() => {
    const id = setInterval(() => setWaveOffset((prev) => prev + 2), 40);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-56 h-56">
      <svg viewBox="0 0 160 160" className="w-full h-full">
        <defs>
          <linearGradient id="civilGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FF2D8A" />
            <stop offset="100%" stopColor="#8A4FFF" />
          </linearGradient>
          <clipPath id="circleClip">
            <circle cx="80" cy="80" r={radius} />
          </clipPath>
        </defs>

        <circle cx="80" cy="80" r={radius} fill="rgba(255,255,255,0.05)" />

        <g clipPath="url(#circleClip)">
          <path
            d={`
              M0 ${160 - (value / 100) * 160}
              ${Array.from({ length: 33 })
                .map((_, i) => {
                  const x = i * 5;
                  const y =
                    160 -
                    (value / 100) * 160 +
                    Math.sin((i * 5 + waveOffset) / 10) * 4;
                  return `L${x} ${y}`;
                })
                .join(" ")}
              L160 160 L0 160 Z
            `}
            fill="url(#civilGrad)"
            opacity="0.7"
          />
        </g>

        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="transparent"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="6"
        />

        <line
          x1="80"
          y1="80"
          x2={80 + radius * Math.cos(Math.PI * (1 - value / 100))}
          y2={80 - radius * Math.sin(Math.PI * (1 - value / 100))}
          stroke="#FF2D8A"
          strokeWidth="3"
          strokeLinecap="round"
        />

        <text x="80" y="88" textAnchor="middle" fontSize="22" fontWeight="700" fill="#fff">
          {value}%
        </text>
      </svg>
    </div>
  );
}

/* ---------------- Smooth Thin Wave Diagram ---------------- */
function SmoothThinWaveDiagram() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setOffset((prev) => prev + 2), 40);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full h-64 bg-white/10 rounded-xl overflow-hidden relative">
      <svg viewBox="0 0 400 100" className="w-full h-full">
        <defs>
          <linearGradient id="waveGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FF2D8A" stopOpacity={0.6} />
            <stop offset="100%" stopColor="#8A4FFF" stopOpacity={0.6} />
          </linearGradient>
        </defs>
        <path
          d={`
            M0 50
            ${Array.from({ length: 81 })
              .map((_, i) => {
                const x = i * 5;
                const y = 50 + Math.sin((i * 5 + offset) / 10) * 8;
                return `L${x} ${y}`;
              })
              .join(" ")}
            L400 100 L0 100 Z
          `}
          fill="url(#waveGrad)"
          opacity="0.7"
        />
      </svg>
    </div>
  );
}
