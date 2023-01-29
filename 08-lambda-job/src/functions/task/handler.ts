const task = async (event) => {
  console.log("task time", new Date().toISOString());
  return {
    statusCode: 200,
    body: JSON.stringify({ status: "Message received", body: event.Payload }),
  };
};

export { task };
