import { Request } from 'express';

interface RequestWithUser extends Request {
  user: {
    id: number;
    role: string;
  }
}

export default RequestWithUser