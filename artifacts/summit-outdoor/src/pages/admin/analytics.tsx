import { useGetAnalyticsSummary } from "@workspace/api-client-react";
import AdminLayout from "@/components/admin-layout";
import { Loader2 } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from "recharts";

export default function AdminAnalytics() {
  const { data: analytics, isLoading } = useGetAnalyticsSummary();

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-accent" size={48} />
        </div>
      </AdminLayout>
    );
  }

  if (!analytics) return null;

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        <div className="bg-background border border-border p-6 shadow-sm">
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-1">Total Visitors</p>
          <h3 className="text-3xl font-serif font-bold text-primary">{analytics.totalVisitors.toLocaleString()}</h3>
        </div>

        <div className="bg-background border border-border p-6 shadow-sm">
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-1">Page Views</p>
          <h3 className="text-3xl font-serif font-bold text-primary">{analytics.totalPageViews.toLocaleString()}</h3>
        </div>

        <div className="bg-background border border-border p-6 shadow-sm">
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-1">Conversion Rate</p>
          <h3 className="text-3xl font-serif font-bold text-primary">{analytics.conversionRate}%</h3>
        </div>

        <div className="bg-background border border-border p-6 shadow-sm">
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-1">Bounce Rate</p>
          <h3 className="text-3xl font-serif font-bold text-primary">{analytics.bounceRate}%</h3>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        <div className="lg:col-span-2 bg-background border border-border shadow-sm p-6">
          <h3 className="font-serif font-bold text-xl text-primary mb-6">Visitor Trends</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics.visitorsTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="date" tick={{fontSize: 12, fill: 'hsl(var(--muted-foreground))'}} axisLine={false} tickLine={false} />
                <YAxis tick={{fontSize: 12, fill: 'hsl(var(--muted-foreground))'}} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: 0 }}
                  itemStyle={{ color: 'hsl(var(--primary))', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="visitors" stroke="hsl(var(--accent))" strokeWidth={2} fillOpacity={1} fill="url(#colorVisitors)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-background border border-border shadow-sm p-6">
          <h3 className="font-serif font-bold text-xl text-primary mb-6">Traffic Sources</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.trafficBySource} layout="vertical" margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                <XAxis type="number" hide />
                <YAxis dataKey="source" type="category" tick={{fontSize: 12, fill: 'hsl(var(--primary))'}} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{fill: 'hsl(var(--muted))'}}
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: 0 }}
                />
                <Bar dataKey="visitors" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      <div className="bg-background border border-border shadow-sm">
        <div className="p-6 border-b border-border">
          <h3 className="font-serif font-bold text-xl text-primary">Top Content</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground font-bold border-b border-border">
                <th className="p-4">Page Path</th>
                <th className="p-4 text-right">Views</th>
                <th className="p-4 text-right">Avg. Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {analytics.topPages.map((page, i) => (
                <tr key={i} className="hover:bg-muted/20">
                  <td className="p-4 font-medium text-primary">
                    {page.path}
                  </td>
                  <td className="p-4 text-right font-medium">
                    {page.views.toLocaleString()}
                  </td>
                  <td className="p-4 text-right text-muted-foreground">
                    {Math.floor(page.avgTimeSeconds / 60)}m {page.avgTimeSeconds % 60}s
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
