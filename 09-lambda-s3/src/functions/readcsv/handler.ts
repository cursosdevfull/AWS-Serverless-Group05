import * as AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

const dynamodb = new AWS.DynamoDB.DocumentClient();

const s3 = new AWS.S3();

interface MedicSchedule {
  medicId: number;
  nameMedic: string;
  specialtyId: number;
  nameSpecialty: string;
  dateSchedule: Date;
  visitType: string;
}

const convertFromCSVToDomain = (lines): MedicSchedule[] =>
  lines.map((line) => {
    const [
      medicId,
      nameMedic,
      specialtyId,
      nameSpecialty,
      dateSchedule,
      visitType,
    ] = line.split(",");

    return {
      medicId: parseInt(medicId),
      nameMedic,
      specialtyId: parseInt(specialtyId),
      nameSpecialty,
      dateSchedule: new Date(dateSchedule),
      visitType: visitType.replace("\r", ""),
    };
  });

const insertInDynamo = async (medicSchedules: MedicSchedule[]) => {
  for (const medicSchedule of medicSchedules) {
    const dataToInsert = {
      id: uuidv4(),
      ...medicSchedule,
    };

    const params = {
      TableName: "MedicSchedule",
      Item: dataToInsert,
    };

    await dynamodb.put(params).promise();
  }
};

const readLines = async (record: any): Promise<string[]> => {
  const objS3 = record.s3;
  const bucketName = objS3.bucket.name;
  const key = objS3.object.key;

  const params = { Bucket: bucketName, Key: key };

  const data = await s3.getObject(params).promise();
  const body = data.Body.toString("utf-8");

  return body.split("\n");
};

const readcsv = async (event) => {
  const { Records } = event;

  for (const record of Records) {
    const lines: Awaited<string[]> = await readLines(record);

    const medicSchedule: MedicSchedule[] = convertFromCSVToDomain(lines);

    await insertInDynamo(medicSchedule);

    console.log(`schedules inserted: ${lines.length}`);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(event),
  };
};

export { readcsv };
