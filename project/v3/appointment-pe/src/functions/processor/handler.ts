const processorHandler = async (event: any = {}): Promise<any> => {
  console.log(event.patientName);
  /*  return {
    statusCode: 200,
    body: JSON.stringify({
      status: "Message received",
      body: event,
    }),
  }; */
  return {
    statusCode: 200,
    body: "Appointment created",
  };
};

export { processorHandler };
