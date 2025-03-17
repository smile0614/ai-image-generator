import { connectMongoDB } from '@/app/lib/mongodb/mongodb';
import User from '@/app/lib/mongodb/models/user';
import { NextResponse, NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const token = request.nextUrl.pathname.split('/').pop(); // Extract the token from the URL
  console.log("token", token);
  await connectMongoDB();

  // Find the user by the email token
  const user = await User.findOne(
    { emailToken: token },
  );

  if (user) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: `/forgot-password/reset/${token}`, // Redirect to success page
      },
    });
  } else {
    return new Response(null, {
      status: 302,
      headers: {
        Location: `/forgot-password`, // Redirect to error page
      },
    });
  }
};