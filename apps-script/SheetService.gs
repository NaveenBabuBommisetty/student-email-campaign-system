class SheetService {

  static getSheet(sheetName) {
    return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  }

  static getAllRows(sheetName) {
    const sheet = this.getSheet(sheetName);

    const data = sheet.getDataRange().getValues();

    if (data.length === 0) {
      return [];
    }

    const headers = data[0];

    return data.slice(1).map(row => {
      const obj = {};

      headers.forEach((header, index) => {
        obj[header] = row[index];
      });

      return obj;
    });
  }

static hasSuccessfulEmail(studentId, templateId) {

  const logs = this.getAllRows(
    SHEET_NAMES.EMAIL_LOGS
  );

  return logs.some(log =>

    log.StudentId === studentId &&
    log.TemplateId === templateId &&
    log.Status === 'SUCCESS'
  );
}  

static getStudentsByCourse(courseCode) {

  const students = this.getAllRows(
    SHEET_NAMES.STUDENTS
  );

  return students.filter(student =>
    student.CourseCode === courseCode
  );
}

  static getStudentById(studentId) {
    const students = this.getAllRows(SHEET_NAMES.STUDENTS);

    return students.find(student => student.StudentId === studentId);
  }

  static getCourseByCode(courseCode) {
    const courses = this.getAllRows(SHEET_NAMES.COURSES);

    return courses.find(course => course.CourseCode === courseCode);
  }

  static getTemplates() {
    return this.getAllRows(SHEET_NAMES.EMAIL_TEMPLATES);
  }


  static insertEmailLog(logData) {
    const sheet = this.getSheet(SHEET_NAMES.EMAIL_LOGS);

    sheet.appendRow([
      logData.LogId,
      logData.StudentId,
      logData.TemplateId,
      logData.SentAt,
      logData.Status,
      logData.Error || ''
    ]);
  }
}