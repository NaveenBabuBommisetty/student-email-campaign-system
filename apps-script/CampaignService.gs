class CampaignService {

  static sendCampaign(courseCode, templateType) {

    const students =
      SheetService.getStudentsByCourse(courseCode);

    for (
  let i = 0;
  i < students.length;
  i += CAMPAIGN_CONFIG.BATCH_SIZE
) {

  const batch = students.slice(
    i,
    i + CAMPAIGN_CONFIG.BATCH_SIZE
  );

  batch.forEach(student => {

    try {

      const result = RenderService.renderEmail(
        student.StudentId,
        templateType
      );

      const alreadySent =
        SheetService.hasSuccessfulEmail(
          result.student.StudentId,
          result.template.TemplateId
        );

      if (alreadySent) {

        Logger.log(
          `Skipping already sent email for ${student.StudentId}`
        );

        return;
      }

      EmailService.sendEmail(
        result.student.Email,
        result.subject,
        result.body
      );

      SheetService.insertEmailLog({
        LogId: Utilities.getUuid(),
        StudentId: result.student.StudentId,
        TemplateId: result.template.TemplateId,
        SentAt: new Date(),
        Status: 'SUCCESS',
        Error: ''
      });

    } catch (error) {

      SheetService.insertEmailLog({
        LogId: Utilities.getUuid(),
        StudentId: student.StudentId,
        TemplateId: '',
        SentAt: new Date(),
        Status: 'FAILED',
        Error: error.message
      });
    }

  });

  Utilities.sleep(
    CAMPAIGN_CONFIG.BATCH_DELAY_MS
  );
}
  }
}