# Architecture Overview

# Student Email Campaign System

This document explains the architecture and internal workflow of the Google Sheets + Apps Script based Student Email Campaign System.

---

# High Level Architecture

```text
Google Sheets
    ↓
Menu.gs
    ↓
CampaignService.gs
    ↓
RenderService.gs
    ↓
TemplateService.gs
    ↓
SheetService.gs
    ↓
Google Sheets Data
```

---

# Core Design Principles

The project follows:

- Service-based architecture
- Separation of responsibilities
- Reusable template rendering
- Centralized sheet access
- Operational logging
- Batch-based campaign execution

---

# Architecture Goals

The system is designed to support:

- Dynamic course-based email templates
- HTML email rendering
- Bulk email campaigns
- Logging and auditing
- Duplicate prevention
- Scalable Apps Script organization

without turning the project into a single large `Code.gs` file.

---

# Main Components

| Component | Responsibility |
|---|---|
| Menu.gs | UI actions and menu integration |
| CampaignService.gs | Bulk campaign orchestration |
| RenderService.gs | Placeholder replacement and rendering |
| TemplateService.gs | Template resolution |
| SheetService.gs | Google Sheets data access |
| EmailService.gs | Gmail sending |
| Preview.html | HTML preview rendering |
| Config.gs | Centralized constants/configuration |

---

# Data Flow

## Single Email Flow

```text
User Clicks Menu
        ↓
Menu.gs
        ↓
RenderService.renderEmail()
        ↓
TemplateService.getTemplate()
        ↓
SheetService.getStudent()
SheetService.getCourse()
        ↓
Placeholder Replacement
        ↓
EmailService.sendEmail()
        ↓
SheetService.insertEmailLog()
```

---

# Bulk Campaign Flow

```text
Run Campaign
      ↓
CampaignService.sendCampaign()
      ↓
Load Students By Course
      ↓
Loop Students
      ↓
Check Duplicate Logs
      ↓
Render Email
      ↓
Send Email
      ↓
Insert Email Log
      ↓
Batch Delay
```

---

# Google Sheets As Database

The system uses Google Sheets as a lightweight database.

---

# Sheets Overview

| Sheet Name | Purpose |
|---|---|
| Students | Student records |
| Courses | Course metadata |
| TemplateTypes | Template categories |
| EmailTemplates | HTML templates |
| EmailLogs | Audit logs |
| TemplateVariables | Placeholder documentation |

---

# Service Layer Design

---

# 1. Config.gs

Purpose:

Centralized configuration.

Stores:
- Sheet names
- Template types
- Batch settings
- Global constants

Example:

```javascript
const CAMPAIGN_CONFIG = {
  BATCH_SIZE: 5,
  BATCH_DELAY_MS: 2000
};
```

---

# 2. SheetService.gs

Purpose:

Single source of truth for Google Sheets access.

Responsibilities:
- Read rows
- Write logs
- Fetch students
- Fetch templates
- Query data

Important Principle:

No other service should directly manipulate sheets.

---

# 3. TemplateService.gs

Purpose:

Template lookup and resolution.

Responsibilities:
- Find active template
- Match by course + template type
- Validate template availability

Example:

```text
PYTHON + WELCOME
↓
Correct HTML Template
```

---

# 4. RenderService.gs

Purpose:

Dynamic placeholder rendering.

Responsibilities:
- Build rendering context
- Replace placeholders
- Produce final email content

Example:

```text
{{StudentName}}
↓
Arun Kumar
```

---

# 5. EmailService.gs

Purpose:

Email delivery abstraction.

Responsibilities:
- Gmail sending
- HTML email support
- Delivery logging hooks

Current implementation uses:

```javascript
GmailApp.sendEmail()
```

---

# 6. CampaignService.gs

Purpose:

Bulk campaign orchestration.

Responsibilities:
- Batch processing
- Duplicate prevention
- Retry control
- Campaign execution

Important:

CampaignService does NOT:
- render templates directly
- access sheets directly

It coordinates existing services.

---

# 7. Menu.gs

Purpose:

Spreadsheet UI integration.

Responsibilities:
- Create custom menu
- Prompt user input
- Trigger workflows
- Open previews

Example menu:

```text
Email System
 ├── Preview Email
 ├── Send Test Email
 └── Run Bulk Campaign
```

---

# 8. Preview.html

Purpose:

HTML email preview rendering.

Responsibilities:
- Render actual email HTML
- Show formatted preview
- Simulate Gmail appearance

---

# Placeholder Engine

Templates support dynamic placeholders.

---

# Example Placeholders

```text
{{StudentName}}
{{CourseName}}
{{Coordinator}}
{{SupportEmail}}
```

---

# Rendering Example

## Template

```html
<h2>Welcome {{StudentName}}</h2>
```

## Output

```html
<h2>Welcome Arun Kumar</h2>
```

---

# Duplicate Prevention

Before sending:

```text
StudentId + TemplateId
```

is checked against:

```text
EmailLogs
```

to avoid duplicate delivery.

---

# Email Logging

Every email send attempt creates a log record.

---

# Log Status Types

| Status | Meaning |
|---|---|
| SUCCESS | Email delivered |
| FAILED | Sending failed |

---

# Benefits Of Logging

Logging enables:
- audit tracking
- debugging
- retry workflows
- duplicate prevention
- operational visibility

---

# Batch Processing

Campaigns use throttling to avoid:
- Gmail quota failures
- Apps Script execution issues
- rapid send limits

---

# Example Batch Flow

```text
Send 5 Emails
      ↓
Pause 2 Seconds
      ↓
Next Batch
```

---

# Why Service Separation Matters

Without service separation:

```text
Everything becomes:
Code.gs spaghetti
```

With service separation:
- reusable logic
- easier debugging
- cleaner maintenance
- scalable architecture

---

# Recommended Repository Structure

```text
student-email-campaign-system/
│
├── README.md
│
├── apps-script/
│   ├── Config.gs
│   ├── SheetService.gs
│   ├── TemplateService.gs
│   ├── RenderService.gs
│   ├── EmailService.gs
│   ├── CampaignService.gs
│   ├── Menu.gs
│   └── Preview.html
│
├── docs/
│   ├── architecture.md
│   └── sheets-structure.md
│
└── sample-data/
    └── sample-sheet-structure.md
```

---

# Scalability Considerations

Current architecture supports:
- small institutes
- coaching centers
- training programs
- internal educational workflows

Possible future enhancements:
- retry queues
- analytics dashboard
- sidebar UI
- template versioning
- multi-channel notifications

---

# Summary

This project demonstrates:

- Google Apps Script architecture
- Dynamic template systems
- Operational logging
- Campaign orchestration
- Service-based design
- Bulk processing workflows

while keeping the implementation lightweight and maintainable.
