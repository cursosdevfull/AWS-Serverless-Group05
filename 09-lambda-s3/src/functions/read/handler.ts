import * as AWS from 'aws-sdk';

const s3 = new AWS.S3();

const read = async (event) => {
  const { Records } = event;

  for (const record of Records) {
    const objS3 = record.s3;
    const bucketName = objS3.bucket.name;
    const key = objS3.object.key;

    const params = { Bucket: bucketName, Key: key };

    const data = await s3.getObject(params).promise();
    console.log(data);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(event),
  };
};

export { read };
