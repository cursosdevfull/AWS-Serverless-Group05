export class PolicyService {
  static generate(principalId: string, effect: string, resource: string) {
    const policyDocument = {
      Version: "2012-10-17",
      Statement: [
        {
          Effect: effect,
          Action: "execute-api:Invoke",
          Resource: resource,
        },
      ],
    };

    console.log({
      principalId,
      policyDocument,
    });

    return {
      principalId,
      policyDocument,
    };
  }
}
