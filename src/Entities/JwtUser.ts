export interface JwtUser {
    sub: string,
    roles: string[],
    iss: string,
    exp: number,
    token: string
  }