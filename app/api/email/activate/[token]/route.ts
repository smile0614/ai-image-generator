import { connectMongoDB } from '@/app/lib/mongodb/mongodb';
import User from '@/app/lib/mongodb/models/user';
import { NextRequest } from 'next/server';

export const GET = async (request: NextRequest) => {
  const token = request.nextUrl.pathname.split('/').pop(); // Extract the token from the URL
  console.log("token", token);
  await connectMongoDB();
  let refCreditsCount = 50;
  let referredByTime = null;

  // Find the user by the email token and update their isActive status
  const user = await User.findOneAndUpdate(
    { emailToken: token },
    { emailVerified: true, emailToken: null },
    { new: true }
  );

  if (user && user.referredBy) {
    referredByTime = new Date();
    // Check if the user was referred by someone and update the referrer
    const update = await User.findByIdAndUpdate(user.referredBy, {
      $inc: { credits: refCreditsCount }, // Increment credits by 50
      $push: { 
        referrals: user._id.toString(),
        referralsTime: referredByTime,
       } // Add this user's ID to the referrer's referrals array
    }, { new: true });

    console.log("Referrer updated: ", update); // Optional: log the updated referrer details
  }
  
  if (user) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: `/activation/success`, // Redirect to success page
      },
    });
  } else {
    return new Response(null, {
      status: 302,
      headers: {
        Location: `/activation/error`, // Redirect to error page
      },
    });
  }
};