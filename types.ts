
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

export interface PricingOption {
  label: string;
  price: number;
  priceLabel?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  longDescription?: string;
  price: number; // Starting price
  priceLabel?: string; // Custom display text for price (e.g. "Sur devis")
  priceList?: PricingOption[]; // Detailed price list
  category: 'Textile' | 'Auto' | 'Désinfection';
  imageUrl: string;
  gallery?: string[];
  beforeImage?: string;
  afterImage?: string;
  features: string[];
}

export interface CartItem extends Product {
  selectedOption?: PricingOption;
}

export interface JournalArticle {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  content: React.ReactNode; // Allowing JSX for rich formatting/poems
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS'
}

export type ViewState =
  | { type: 'home' }
  | { type: 'product', product: Product }
  | { type: 'journal', article: JournalArticle }
  | { type: 'checkout' };
