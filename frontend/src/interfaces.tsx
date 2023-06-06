export interface IUser {
  id: string;
  email: string;
}

export interface IPost {
  id: string;
  title: string;
  body: string;
}

export interface IReaction {
  type: string;
}
