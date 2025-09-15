export interface IRefresh {
  id: number;
  token: string;
  expires_At: Date;
  userId: number;
  name?: string;
}
