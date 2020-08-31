import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

export async function encryptPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10)
}

export async function comparePassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return await bcrypt.compare(password, hash)
}

export function userToken(id: number | string) {
  return jwt.sign({ id }, String(process.env.SECRET), {
    expiresIn: 86400,
  })
}
