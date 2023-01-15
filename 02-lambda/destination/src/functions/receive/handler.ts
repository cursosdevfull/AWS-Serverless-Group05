const receiveHandler = async (event: any = {}): Promise<any> => {
  return {
    statusCode: 200,
    body: JSON.stringify({ status: "Message received", body: event.Payload }),
  };
};

export { receiveHandler };
