export interface UserUpdateDTO {
  username: string;
  profilePicture: string;
}

export interface UserResponseDTO {
  address: string;
  username?: string;
  profilePicture: string;
}
