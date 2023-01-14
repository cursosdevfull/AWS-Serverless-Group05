const sendHandler = async (event: any = {}): Promise<any> => {
  return {
    statusCode: 200,
    body: "Send Handler executed successfully!",
  };
};

export { sendHandler };
