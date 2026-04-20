import { NextRequest, NextResponse } from "next/server";
import { login } from "@/lib/auth/session";

export async function POST(req: NextRequest) {
  try {
    const { passphrase } = await req.json();
    console.log("[AUTH DEBUG] Login attempt received");

    if (!passphrase) {
      console.log("[AUTH DEBUG] Error: Passphrase missing from request");
      return NextResponse.json({ success: false, error: "Passphrase is required" }, { status: 400 });
    }

    const envPass = process.env.ADMIN_PASSPHRASE;
    console.log("[AUTH DEBUG] Environment Passphrase Loaded:", !!envPass);
    
    const success = await login(passphrase);
    console.log("[AUTH DEBUG] Login comparison success:", success);

    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
  } catch (err) {
    console.error("[AUTH DEBUG] Internal Error during login:", err);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
