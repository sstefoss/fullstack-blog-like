export interface IUser {
  id: number;
  email: string;
}

export interface IPost {
  id: number;
  title: string;
  body: string;
}

export interface IReaction {
  type: string;
}
