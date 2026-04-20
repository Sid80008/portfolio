import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { MessageStatus } from "@prisma/client";

export async function PATCH(req: NextRequest) {
  try {
    const { ids, action } = await req.json();

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ success: false, error: "Invalid payload" }, { status: 400 });
    }

    let updateData = {};
    switch (action) {
      case "READ":
        updateData = { status: MessageStatus.READ };
        break;
      case "UNREAD":
        updateData = { status: MessageStatus.UNREAD };
        break;
      case "ARCHIVE":
        updateData = { status: MessageStatus.ARCHIVED };
        break;
      default:
        return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
    }

    await prisma.contactMessage.updateMany({
      where: { id: { in: ids } },
      data: updateData,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, error: "Operation failed" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { ids } = await req.json();

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ success: false, error: "Invalid payload" }, { status: 400 });
    }

    await prisma.contactMessage.deleteMany({
      where: { id: { in: ids } },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, error: "Deletion failed" }, { status: 500 });
  }
}
