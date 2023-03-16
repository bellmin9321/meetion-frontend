export interface PageType {
  _id?: string;
  creator: string;
  title: string;
  desc?: string;
}

export interface UserType {
  email: string;
  image: string;
  name: string;
}
