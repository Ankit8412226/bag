import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

// Hardcoded JWT secret
const JWT_SECRET = 'bagcorner_super_secret_jwt_key_2026_prod';

const getSecret = () => new TextEncoder().encode(JWT_SECRET);

export async function signToken(payload: Record<string, unknown>): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getSecret());
}

export async function verifyToken(token: string): Promise<Record<string, unknown> | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as Record<string, unknown>;
  } catch {
    return null;
  }
}

export async function getAdminFromCookie(): Promise<Record<string, unknown> | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const admin = await getAdminFromCookie();
  return admin !== null;
}
