const users = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(["user01", "user02", "user03"]),
  };
};

export { users };
