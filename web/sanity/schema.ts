/**
 * Sanity schema mirroring lib/data types 1:1.
 * Migration path: keep lib/data as the source of truth until Sanity is provisioned,
 * then import these documents and switch page loaders to GROQ queries.
 * See docs/06-cms-schema.md for the full model and migration notes.
 */
import { defineType, defineField, defineArrayMember } from "@sanity/types";

const seoFields = defineField({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    { name: "title", type: "string", validation: (r: any) => r.required().max(60) },
    { name: "description", type: "text", rows: 2, validation: (r: any) => r.required().max(160) },
    { name: "keywords", type: "array", of: [{ type: "string" }] },
  ],
});

const faqField = defineField({
  name: "faqs",
  title: "FAQs",
  type: "array",
  of: [
    defineArrayMember({
      type: "object",
      fields: [
        { name: "q", title: "Question", type: "string" },
        { name: "a", title: "Answer", type: "text", rows: 3 },
      ],
    }),
  ],
});

const titleBody = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "array",
    of: [
      defineArrayMember({
        type: "object",
        fields: [
          { name: "title", type: "string" },
          { name: "body", type: "text", rows: 3 },
        ],
      }),
    ],
  });

const stringList = (name: string, title: string) =>
  defineField({ name, title, type: "array", of: [{ type: "string" }] });

export const serviceType = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({
      name: "category",
      type: "string",
      options: { list: ["AI & Data", "Intelligent Systems", "Connected Operations"] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "heroTitle", type: "string" }),
    defineField({ name: "lede", type: "text", rows: 3 }),
    defineField({ name: "challenge", type: "text", rows: 4 }),
    titleBody("pillars", "Pillars"),
    titleBody("benefits", "Benefits"),
    stringList("stack", "Technology stack"),
    defineField({ name: "industries", type: "array", of: [{ type: "reference", to: [{ type: "industry" }] }] }),
    stringList("useCases", "Use cases"),
    faqField,
    seoFields,
  ],
});

export const solutionType = defineType({
  name: "solution",
  title: "Solution",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({
      name: "group",
      type: "string",
      options: { list: ["Vision AI", "Operations", "Environment & Energy", "Smart Spaces"] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "heroTitle", type: "string" }),
    defineField({ name: "lede", type: "text", rows: 3 }),
    stringList("capabilities", "Capabilities"),
    defineField({
      name: "howItWorks",
      type: "array",
      of: [{ type: "text" }],
      validation: (r) => r.length(3),
    }),
    stringList("kpis", "KPIs"),
    defineField({ name: "parentService", type: "reference", to: [{ type: "service" }] }),
    defineField({ name: "product", type: "reference", to: [{ type: "product" }] }),
    defineField({ name: "industries", type: "array", of: [{ type: "reference", to: [{ type: "industry" }] }] }),
    faqField,
    seoFields,
  ],
});

export const industryType = defineType({
  name: "industry",
  title: "Industry",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({ name: "heroTitle", type: "string" }),
    defineField({ name: "lede", type: "text", rows: 3 }),
    titleBody("painPoints", "Pain points"),
    defineField({ name: "solutionStack", type: "array", of: [{ type: "reference", to: [{ type: "solution" }] }] }),
    defineField({ name: "products", type: "array", of: [{ type: "reference", to: [{ type: "product" }] }] }),
    stringList("benefits", "Benefits"),
    faqField,
    seoFields,
  ],
});

export const productType = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({ name: "tagline", type: "string" }),
    defineField({ name: "lede", type: "text", rows: 3 }),
    titleBody("features", "Features"),
    stringList("deployment", "Deployment modes"),
    stringList("integrations", "Integrations"),
    stringList("benefits", "Benefits"),
    defineField({ name: "industries", type: "array", of: [{ type: "reference", to: [{ type: "industry" }] }] }),
    faqField,
    seoFields,
  ],
});

export const caseStudyType = defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "client", type: "string" }),
    defineField({ name: "sector", type: "reference", to: [{ type: "industry" }] }),
    defineField({ name: "summary", type: "text", rows: 3 }),
    defineField({ name: "body", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "metrics", type: "array", of: [{ type: "object", fields: [{ name: "label", type: "string" }, { name: "value", type: "string" }] }] }),
    defineField({ name: "clientApproved", title: "Client approved for publication", type: "boolean", initialValue: false }),
    seoFields,
  ],
});

export const postType = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "excerpt", type: "text", rows: 2 }),
    defineField({ name: "publishedAt", type: "datetime" }),
    defineField({ name: "body", type: "array", of: [{ type: "block" }] }),
    seoFields,
  ],
});

export const schemaTypes = [serviceType, solutionType, industryType, productType, caseStudyType, postType];
