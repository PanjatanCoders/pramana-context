/**
 * Context Model
 *
 * Represents the intent and memory of a browsing session.
 *
 * Fields:
 * - id              : Unique identifier
 * - url             : Page URL
 * - title           : Page title
 * - intent          : One-line user-defined purpose
 * - tags            : Array of user-defined tags/categories
 * - createdAt       : First time seen
 * - lastVisitedAt   : Last revisit time
 * - visitCount      : Number of times revisited
 * - status          : active | resolved
 */

export function createContext({ url, title }) {
  return {
    id: crypto.randomUUID(),
    url,
    title,
    intent: null,
    tags: [],
    createdAt: Date.now(),
    lastVisitedAt: Date.now(),
    visitCount: 1,
    status: "active",
    currentlyOpen: false,
    openedAt: null,
    totalTimeOpen: 0
  };
}
