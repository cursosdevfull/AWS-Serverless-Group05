const pruebaHandler = async (event: any = {}): Promise<any> => {
  const { body } = event;
  const username = JSON.parse(body).username;

  return {
    statusCode: 200,
    body: username,
  };
};

export { pruebaHandler };
