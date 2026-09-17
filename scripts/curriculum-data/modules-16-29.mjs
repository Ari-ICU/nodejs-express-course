/**
 * modules-16-29.mjs
 * Complete detailed curriculum data for Modules 16 through 29
 * Aggregates modules-16-20 (60 topics), modules-21-25 (55 topics), and modules-26-29 (53 topics)
 * Total: 168 detailed topics for M16-M29
 */

import { MODULES_16_20 } from "./modules-16-20.mjs";
import { MODULES_21_25 } from "./modules-21-25.mjs";
import { MODULES_26_29 } from "./modules-26-29.mjs";

export const MODULES_16_29 = {
  ...MODULES_16_20,
  ...MODULES_21_25,
  ...MODULES_26_29,
};
