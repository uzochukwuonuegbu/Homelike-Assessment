export interface User {
  id: string;
  email: string;
  // DynamoDb composite key
  sKey?: string;
  password?: string;
  firstName: string;
  lastName: string;
}

export interface RequestWithUser extends Request {
  user: User;
}
