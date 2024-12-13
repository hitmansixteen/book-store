import { getToken } from "next-auth/jwt";

// 'api/auth/logout' api
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const token = await getToken({ req });

    if (!token) {
      return res.status(401).json({ error: "No active session" });
    }
    
    // Clearing cookies manually
    res.setHeader('Set-Cookie', [
      `next-auth.session-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
      `next-auth.csrf-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
    ]);

    return res.status(200).json({ message: "Logout successful" });

  } catch (error) {

    console.error("Logout error:", error);
    return res.status(500).json({ error: "Failed to log out", details: error.message });
  }
}