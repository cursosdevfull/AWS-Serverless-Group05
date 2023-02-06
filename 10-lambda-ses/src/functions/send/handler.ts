import * as AWS from "aws-sdk";
import * as velocityjs from "velocityjs";

const ses = new AWS.SES();
const s3 = new AWS.S3();

const readFile = async (bucketName: string, key: string) => {
  const paramsReadFile = {
    Bucket: bucketName,
    Key: key,
  };

  const buffer = await s3.getObject(paramsReadFile).promise();
  return buffer.Body.toString("utf-8");
};

const embedParameters = (html: string, data: any) => {
  return velocityjs.render(html, data);
};

const processSentEmail = async (
  source: string,
  destination: string[],
  subject: string,
  html: string
) => {
  const params: AWS.SES.SendEmailRequest = {
    Source: source,
    Destination: {
      ToAddresses: destination,
    },
    Message: {
      Body: {
        Html: {
          Data: html,
        },
      },
      Subject: {
        Data: subject,
        Charset: "UTF-8",
      },
    },
  };

  console.log("Sending email", params);
  await ses.sendEmail(params).promise();
  console.log("Email send");
};

const send = async (event) => {
  const html = await readFile(
    "bucket-images-course",
    "emails_confirm/mail-confirm.html"
  );

  const data = {
    name: "Sergio",
    lastname: "Hidalgo",
  };

  const htmlWithParameters = embedParameters(html, data);

  const params = {
    source: "cursoawsgroup05@gmail.com",
    destination: ["cursoawsgroup05@gmail.com"],
    subject: "Confirmación de compra",
    html: htmlWithParameters,
  };
  await processSentEmail(
    params.source,
    params.destination,
    params.subject,
    params.html
  );

  return {
    statusCode: 200,
    body: "Email send",
  };
};

export { send };
