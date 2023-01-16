import * as AWS from 'aws-sdk';

enum ISO_COUNTRY {
  COLOMBIA = "CO",
  MEXICO = "MX",
  PERU = "PE",
}

interface Message {
  isoCountry: ISO_COUNTRY;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  nameSpecialty: string;
  nameDoctor: string;
  appointmentDate: string;
}

const lambda = new AWS.Lambda();

const sendMessage = async (information: Message): Promise<any> => {
  const isoCountry = information.isoCountry;
  let lambdaFunctionNameDestination = "";
  switch (isoCountry) {
    case ISO_COUNTRY.COLOMBIA:
      lambdaFunctionNameDestination = "cursosdev-appointment-co-dev-processor";
      break;
    case ISO_COUNTRY.MEXICO:
      lambdaFunctionNameDestination = "cursosdev-appointment-mx-dev-processor";
      break;
    case ISO_COUNTRY.PERU:
      lambdaFunctionNameDestination = "cursosdev-appointment-pe-dev-processor";
      break;
  }

  return await lambda
    .invoke({
      FunctionName: lambdaFunctionNameDestination,
      InvocationType: "RequestResponse",
      Payload: JSON.stringify(information),
    })
    .promise();
};

const appointmentHandler = async (event: any = {}): Promise<any> => {
  const { body } = event;

  const information: Message = JSON.parse(body);
  const result = await sendMessage(information);

  return {
    statusCode: 200,
    body: `Message send: ${JSON.stringify(result)}`,
  };
};

export { appointmentHandler };
