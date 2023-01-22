const receive = async (event) => {
  event.Records.forEach((record) => {
    console.log(JSON.parse(record.body));
  });
  return {
    statusCode: 200,
    body: JSON.stringify(event),
  };
};

export { receive };
