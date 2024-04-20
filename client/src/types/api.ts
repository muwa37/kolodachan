type File = {
  name: string;
  full_link: string;
  compressed_link: string;
  extension: string;
  size: number;
};

export type BoardResponse = {
  id: number;
  tag: string;
  image: string;
  title: string;
  description: string;
  default_name: string;
  name_change_allowed: boolean;
  bump_limit: number;
  max_message_length: number;
  allowed_file_types: string[] | null;
  max_file_size: number;
};

export type CommentResponse = {
  comment_number: number;
  position_in_thread: number;
  user_name: string;
  title: string;
  message: string;
  files: File[] | null;
  sage: boolean;
  creation_date: string;
};

export type ThreadResponse = {
  thread_number: number;
  comments: CommentResponse[];
};
