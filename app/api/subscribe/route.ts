import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ error: "邮箱必填" }, { status: 400 });

  // 懒加载：构建期不存在 RESEND_API_KEY 时不在模块顶层抛错，仅运行时缺失才报错
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "邮件服务未配置" }, { status: 500 });
  }
  const resend = new Resend(apiKey);

  const { error } = await resend.contacts.create({ email });

  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ success: true });
}