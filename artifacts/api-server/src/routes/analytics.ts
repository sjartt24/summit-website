import { Router, type IRouter } from "express";
import { GetAnalyticsSummaryResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/analytics/summary", (_req, res) => {
  const today = new Date();
  const visitorsTrend = Array.from({ length: 14 }).map((_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - (13 - i));
    const base = 180 + Math.round(Math.sin(i / 2) * 40) + i * 6;
    return {
      date: date.toISOString().slice(0, 10),
      visitors: base,
      pageViews: Math.round(base * 2.4),
    };
  });

  const data = {
    totalVisitors: 24870,
    totalPageViews: 61980,
    conversionRate: 4.6,
    avgSessionMinutes: 3.4,
    bounceRate: 38.2,
    topPages: [
      { path: "/", views: 15230, avgTimeSeconds: 92 },
      { path: "/services", views: 9840, avgTimeSeconds: 118 },
      { path: "/portfolio", views: 7210, avgTimeSeconds: 104 },
      { path: "/blog", views: 5460, avgTimeSeconds: 145 },
      { path: "/booking", views: 4380, avgTimeSeconds: 210 },
    ],
    trafficBySource: [
      { source: "Organic Search", visitors: 10420, percentage: 41.9 },
      { source: "Instagram", visitors: 5860, percentage: 23.6 },
      { source: "Direct", visitors: 4310, percentage: 17.3 },
      { source: "Referral", visitors: 2680, percentage: 10.8 },
      { source: "Email", visitors: 1600, percentage: 6.4 },
    ],
    visitorsTrend,
  };

  res.json(GetAnalyticsSummaryResponse.parse(data));
});

export default router;
