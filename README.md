# Student Email Campaign System

A Google Sheets + Google Apps Script based email campaign management system for educational institutes and course platforms.

This project supports:

- Dynamic email templates
- Course-based template selection
- HTML email preview
- Gmail email sending
- Bulk email campaigns
- Email logging
- Duplicate email prevention
- Batch processing / throttling

---

# Features

| Feature | Status |
|---|---|
| Dynamic Templates | ✅ |
| HTML Email Support | ✅ |
| Bulk Campaign Sending | ✅ |
| Email Logging | ✅ |
| Duplicate Prevention | ✅ |
| Batch Processing | ✅ |
| Google Sheets Integration | ✅ |
| Dynamic Placeholder Rendering | ✅ |

---

# Architecture

The system follows a clean service-based architecture.

```text
Menu
 ↓
CampaignService
 ↓
RenderService
 ↓
TemplateService
 ↓
SheetService
```

---

# Project Structure

```text
student-email-campaign-system/
│
├── README.md
├── .gitignore
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
│   ├── sheets-structure.md
│   └── screenshots/
│
└── sample-data/
    └── sample-sheet-structure.md
```

---

# Google Sheets Structure

## Students

| StudentId | StudentName | Email | CourseCode | JoinedDate | Status |
|---|---|---|---|---|---|

---

## Courses

| CourseCode | CourseName | Coordinator | SupportEmail |
|---|---|---|---|

---

## TemplateTypes

| TemplateType |
|---|
| WELCOME |
| IMPORTANT_UPDATE |

---

## EmailTemplates

| TemplateId | CourseCode | TemplateType | SubjectTemplate | BodyTemplate | Active |
|---|---|---|---|---|---|

---

## EmailLogs

| LogId | StudentId | TemplateId | SentAt | Status | Error |
|---|---|---|---|---|---|

---

# Example Template

## SubjectTemplate

```html
Welcome to {{CourseName}}
```

## BodyTemplate

```html
<h2>Welcome {{StudentName}}</h2>

<p>
You joined <b>{{CourseName}}</b>
</p>

<p>
Coordinator: {{Coordinator}}
</p>
```

---

# Services Overview

## Config.gs

Stores:
- Sheet names
- Constants
- Batch configuration
- Template types

---

## SheetService.gs

Handles:
- Reading Google Sheets
- Writing logs
- Student lookup
- Template lookup

---

## TemplateService.gs

Handles:
- Template resolution
- Active template selection
- Template validation

---

## RenderService.gs

Handles:
- Placeholder replacement
- Context building
- Final email rendering

---

## EmailService.gs

Handles:
- Gmail sending
- HTML email delivery

---

## CampaignService.gs

Handles:
- Bulk campaign orchestration
- Duplicate prevention
- Batch processing

---

## Menu.gs

Handles:
- Custom menu creation
- User interaction
- Preview actions
- Campaign execution

---

# Placeholder System

Supported placeholders:

```text
{{StudentName}}
{{Email}}
{{CourseName}}
{{Coordinator}}
{{SupportEmail}}
```

---

# Batch Processing

Campaigns support throttling to avoid Gmail/App Script limits.

Example configuration:

```javascript
const CAMPAIGN_CONFIG = {
  BATCH_SIZE: 5,
  BATCH_DELAY_MS: 2000
};
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

to prevent duplicate delivery.

---

# Setup Instructions

## 1. Create Google Sheets

Create sheets:

- Students
- Courses
- TemplateTypes
- EmailTemplates
- EmailLogs
- TemplateVariables

---

## 2. Open Apps Script

```text
Extensions
→ Apps Script
```

---

## 3. Create Script Files

Create:

- Config.gs
- SheetService.gs
- TemplateService.gs
- RenderService.gs
- EmailService.gs
- CampaignService.gs
- Menu.gs

Also create:

- Preview.html

---

## 4. Paste Source Code

Paste corresponding source code into each file.

---

## 5. Reload Spreadsheet

Refresh the spreadsheet page.

You should see:

```text
Email System
```

in the top menu.

---

# Example Workflow

## Preview Email

```text
Email System
→ Preview Email
```

Flow:

```text
Select Student
↓
Select Template Type
↓
Render HTML Preview
```

---

## Send Test Email

```text
Email System
→ Send Test Email
```

Flow:

```text
Render Email
↓
Send Gmail
↓
Insert Log Entry
```

---

## Run Campaign

```text
Email System
→ Run Bulk Campaign
```

Flow:

```text
Select Course
↓
Select Template
↓
Send Emails In Batches
↓
Log Results
```

---

# Recommended Commit Messages

```text
feat: initialize Apps Script project structure
feat: implement dynamic email template engine
feat: add HTML email preview support
feat: implement Gmail email sending
feat: add email logging system
feat: implement bulk campaign sending
feat: prevent duplicate email delivery
feat: add batch processing for campaigns
```

---

# Future Improvements

Possible enhancements:

- Sidebar UI
- Dropdown-based selection
- Retry failed emails
- Template versioning
- Campaign analytics dashboard
- Advanced HTML editor

---

# Important Notes

Do NOT upload:
- real student data
- production email logs
- sensitive information

Use:
- demo emails
- sample datasets
- sanitized screenshots

---

# License

MIT License
