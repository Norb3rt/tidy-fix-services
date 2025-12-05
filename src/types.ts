import React from 'react';

export interface SubService {
  name: string;
  slug: string;
  description: string;
  details: string[];
}

export interface Service {
  icon: React.ReactNode;
  title: string;
  slug: string;
  description: string;
  details: string[];
  detailsVariations?: string[][];
  subServices?: SubService[];
}

export interface Neighborhood {
  name: string;
  slug: string;
}

export interface Area {
  name: string;
  slug: string;
  description: string;
  neighborhoods?: Neighborhood[];
  landmark?: string; // e.g., "PNC Arena"
  uniqueSellingPoint?: string; // e.g., "known for its vibrant tech scene"
  lat: number;
  lng: number;
}

export interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  citySlug: string; // e.g., 'raleigh', 'durham'
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface GalleryItem {
  serviceSlug: string; // Corresponds to Service.slug
  title: string;
  description: string;
  before?: string;
  after: string;
  location?: string;
  challenge?: string;
  solution?: string;
  duration?: string;
}

export interface ProgrammaticPageData {
  metaTitle: string;
  metaDescription: string;

  pageTitle: string;
  pageDescription: string;
  details: string[];
  faqs: { question: string; answer: string }[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

export interface BreadcrumbItem {
  name: string;
  path?: string;
}