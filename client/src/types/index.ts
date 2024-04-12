export type Attachment = {
  link: string;
  name: string;
};

export type Data = {
  username: string;
  time: string;
  number: string;
};

export type Board = {
  title: string;
  id: string;
  description: string;
  info: string;
  img: string;
};

export type Thread = {
  id: string;
  title: string;
  board: string;
  text: string;
  attachments: Attachment[];
  data: Data;
};

export type Comment = {
  id: string;
  text: string;
  thread: string;
  attachments: Attachment[];
  data: Data;
};

export type Info = {
  id: string;
  title: string;
  info: string[];
};
