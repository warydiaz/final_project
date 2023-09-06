interface MailOptions {
    to: string,
    subject: string,
    text: string,
}
export default interface MailServices{
    sendEmail(options:MailOptions):boolean;
};