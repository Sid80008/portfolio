import { NextRequest, NextResponse } from "next/server";
import { login } from "@/lib/auth/session";

export async function POST(req: NextRequest) {
  try {
    const { passphrase } = await req.json();

    if (!passphrase) {
      return NextResponse.json({ success: false, error: "Passphrase is required" }, { status: 400 });
    }

    const success = await login(passphrase);

    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
  } catch (err) {
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
