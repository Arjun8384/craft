import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

if (!JWT_SECRET) {
 throw new Error("JWT_SECRET is not defined.");
}

export interface TokenPayload extends JwtPayload {
  userId: string;
  email: string;
  role: "admin" | "staff";
}

export const generateToken = (
  payload: Omit<TokenPayload, "iat" | "exp">
) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const verifyToken = (token: string): TokenPayload => {
  return jwt.verify(token, JWT_SECRET) as TokenPayload;
};