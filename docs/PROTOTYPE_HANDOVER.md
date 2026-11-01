# PATHWAY

**Explore • Plan • Build Your Future**

PATHWAY is a learner-focused platform for exploring study options, planning education pathways, tracking progress, and preparing for university applications. This README consolidates the project handover and implementation notes provided through **16 October 2026**.

> **Status note:** The features, checks, and test results below are taken from the supplied project notes. They have not been independently verified as part of preparing this README.

## 1. Platform overview

PATHWAY provides a grade-aware learner experience. Learners in Grades 9–12 can register, with different available content depending on their grade.

- **Grades 9–10:** Access to the existing learner journey; the Applications Hub is not available.
- **Grades 11–12:** Access to the Applications Hub and university information.
- **Grades 10–12:** The Home page may display a **“your journey is on its way”** card in place of journey steps that have not yet been designed.
- **Grade 12:** Verified university application deadlines and eligible reminders can appear for selected Study Target universities.

The main pathway is presented as **Explore → Plan → Track → Build Your Future**.

## 2. Design and branding

### Landing page

The landing page was redesigned around the supplied study-desk sunset reference image, rather than the earlier mountain-and-road illustration.

- **Hero:** Four grade books in front of a window overlooking a city at dusk; headline placed against dark navy, with books alongside it on wider screens.
- **Journey:** A glass-style panel with four circular icons and thin gold arrows linking Explore, Plan, Track, and Build Your Future.
- **Typography:** Playfair Display for headings and Inter for other text throughout the application.
- **Light mode:** Dusk hero retained; lower sections transition to cream with white glass cards.
- **Responsive layout:** On smaller screens, headline and call to action appear first, books move below, the journey displays in a 2 × 2 grid, and navigation collapses into a menu.
- **Pricing presentation:** Annual-plan value messaging highlights **R16.58 per month** and labels the annual option **Best Value**.

### Visual assets requiring attention

- The hero scene was cropped from the reference screenshot and is approximately 1,000 pixels wide. Replace it with original high-resolution artwork before production use, if available.
- An earlier iteration used Newsreader and Plus Jakarta Sans as placeholder fonts; the subsequent redesign changed the application-wide choices to **Playfair Display and Inter**.
- The logo artwork was preserved in the earlier design. In dark mode, the plum wordmark was changed to white for contrast. Replace that adaptation with an officially approved reversed logo if one exists.

## 3. Applications Hub (Grades 11–12)

The Applications Hub is reported as implemented in the existing application, using the supplied `PATHWAY_University_Applications_Import.xlsx` workbook as its starting data source.

### Access and routing

- A new **Applications** item appears under **Plan**, below **My Three Study Targets**, for Grades 11 and 12.
- The Hub has its own route: `#/apply`.
- Grade 9 and 10 learners do not see the sidebar item and are redirected to Home if they attempt to open the Hub directly.
- The existing Grade 12 **My Applications & Deadlines** tracker remains unchanged.

### University directory

The directory contains **24 unique university entries**, searchable by institution name or acronym (for example, `SU` or `Stellenbosch`). It includes these filters:

- All universities
- My Study Target universities
- Open now (Grade 12 only)
- Universities of technology
- Has verified details

Directory cards display institution name, acronym, location, and verification status. Deadlines display only for Grade 12 learners and only where the intake-specific date is verified.

### University detail pages

Each institution has seven information sections:

1. Overview
2. Apply to Study
3. NSFAS & Other Funding
4. Fees & Dates
5. Residences
6. Campuses
7. FAQ (nine questions)

External links open in new tabs with `target="_blank"` and `rel="noopener noreferrer"`. Prominent **Apply on the Official Website** and **Apply for Residence** buttons are reserved for verified destination links. Unconfirmed links are labelled **awaiting verification**, and general university homepages are not presented as direct application links.

Additional rules:

- Grade 11 learners are informed that shown 2027-intake dates may change for their intake.
- Unisa is described as a distance-learning institution without residence applications.
- Study Target cards include a university application-info link for Grades 11–12; university details identify the learner's matching targets.
- Existing admission calculations, APS logic, and Study Target limits were not changed.

### Application reminders

The Hub uses the existing notification system. New reminders are restricted to:

- Grade 12 learners;
- Universities linked to their Study Targets;
- Verified application dates within the next 30 days; and
- Deadlines not already covered by an existing reminder.

## 4. University data and verification

### Import behavior

- The workbook has **24 university rows**, despite describing itself as covering 23 institutions.
- All 24 are reported imported once, matched to existing universities by acronym; Stellenbosch matches `SU` and Rhodes matches `RU`.
- The imported applications data is kept separate from existing university, programme, and entry-requirement data.
- URLs are stored in individual fields, checked for HTTPS and university-owned domains.
- Verification notes, intake year, source URLs, and last-checked dates are retained.
- The import script was described as idempotent: a second run produced the same output.
- Newly added universities can appear in the Hub automatically with status **Not available** until Hub information is added.

### Official-page checks reported on 11 October 2026

Approximately **55 official pages** were opened during the reported verification pass. Examples documented in the notes:

| Institution | Reported finding |
| --- | --- |
| SMU | R300 non-refundable fee; 2027-intake application window reported as 1 April–31 July 2026 |
| UMP | R200 / R400 / R550 fees by applicant category; closing date reported as 30 November 2026 |
| UJ | Closing date reported as 31 October 2026 at 12:00; accommodation dates described as the same |
| Unisa | Application period reported as 17 August–9 October 2026 |
| Wits, UCT, UP | Dates checked and reported as closed for the 2027 intake at time of review |
| UWC | Residence application closing date reported as 31 October 2026 |
| VUT | Application fee reported as R110 |
| MUT | First-year applications handled through CAO |
| CUT | No application fee reported at time of review |
| NSFAS | Official link confirmed |

For 11 institutions with homepage-only links in the workbook, more specific application, funding, or residence URLs were found and labelled **Partially verified** pending direct checks. NMU's non-loading application URL was replaced by a linked application page from its university homepage.

**Overall verification status reported:** 12 universities **Partially verified**, 12 **Need review**, and **none fully verified**. Individual checked facts do not mean an institution's full record has been verified.

### Verification outstanding

- Automated access was blocked for **CPUT, Stellenbosch, and UFS**.
- Some pages did not load, including UCT's application/funding/housing pages and selected funding pages for CUT, UWC, Wits, and NMU.
- The UFS funding link in the workbook leads to general money-management information rather than the intended funding details.
- **CUT:** A university page reportedly listed “April 2027 – 30 September 2027” for the 2027 intake, conflicting with the workbook. The Hub therefore suppresses its deadline.
- **VUT:** Two different closing dates (30 September and 30 October) were found.
- **Wits residences:** Conflicting opening dates (1 April and 17 April) were found.
- Fees for many institutions, all information for **NWU** and **UNIVEN**, application document lists, and programme/residence campus associations still require checking.

University fees and deadlines are time-sensitive. Reconfirm details against official institutions before relying on them or publishing them as final.

## 5. Testing reported

The handover notes report these checks:

- All four demo learners reviewed at desktop and phone widths in both light and dark mode.
- Grades 9–10 denied access to both Hub addresses and redirected to Home.
- Grades 11–12 able to access the Hub with grade-specific themes.
- Directory shows 24 unique entries, with functioning search and filters.
- All seven detail-page sections present; external links use the stored secure destinations.
- No generic homepage used behind a direct Apply/Residence button; prominent buttons gated by link verification.
- Mobile layout has no horizontal scrolling and usable touch targets.
- Regression testing reported all **43 existing learner pages** unchanged in behavior.
- Existing demo data, admission logic, and remaining sidebar items were reported unchanged.
- No script errors reported; reminder behavior checked for duplicate notifications.

## 6. Prototype limitations

The supplied notes identify the following limitations:

- **Local persistence:** Accounts and learner progress are saved only in the current browser.
- **Payments:** Checkout is simulated and does not collect real money. The test card is `4242 4242 4242 4242`.
- **Reset:** The profile menu includes **Reset journey progress** for rerunning the flow.
- **Sample dates:** Workshop and career activities under **Upcoming Dates** are placeholders, not confirmed events.
- **Support:** Contact details are not yet supplied; the Support control displays a coming-soon message.
- **Journey steps 5–7:** These display an **opens later** message until designed.
- **Grades 10–12 Home:** Some learners see a **your journey is on its way** card instead of unfinished journey steps.

## 7. Decisions and fixes required before launch

### Critical

1. **Parental consent and privacy:** Review compliance with South Africa's POPIA requirements for children's personal information. The notes recommend legal review and potentially adding a parent/guardian consent step to registration, as well as accounting for parent-paid subscriptions.
2. **Production data and checkout:** Replace browser-only account/progress storage and the simulated checkout with appropriate production systems before taking real users or payments.
3. **University verification:** Manually confirm records currently marked Partially verified or Need review, especially deadlines, fees, funding and residence links, and contradictory institutional information.
4. **Deadline timezone bug:** An issue was identified in the *pre-existing* deadline reminders: dates can appear one day early in South African time (example: UJ's 31 October deadline shown as 30 October). This was not changed as part of the Hub work and needs separate investigation.

### Content and design

5. **Annual subscription cancellation policy:** Resolve the conflict between the landing-page wording **Cancel anytime** for R199/year and earlier plan wording **One payment for the year** / **No interruptions during the school year**; align all pages with the actual policy.
6. **Hero image:** Supply the original high-resolution sunset artwork.
7. **Logo:** Confirm whether an approved white/reversed logo should replace the adapted dark-mode wordmark.
8. **Remaining journey content:** Design steps 5–7 and replace placeholder cards and events when ready.
9. **Support information:** Add confirmed contact details and a working support route.

## 8. Academic calendar handling

The notes state that the Home page reflects the 2026 South African public school term dates rather than a fixed term label:

- **Term 3:** 21 July–23 September 2026
- **Term 4:** 6 October–9 December 2026

The current-term display should remain date-driven, and dates should be updated for future academic years.

## 9. Project references

- **University import source:** `PATHWAY_University_Applications_Import.xlsx` (referenced in the handover notes; the workbook itself was not provided with this README request).
- **Applications route:** `#/apply`
- **Last reported official-page verification pass:** 11 October 2026
- **README assembled:** 16 October 2026

This document captures the reported product state and open work. It is not a substitute for the application source code, deployment instructions, or a fresh production acceptance test.
