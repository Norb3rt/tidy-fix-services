---
description: Repository Information Overview
alwaysApply: true
---

# Tidy & Fix Web Application

## Summary

A React-based web application for Tidy & Fix, a cleaning and handyman services company in Raleigh-Durham, NC. Built with modern web technologies for SEO optimization, featuring service listings, location pages, and a lead generation funnel. The application showcases multiple services across different locations and neighborhoods with interactive maps and dynamic content generation.

## Structure

The project follows a standard React SPA structure:

- **components/** - Reusable UI components (Header, Footer, Services, Gallery, Map, Testimonials, FAQ, etc.)
- **pages/** - Page-level components (HomePage, ServicePage, LocationPage, LeadFunnelPage)
- **public/** - Static assets (logo, robots.txt, sitemap.xml)
- **scripts/** - Build utilities (sitemap generation)
- **utils/** - Helper functions (contentGenerator for dynamic content)
- **index.tsx** - React application entry point
- **App.tsx** - Main router and layout configuration

## Language & Runtime

**Language**: TypeScript / React  
**TypeScript Version**: ~5.8.2  
**React Version**: ^19.2.0  
**Runtime**: Node.js  
**Build System**: Vite 6.2.0  
**Package Manager**: pnpm

## Dependencies

**Main Dependencies**:
- `react` (^19.2.0) - UI framework
- `react-dom` (^19.2.0) - DOM rendering
- `react-router-dom` (7.9.5) - Client-side routing with hash-based navigation
- `react-leaflet` (5.0.0) - React wrapper for Leaflet maps
- `leaflet` (1.9.4) - Interactive map library
- `lucide-react` (^0.552.0) - Icon library

**Development Dependencies**:
- `@vitejs/plugin-react` (^5.0.0) - React plugin for Vite
- `typescript` (~5.8.2) - TypeScript compiler
- `vite` (^6.2.0) - Build tool and dev server
- `@types/node` (^22.14.0) - TypeScript types for Node.js

## Build & Installation

**Installation**:
```bash
npm install
```

**Development Server** (runs on http://localhost:3000):
```bash
npm run dev
```

**Production Build**:
```bash
npm run build
```

**Preview Production Build**:
```bash
npm run preview
```

**Environment Setup**:
Set `GEMINI_API_KEY` in `.env.local` for AI features integration.

## Main Entry Points

- **index.html** - HTML entry point with Tailwind CDI, Google Fonts, and Leaflet CSS
- **index.tsx** - React DOM root mount point
- **App.tsx** - Main application router handling:
  - Home page (`/`)
  - Service pages (`/services/:serviceSlug`)
  - Location pages (`/locations/:citySlug`)
  - Lead funnel (`/quote`)
  - Breadcrumb navigation and schema injection

## Key Features

- **Dynamic Content Generation** - Content generator utilities for flexible page creation
- **SEO Optimization** - Schema injection, sitemap generation, meta tags
- **Interactive Maps** - React Leaflet integration for location-based services
- **Lead Funnel** - Dedicated page for quote requests
- **Multi-location Support** - Services filterable by location and neighborhood
