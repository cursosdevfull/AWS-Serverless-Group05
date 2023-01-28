const receive = async (event) => {
  //throw new Error("An error occurred");

  event.Records.forEach((record) => {
    console.log(JSON.parse(record.body));
  });
  return {
    statusCode: 200,
    body: JSON.stringify(event),
  };
};

export { receive };
