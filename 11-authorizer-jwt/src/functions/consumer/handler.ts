const consumer = async (event) => {
  const products = [
    { id: 1, name: "Product 1" },
    { id: 2, name: "Product 2" },
    { id: 3, name: "Product 3" },
    { id: 4, name: "Product 4" },
    { id: 5, name: "Product 5" },
  ];

  return {
    statusCode: 200,
    body: JSON.stringify(products),
  };
};

export { consumer };
