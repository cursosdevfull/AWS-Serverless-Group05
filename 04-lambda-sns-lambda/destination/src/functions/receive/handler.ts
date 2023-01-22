const receive = async (event) => {
  //console.log(JSON.stringify(event, null, "\t"));
  event.Records.forEach((record) => {
    console.log(record.Sns.Message);
  });
  return {
    statusCode: 200,
    body: JSON.stringify(event),
  };
};

export { receive };
