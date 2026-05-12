class EmailService {

  static sendEmail(to, subject, body) {

    GmailApp.sendEmail(
      to,
      subject,
      '',
      {
        htmlBody: body
      }
    );

    Logger.log(`Email sent to ${to}`);
  }
}