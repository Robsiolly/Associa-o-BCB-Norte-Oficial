/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

export interface IndicatorCard {
  title: string;
  subtitle: string;
}

export type TimelineMoment = 'initial' | 'action' | 'depth' | 'enclosure';
