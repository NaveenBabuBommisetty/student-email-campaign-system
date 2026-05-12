# Sample Google Sheets Structure

This document describes the required Google Sheets structure for the Student Email Campaign System.

---

# Required Sheets

Create the following sheets inside your Google Spreadsheet:

1. Students
2. Courses
3. TemplateTypes
4. EmailTemplates
5. EmailLogs
6. TemplateVariables

---

# 1. Students Sheet

Sheet Name:

```text
Students
```

## Columns

| Column Name | Description |
|---|---|
| StudentId | Unique student identifier |
| StudentName | Full student name |
| Email | Student email address |
| CourseCode | Linked course code |
| JoinedDate | Student join date |
| Status | ACTIVE / INACTIVE |

---

## Sample Data

| StudentId | StudentName | Email | CourseCode | JoinedDate | Status |
|---|---|---|---|---|---|
| ST001 | Arun Kumar | arun@example.com | PYTHON | 2026-05-10 | ACTIVE |
| ST002 | Neha Sharma | neha@example.com | JAVA | 2026-05-11 | ACTIVE |
| ST003 | Rahul Verma | rahul@example.com | PYTHON | 2026-05-12 | ACTIVE |

---

# 2. Courses Sheet

Sheet Name:

```text
Courses
```

## Columns

| Column Name | Description |
|---|---|
| CourseCode | Unique course code |
| CourseName | Display name of course |
| Coordinator | Course coordinator name |
| SupportEmail | Course support email |

---

## Sample Data

| CourseCode | CourseName | Coordinator | SupportEmail |
|---|---|---|---|
| PYTHON | Python Mastery | Anil Kumar | python-support@example.com |
| JAVA | Java Full Stack | Ravi Teja | java-support@example.com |

---

# 3. TemplateTypes Sheet

Sheet Name:

```text
TemplateTypes
```

## Columns

| Column Name |
|---|
| TemplateType |

---

## Sample Data

| TemplateType |
|---|
| WELCOME |
| IMPORTANT_UPDATE |
| PAYMENT_REMINDER |

---

# 4. EmailTemplates Sheet

Sheet Name:

```text
EmailTemplates
```

## Columns

| Column Name | Description |
|---|---|
| TemplateId | Unique template identifier |
| CourseCode | Associated course |
| TemplateType | Type of email |
| SubjectTemplate | Email subject |
| BodyTemplate | HTML email body |
| Active | TRUE / FALSE |

---

## Sample Data

| TemplateId | CourseCode | TemplateType | SubjectTemplate | BodyTemplate | Active |
|---|---|---|---|---|---|
| TMP001 | PYTHON | WELCOME | Welcome to {{CourseName}} | <h2>Welcome {{StudentName}}</h2><p>You joined {{CourseName}}</p> | TRUE |
| TMP002 | JAVA | WELCOME | Welcome to {{CourseName}} | <h2>Hello {{StudentName}}</h2><p>Welcome to Java Full Stack</p> | TRUE |

---

# 5. EmailLogs Sheet

Sheet Name:

```text
EmailLogs
```

## Columns

| Column Name | Description |
|---|---|
| LogId | Unique log identifier |
| StudentId | Student who received email |
| TemplateId | Template used |
| SentAt | Timestamp |
| Status | SUCCESS / FAILED |
| Error | Error details if failed |

---

## Sample Data

| LogId | StudentId | TemplateId | SentAt | Status | Error |
|---|---|---|---|---|---|
| LOG001 | ST001 | TMP001 | 2026-05-12 10:00 | SUCCESS | |
| LOG002 | ST002 | TMP002 | 2026-05-12 10:05 | FAILED | Invalid email |

---

# 6. TemplateVariables Sheet

Sheet Name:

```text
TemplateVariables
```

## Columns

| Column Name | Description |
|---|---|
| VariableName | Placeholder variable |
| SourceSheet | Source sheet |
| SourceColumn | Source column |
| ExampleValue | Example data |

---

## Sample Data

| VariableName | SourceSheet | SourceColumn | ExampleValue |
|---|---|---|---|
| StudentName | Students | StudentName | Arun Kumar |
| Email | Students | Email | arun@example.com |
| CourseName | Courses | CourseName | Python Mastery |
| Coordinator | Courses | Coordinator | Anil Kumar |

---

# Placeholder Format

Templates support placeholders using:

```text
{{VariableName}}
```

---

## Supported Examples

```text
{{StudentName}}
{{CourseName}}
{{Coordinator}}
{{SupportEmail}}
```

---

# Template Rendering Example

## SubjectTemplate

```text
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

# Rendered Output Example

## Student

| StudentName | CourseCode |
|---|---|
| Arun Kumar | PYTHON |

---

## Final Email

```html
<h2>Welcome Arun Kumar</h2>

<p>
You joined <b>Python Mastery</b>
</p>

<p>
Coordinator: Anil Kumar
</p>
```

---

# Important Notes

## Use Consistent Sheet Names

Apps Script configuration depends on exact sheet names.

---

## Use Unique IDs

Examples:

```text
ST001
TMP001
LOG001
```

---

## Avoid Real Student Data

Use:
- demo emails
- fake student names
- sample content

when uploading to GitHub.

---

# Recommended Future Enhancements

Possible future improvements:

- Sidebar UI
- Template versioning
- Retry failed emails
- Campaign analytics
- Rich HTML editor
- Multi-course campaigns

