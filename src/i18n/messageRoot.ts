/**
 * Loose root type so `en` and `id` stay structurally compatible.
 * Page-level copy lives under `modules.<key>.pages` (added incrementally).
 */
export type MessageRoot = Record<string, unknown>
