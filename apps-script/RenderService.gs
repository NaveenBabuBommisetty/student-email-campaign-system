class RenderService {

  static buildContext(student, course) {
    return {
      StudentName: student.StudentName,
      Email: student.Email,
      CourseCode: course.CourseCode,
      CourseName: course.CourseName,
      Coordinator: course.Coordinator,
      SupportEmail: course.SupportEmail
    };
  }

  static replaceVariables(templateText, context) {
    let renderedText = templateText;

    Object.keys(context).forEach(key => {
      const value = context[key];

      const regex = new RegExp(`{{${key}}}`, 'g');

      renderedText = renderedText.replace(regex, value);
    });

    return renderedText;
  }

  static renderEmail(studentId, templateType) {

    const student = SheetService.getStudentById(studentId);

    if (!student) {
      throw new Error(`Student not found: ${studentId}`);
    }

    const course = SheetService.getCourseByCode(student.CourseCode);

    if (!course) {
      throw new Error(`Course not found: ${student.CourseCode}`);
    }

    const template = TemplateService.findTemplate(
      student.CourseCode,
      templateType
    );

    const context = this.buildContext(student, course);

    const renderedSubject = this.replaceVariables(
      template.SubjectTemplate,
      context
    );

    const renderedBody = this.replaceVariables(
      template.BodyTemplate,
      context
    );

    return {
      student,
      course,
      template,
      subject: renderedSubject,
      body: renderedBody
    };
  }
}