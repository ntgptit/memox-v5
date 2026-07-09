# 16 — Mx Visual Review Checklist

For a **design-review agent** inspecting screenshots. Walk each category, emit a bug per violation using
the format below. No-news = pass.

## 1. Spacing
- Screen padding = recipe (16). Section gaps = 24. Item gaps = 12. Bottom action spacing = 16.
- No accidental cramped/overlapping area; no mismatched gaps in the same list.

## 2. Hierarchy
- Primary content visually dominant; secondary metadata doesn't compete.
- Title/body/caption roles correct; ≤ 2 font weights.

## 3. Composition
- Recipe followed; no card-in-card; no random dividers; no mixed row styles without reason; action
  hierarchy clear (one primary).

## 4. State coverage
- Non-happy states present; **no-due not shown as error**; unavailable not shown as merely disabled;
  finalize-failed preserves data.

## 5. Dark / light
- Both modes present; contrast OK; states distinguishable; charts readable; destructive clearly separated.

## 6. Long text
- Korean prompt fits/wraps; Vietnamese/meaning wraps; deck names truncate gracefully; no overflow/clipping.

## 7. Business visual semantics
- pre-SRS not confused with SRS Repeat; Review Words reads read-only; Statistics not confused with Session
  Result; high-risk actions separated.

---

## Bug output format

```
UI REVIEW BUG
Screen:
Frame/state:
Rule violated:
Observed:
Expected:
Severity:      Blocker | High | Medium | Low
Suggested fix:
```

**Severity:** Blocker = wrong business meaning or unusable state · High = major hierarchy/spacing/state
problem · Medium = visible inconsistency · Low = polish.
