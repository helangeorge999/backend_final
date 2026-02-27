declare namespace Express {
  interface Request {
    user?: {
      userId?: string;
      adminId?: string;
      role: string;
    };
  }
}