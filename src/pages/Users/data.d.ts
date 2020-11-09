export interface SingleUserType {
  id: number,
  username: string,
  email: string,
  created_at: string,
  updated_at: string,
  status: 1
}

export interface FormValue {
  [name: string]: any
}