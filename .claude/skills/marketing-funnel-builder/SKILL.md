---
name: marketing-funnel-builder
description: >
  Use when user wants to "build a landing page", "create a funnel", "build a marketing funnel",
  "create a quiz funnel", "build a scorecard", "create an assessment landing page",
  "lead generation page", or mentions building any marketing/sales funnel or landing page
  for lead capture.
version: 0.1.0
usage: /marketing-funnel-builder [business-or-niche]
arguments:
  - name: business-or-niche
    required: false
    description: The business, product, or niche to build the funnel for
tags:
  - marketing
  - landing-page
  - lead-generation
  - funnel
  - quiz
  - scorecard
execution_mode: interactive
user-invocable: true
---

# Marketing Funnel Builder

Build high-converting assessment-based landing pages using the proven framework from the knowledge bank.

## Knowledge Base

Before starting, read the marketing funnels knowledge bank for context and proven patterns:
- **Insights:** `./knowledge/the-1-million-dollar-landing-page.md`
- **Full index:** `./knowledge/summary.md`

Use insights from these files to inform recommendations, but always defer to the user's decisions.

## When to Use This Skill

- User wants to build a landing page for lead generation
- User wants to create a quiz/assessment funnel
- User wants to design a scorecard marketing system
- User mentions converting visitors into leads

## The Landing Page Builder Script

Follow these phases sequentially. At each phase, **ask the user** before proceeding. Never assume answers.

---

### Phase 1: Discovery

**Goal:** Understand the business, audience, and offer.

Ask the user:
1. What's your business/product/service?
2. Who is your ideal customer? (role, industry, pain level)
3. What result or transformation do you help them achieve?
4. What's your primary offer? (coaching, software, course, service, done-for-you, etc.)

Do NOT proceed until you have clear answers to all four.

---

### Phase 2: Hook Selection

**Goal:** Craft the headline that stops the scroll.

Present the two hook types with examples tailored to their business:

**Option A — Frustration Hook**
Formula: "Feeling frustrated that [pain] even though you [effort]?"
- Generate 3 examples based on their business

**Option B — Readiness Hook**
Formula: "Are you ready to [desired result]?"
- Generate 3 examples based on their business

Ask the user:
- Which hook type resonates more with your audience?
- Pick one of the examples or tell me what to adjust

Then craft the **subheading**: "Answer [N] questions to find out [what they'll learn] and [what they'll get]."
- Present 2-3 subheading options
- Ask user to pick or refine

---

### Phase 3: Value Proposition

**Goal:** Define the 3 key areas the assessment measures and improves.

Explain the framework: "Take this assessment so we can measure and improve 3 key areas."

Ask the user:
- What are the 3 most important areas/pillars of success in your domain?
- These should be things your audience wants to improve AND that you can help with

Generate 3 suggestions based on their business. Let user pick, modify, or replace.

Output format:
```
Value Prop: "Answer these [N] questions so we can measure and improve your:"
1. [Area 1]
2. [Area 2]
3. [Area 3]
```

---

### Phase 4: Credibility Section

**Goal:** Establish trust and authority.

Ask the user:
1. What's your background/credentials relevant to this topic?
2. Do you have any stats, research, or case study results to cite? (e.g., "85% of businesses struggle with X", "Our clients see Y% improvement")
3. Any notable logos, press mentions, or social proof?

Assemble into a short credibility block. Present to user for approval.

---

### Phase 5: Call to Action

**Goal:** Write a CTA that removes friction.

The CTA should cover 4 elements:
1. **Action:** "Start the quiz" / "Take the assessment"
2. **Time:** "Only takes X minutes"
3. **Cost:** "Completely free"
4. **Reward:** "Get immediate recommendations on how to improve"

Generate 2-3 CTA variations. Ask user to pick.

**Benchmark reminder:** A well-structured page converts 20-40% of visitors.

---

### Phase 6: Quiz Questions — Best Practices (10 questions)

**Goal:** Create 10 yes/no best-practice questions that generate a score.

Ask the user:
- What are the 10 things someone should be doing if they're "doing it right" in your domain?
- These become yes/no questions. Each "yes" adds to their score.

Generate 10 suggested questions based on what you know about their business. Present as a numbered list. Ask user to:
- Approve as-is
- Swap out specific questions
- Reword any that don't fit

---

### Phase 7: Quiz Questions — Big Five Qualifiers

**Goal:** Create 5 qualifying questions that reveal sales intelligence.

Walk through each one with the user:

**Q11: Current Situation**
- "Which best describes your current situation?"
- Ask user for 4-5 options (e.g., beginner, intermediate, advanced, expert)

**Q12: Desired 90-Day Outcome**
- "What outcome do you most want to achieve in the next 90 days?"
- Ask user for 4-5 outcome options

**Q13: Biggest Obstacle**
- "What's the biggest obstacle stopping you?"
- Ask user for 3-4 obstacle options

**Q14: Preferred Solution**
- "Which solution would suit you best?"
- Ask user for options that map to their pricing tiers (book/course → coaching → done-for-you)
- Remind: this implicitly reveals budget

**Q15: Open Box**
- "Is there anything else you think we need to know?"
- Free-text field. No options needed.

---

### Phase 8: Dynamic Results Design

**Goal:** Design 3 result tiers with personalized next steps.

Ask the user:
- What score ranges map to each tier? (e.g., 0-3 = Low, 4-7 = Mid, 8-10 = High)
- For each tier, what's the appropriate next step?

Framework:
| Tier | Score Range | Tone | Next Step |
|------|------------|------|-----------|
| Low | User-defined | "You have room to improve" | Content (video, blog, book) |
| Mid | User-defined | "Strong foundations, room to grow" | Group event / webinar |
| High | User-defined | "You're ready to level up" | 1-on-1 call / consultation |

For each tier, ask user:
1. What message/insight should they see?
2. What's the specific next step URL or action?
3. Any bonus content or resources to include?

---

### Phase 9: Assembly & Output

**Goal:** Compile everything into a deliverable document.

Ask the user what output format they want:
- **Spec document** — Markdown brief for a developer/designer to implement
- **HTML landing page** — Actual code using the frontend-design skill
- **Copywriting doc** — Just the copy, headlines, and questions organized for paste-in
- **ScoreApp setup guide** — Step-by-step instructions for setting up in ScoreApp

Generate the chosen output. Present for review. Iterate if needed.

---

### Phase 10: Review & Next Steps

Summarize what was built:
- Hook type and headline
- Value proposition (3 areas)
- Credibility section
- CTA copy
- 15 questions (10 scoring + 5 qualifying)
- 3 result tiers with next steps

Ask: "Want me to save this as a reference?"

Suggest next steps:
- Drive traffic to the page
- A/B test hook types
- Monitor conversion rate against 20-40% benchmark
- Review open-box responses weekly for sales intelligence

## Critical Rules

- **ALWAYS ask before assuming** — every phase requires user input
- **Present options, not decisions** — generate 2-3 choices, let user pick
- **Reference the knowledge bank** — ground suggestions in proven frameworks
- **Keep copy concise** — landing pages need punchy, scannable text
- **No jargon in output copy** — the landing page speaks to the prospect, not the marketer
