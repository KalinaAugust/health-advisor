import { auth } from "@/auth";
import { pool } from "@/lib/auth-db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const name = typeof body?.name === "string" ? body.name.trim() : "";

  if (!name) {
    return NextResponse.json({ error: "Invalid name" }, { status: 400 });
  }

  await pool.query("UPDATE users SET name = $1 WHERE id = $2", [
    name,
    session.user.id,
  ]);

  return NextResponse.json({ ok: true });
}
