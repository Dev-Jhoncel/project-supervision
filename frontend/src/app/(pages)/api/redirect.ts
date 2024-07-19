import { NextResponse } from "next/server";

export default function handler(req, res) {
  const code = req.params;
  return NextResponse.redirect(`/changepassword/${code}`);
}
