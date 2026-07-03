import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import {
  db,
  blogPostsTable,
  portfolioProjectsTable,
  servicesTable,
  testimonialsTable,
  faqsTable,
} from "@workspace/db";
import {
  ListBlogPostsResponse,
  GetBlogPostResponse,
  ListPortfolioProjectsResponse,
  ListServicesResponse,
  ListTestimonialsResponse,
  ListFaqsResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/blog/posts", async (_req, res) => {
  const rows = await db.select().from(blogPostsTable).orderBy(blogPostsTable.publishedAt);
  res.json(ListBlogPostsResponse.parse(rows));
});

router.get("/blog/posts/:slug", async (req, res) => {
  const [row] = await db
    .select()
    .from(blogPostsTable)
    .where(eq(blogPostsTable.slug, req.params.slug));
  if (!row) {
    res.status(404).json({ error: "Blog post not found" });
    return;
  }
  res.json(GetBlogPostResponse.parse(row));
});

router.get("/portfolio/projects", async (_req, res) => {
  const rows = await db.select().from(portfolioProjectsTable).orderBy(portfolioProjectsTable.completedAt);
  res.json(ListPortfolioProjectsResponse.parse(rows));
});

router.get("/services", async (_req, res) => {
  const rows = await db.select().from(servicesTable);
  res.json(ListServicesResponse.parse(rows));
});

router.get("/testimonials", async (_req, res) => {
  const rows = await db.select().from(testimonialsTable);
  res.json(ListTestimonialsResponse.parse(rows));
});

router.get("/faqs", async (_req, res) => {
  const rows = await db.select().from(faqsTable);
  res.json(ListFaqsResponse.parse(rows));
});

export default router;
