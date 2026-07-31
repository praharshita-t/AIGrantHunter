import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { formatCurrency } from '@/components/common/utils';

function ChartCard({ title, children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="rounded-2xl border p-5"
      style={{
        background: 'var(--color-bg-card)',
        borderColor: 'var(--color-border-primary)',
      }}
    >
      <h3
        className="mb-4 text-sm font-semibold"
        style={{ color: 'var(--color-text-primary)' }}
      >
        {title}
      </h3>
      {children}
    </motion.div>
  );
}

function CustomTooltip({ active, payload, label, formatter }) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-xl border px-3 py-2 text-xs shadow-xl"
      style={{
        background: 'var(--color-bg-elevated)',
        borderColor: 'var(--color-border-secondary)',
      }}
    >
      <p className="font-medium mb-1" style={{ color: 'var(--color-text-primary)' }}>
        {label}
      </p>
      {payload.map((entry, i) => (
        <p key={i} style={{ color: entry.color }} className="flex items-center gap-1.5">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: entry.color }}
          />
          <span style={{ color: 'var(--color-text-secondary)' }}>{entry.name}:</span>{' '}
          <span className="font-medium">{formatter ? formatter(entry.value) : entry.value}</span>
        </p>
      ))}
    </div>
  );
}

export default function ChartsSection({ charts }) {
  const textTertiary = 'var(--color-text-tertiary)';
  const borderPrimary = 'var(--color-border-primary)';

  if (!charts) return null;

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {/* Funding Distribution */}
      <ChartCard title="Funding Distribution by Agency" delay={0.1}>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={charts.funding} barSize={32}>
            <CartesianGrid strokeDasharray="3 3" stroke={borderPrimary} vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fill: textTertiary, fontSize: 12 }}
              axisLine={{ stroke: borderPrimary }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: textTertiary, fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => formatCurrency(v)}
            />
            <Tooltip content={<CustomTooltip formatter={formatCurrency} />} />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} name="Funding">
              {charts.funding.map((entry, i) => (
                <Cell key={i} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Monthly Opportunities */}
      <ChartCard title="Monthly Opportunities & Applications" delay={0.15}>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={charts.monthly}>
            <defs>
              <linearGradient id="gradOpp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradApp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={borderPrimary} vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fill: textTertiary, fontSize: 12 }}
              axisLine={{ stroke: borderPrimary }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: textTertiary, fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: 12, color: textTertiary }}
              iconType="circle"
              iconSize={8}
            />
            <Area
              type="monotone"
              dataKey="opportunities"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#gradOpp)"
              name="Opportunities"
            />
            <Area
              type="monotone"
              dataKey="applications"
              stroke="#8b5cf6"
              strokeWidth={2}
              fill="url(#gradApp)"
              name="Applications"
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Research Categories */}
      <ChartCard title="Research Categories" delay={0.2}>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={charts.categories}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={4}
              dataKey="value"
              nameKey="name"
              stroke="none"
            >
              {charts.categories.map((entry, i) => (
                <Cell key={i} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip formatter={(v) => `${v}%`} />} />
            <Legend
              layout="vertical"
              align="right"
              verticalAlign="middle"
              wrapperStyle={{ fontSize: 11, paddingLeft: 16 }}
              iconType="circle"
              iconSize={8}
              formatter={(value) => (
                <span style={{ color: 'var(--color-text-secondary)' }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Match Trends */}
      <ChartCard title="Match Score Trends" delay={0.25}>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={charts.matchTrends}>
            <CartesianGrid strokeDasharray="3 3" stroke={borderPrimary} vertical={false} />
            <XAxis
              dataKey="week"
              tick={{ fill: textTertiary, fontSize: 12 }}
              axisLine={{ stroke: borderPrimary }}
              tickLine={false}
            />
            <YAxis
              domain={[70, 100]}
              tick={{ fill: textTertiary, fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip content={<CustomTooltip formatter={(v) => `${v}%`} />} />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#10b981"
              strokeWidth={2.5}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }}
              name="Match Score"
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
