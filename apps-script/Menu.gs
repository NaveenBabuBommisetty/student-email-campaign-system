function onOpen() {

  SpreadsheetApp.getUi()
    .createMenu('Email System')
    .addItem('Preview Email', 'previewEmail')
    .addItem('Send Test Email', 'sendTestEmail')
    .addItem('Run Bulk Campaign', 'runCampaign')
    .addToUi();
}

function runCampaign() {

  const ui = SpreadsheetApp.getUi();

  const courseResponse = ui.prompt(
    'Course Code',
    'Enter Course Code (Example: PYTHON)',
    ui.ButtonSet.OK_CANCEL
  );

  if (courseResponse.getSelectedButton() !== ui.Button.OK) {
    return;
  }

  const courseCode =
    courseResponse.getResponseText().trim();

  const templateType = askTemplateType();

  if (!templateType) {
    return;
  }

  CampaignService.sendCampaign(
    courseCode,
    templateType
  );

  ui.alert(
    `Campaign completed for ${courseCode}`
  );
}

function askTemplateType() {

  const ui = SpreadsheetApp.getUi();

  const response = ui.prompt(
    'Template Type',
    'Enter Template Type (WELCOME or IMPORTANT_UPDATE)',
    ui.ButtonSet.OK_CANCEL
  );

  if (response.getSelectedButton() !== ui.Button.OK) {
    return null;
  }

  return response.getResponseText().trim().toUpperCase();
}

function sendTestEmail() {

  const studentId = askStudentId();

  if (!studentId) {
    return;
  }

  const templateType = askTemplateType();

  if (!templateType) {
    return;
  }

  const result = RenderService.renderEmail(
    studentId,
    templateType
  );

  EmailService.sendEmail(
    result.student.Email,
    result.subject,
    result.body
  );

  SpreadsheetApp.getUi().alert(
    `Email sent successfully to ${result.student.Email}`
  );
}

function previewEmail() {

  const studentId = askStudentId();

  if (!studentId) {
    return;
  }

  const templateType = askTemplateType();

  if (!templateType) {
    return;
  }

  const result = RenderService.renderEmail(
    studentId,
    templateType
  );

  const template = HtmlService.createTemplateFromFile('Preview');

  template.emailBody = result.body;

  const htmlOutput = template
    .evaluate()
    .setWidth(700)
    .setHeight(500);

  SpreadsheetApp.getUi().showModalDialog(
    htmlOutput,
    'Email Preview'
  );
}

function askStudentId() {

  const ui = SpreadsheetApp.getUi();

  const response = ui.prompt(
    'Student Preview',
    'Enter Student ID (Example: ST001)',
    ui.ButtonSet.OK_CANCEL
  );

  if (response.getSelectedButton() !== ui.Button.OK) {
    return null;
  }

  return response.getResponseText().trim();
}

function previewWelcomeEmail() {

  const studentId = askStudentId();

  if (!studentId) {
    return;
  }

  const result = RenderService.renderEmail(
    studentId,
    TEMPLATE_TYPES.WELCOME
  );

  SpreadsheetApp.getUi().alert(
    `Subject:\n\n${result.subject}\n\nBody:\n\n${result.body}`
  );
}

function sendTestWelcomeEmail() {

  const studentId = askStudentId();

  if (!studentId) {
    return;
  }

  const result = RenderService.renderEmail(
    studentId,
    TEMPLATE_TYPES.WELCOME
  );

  EmailService.sendEmail(
    result.student.Email,
    result.subject,
    result.body
  );

  SpreadsheetApp.getUi().alert(
    `Email sent successfully to ${result.student.Email}`
  );
}


