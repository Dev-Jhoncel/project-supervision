import { SendEmail } from "@/utils/SendEmailFunction/SendEmail";
import { NextRequest, NextResponse } from "next/server";

const data = {
  to: "jhoncel.cadiena@mlhuillier.com",
  subject: "TEST",
  text: "Test",
  html: "<h1>Hello Test </h1>",
};

export default function handler(req: NextRequest, res: NextResponse) {
  const sendEmail = SendEmail(data);
  console.log(sendEmail);

  return { message: "Hello, World!" };
}
