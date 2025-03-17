import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from   "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import User from "@/app/lib/mongodb/models/user";
import { connectMongoDB } from "@/app/lib/mongodb/mongodb";
import { NextApiRequest } from "next";

type CombineRequest = Request & NextApiRequest;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const FREE_PLAN_CREDITS = parseInt(process.env.FREE_PLAN_CREDITS!);


export const authOptions = (req: CombineRequest): NextAuthOptions => ({
    session: {
        strategy: 'jwt'
    },
    providers: [
        GoogleProvider({
          clientId: GOOGLE_CLIENT_ID,
          clientSecret: GOOGLE_CLIENT_SECRET,
          httpOptions: {
            timeout: 10000,
          },
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
              email: { label: 'Email', type: 'email' },
              password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials) return null;
                const { email, password } = credentials;
            
                try {
                  await connectMongoDB();
                } catch (err) {
                    console.error("MongoDB connection failed:", err);
                    throw new Error("Failed to connect to the database.");
                }
            
                let user;
                try {
                    user = await User.findOne({ email: credentials.email }).select("+password");
                } catch (err) {
                    console.error("Error fetching user from the database:", err);
                    throw new Error("Error retrieving user.");
                }

                if (!user) throw new Error("This email is not registered");

                try {
                    const passwordMatch = await bcrypt.compare(credentials.password, user.password);
                    if (!passwordMatch) throw new Error("Incorrect password");
                } catch (err) {
                    console.error("Error comparing passwords:", err);
                    throw new Error("Password verification failed.");
                }
                
                console.log('Authorized user:', { id: user.id, name: user.name, email: user.email, emailVerified: user.emailVerified, authMethod: user.authMethod, subscription: user.subscription, credits: user.credits });
                return { 
                  id: user.id, 
                  name: user.name, 
                  email: user.email, 
                  emailVerified: user.emailVerified, 
                  authMethod: user.authMethod, 
                  subscription: user.subscription, 
                  credits: user.credits,
                  favorites: user.favorites,
                  favoriteModels: user.favoriteModels,
                  createdAt: user.createdAt, 
                  updatedAt: user.updatedAt,
                  referralCode: user.referralCode,
                  referredBy: user.referredBy,
                  referrals: user.referrals,
                  visitedSocials: user.visitedSocials,
                  feedbackSubmitted: user.feedbackSubmitted,
                  serviceModalShown: user.serviceModalShown,
                  registrationGtmSent: user.registrationGtmSent,
                  stripe_payment_validation_in_process: user.stripe_payment_validation_in_process,
                };
            }
          }),
    ],
    callbacks: {
      async jwt({ token, user, session, trigger }) {
        try {

          if (user) {
            // console.log('jwt',token, user)
            token.id = user.id;
            token.email = user.email;
            token.emailVerified = user.emailVerified;
            token.name = user.name;
            token.authMethod = user.authMethod;
            token.subscription = user.subscription;
            token.credits = user.credits;
            token.favorites = user.favorites;
            token.favoriteModels = user.favoriteModels;
            token.createdAt = user.createdAt;
            token.updatedAt = user.updatedAt;
            token.referralCode = user.referralCode;
            token.referredBy = user.referredBy;
            token.referrals = user.referrals;
            token.visitedSocials = user.visitedSocials;
            token.feedbackSubmitted = user.feedbackSubmitted;
            token.serviceModalShown = user.serviceModalShown;
            token.registrationGtmSent = user.registrationGtmSent;
            token.stripe_payment_validation_in_process = user.stripe_payment_validation_in_process;
          }
      
          if (trigger === "update" && session?.user) {
            // If anywhere in the code await update({ user: { ...session?.user, credits: deductionData.newTokenCount } }); add params below
            // console.log('token.name', token.name);
            // console.log('session.name', session.user.name);
            token.name = session.user.name;
            token.emailVerified = session.user.emailVerified;
            token.credits = session.user.credits;
            token.favorites = session.user.favorites;
            token.favoriteModels = session.user.favoriteModels;
            token.subscription = session.user.subscription;
            token.visitedSocials = session.user.visitedSocials;
            token.feedbackSubmitted = session.user.feedbackSubmitted;
            token.serviceModalShown = session.user.serviceModalShown;
            token.registrationGtmSent = session.user.registrationGtmSent;
            token.stripe_payment_validation_in_process = session.user.stripe_payment_validation_in_process;

          }

        // if (trigger === "update" && session?.user?.credits) {
        //   token.credits = session.user.credits;
        // }
      
          return token;
        
      } catch (err) {
        console.error("JWT callback error:", err);
        return token;
    }
      },
      async session({ session, token }) {
        try {
          return {
            ...session,
            user: {
              ...session.user,
              id: token.id,
              name: token.name,
              email: token.email,
              authMethod: token.authMethod,
              subscription: token.subscription,
              emailVerified: token.emailVerified,
              credits: token.credits,
              favorites: token.favorites,
              favoriteModels: token.favoriteModels,
              createdAt: token.createdAt,
              updatedAt: token.updatedAt,
              referralCode: token.referralCode,
              referredBy: token.referredBy,
              referrals: token.referrals,
              visitedSocials: token.visitedSocials,
              feedbackSubmitted: token.feedbackSubmitted,
              serviceModalShown: token.serviceModalShown,
              registrationGtmSent: token.registrationGtmSent,
              stripe_payment_validation_in_process: token.stripe_payment_validation_in_process,
            }
          };
        } catch (err) {
            console.error("Session callback error:", err);
            return session; // Return the original session object
        }

      },
      async signIn({ user, account, profile }) {
        if (account && account.provider === "google") {
          
          try {
              await connectMongoDB();
          } catch (err) {
              console.error("MongoDB connection failed during sign-in:", err);
              throw new Error("Database connection error during sign-in.");
          }


          let referralCode = null;
          let refId = null;
          let initialCredits = FREE_PLAN_CREDITS;
          let refCreditsCount = 50;
          let referringUser = null;
          let referredByTime = null;
          let fingerprintId = null;

          if (req.cookies && req.cookies._parsed) {
            try {
            const cookiesMap = req.cookies && req.cookies._parsed;
            // console.log("cookiesMap: ", cookiesMap)

            if (cookiesMap && typeof cookiesMap === "object") {
                const cookiesObject = Object.fromEntries(cookiesMap);
                // console.log(cookiesObject);
                const mixartRefcode = cookiesObject['mixart_refcode'];
                const fingerprintIdCookie = cookiesObject['fingerprintId'];

                if (mixartRefcode && mixartRefcode.value) {
                    referralCode = mixartRefcode.value;
                    referringUser = await User.findOne({ referralCode: referralCode });
                    if (referringUser) {
                        refId = referringUser._id;
                        referredByTime = new Date();
                        initialCredits += refCreditsCount;
                        // console.log('refId', refId);
                    }
                    // console.log("mixartRefcode", referralCode);
                }

                if (fingerprintIdCookie && fingerprintIdCookie.value) {
                  try {
                    fingerprintId = JSON.parse(fingerprintIdCookie.value).fingerprintId;
                    // console.log('Parsed fingerprintId:', fingerprintId);
                  } catch (error) {
                    console.error("Error parsing fingerprintId:", error);
                  }
                }

              } else {
                console.error("cookiesMap is not an object or does not exist");
              }
            } catch (err) {
                console.error("Cookie parsing or referral processing error:", err);
            }
          }

          const existingUser = await User.findOne({ email: user.email });

          if (existingUser && !existingUser.fingerprintId && fingerprintId) {
            await User.findByIdAndUpdate(existingUser._id, {
              $set: { fingerprintId: fingerprintId }
            });
          }

          if (!existingUser) {
            // Create a new user in the database if they don't exist
            const newUser = await User.create({
              name: user.name,
              email: user.email,
              emailToken: null,
              emailVerified: true,
              authMethod: 'google',
              subscription: 'Free',
              credits: initialCredits,
              favorites: [],
              favoriteModels: [],
              referredBy: refId,
              referredByTime: referredByTime,
              visitedSocials: [],
              feedbackSubmitted: false,
              serviceModalShown: false,
              registrationGtmSent: false,
              fingerprintId: fingerprintId,
              stripe_payment_validation_in_process: false,
            });

            const createdAt = newUser.createdAt;
            newUser.subscriptionEndDate = new Date(createdAt);
            newUser.subscriptionEndDate.setMonth(newUser.subscriptionEndDate.getMonth() + 1);

            await newUser.save();
            
            user.id = newUser._id;
            user.emailVerified = newUser.emailVerified;
            user.authMethod = newUser.authMethod;
            user.subscription = newUser.subscription;
            user.credits = newUser.credits;
            user.favorites = newUser.favorites;
            user.favoriteModels = newUser.favoriteModels;
            user.createdAt = newUser.createdAt;
            user.updatedAt = newUser.updatedAt;
            user.referralCode = newUser.referralCode;
            user.referredBy = newUser.referredBy;
            user.referrals = newUser.referrals;
            user.visitedSocials = newUser.visitedSocials;
            user.feedbackSubmitted = newUser.feedbackSubmitted;
            user.serviceModalShown = newUser.serviceModalShown;
            user.registrationGtmSent = newUser.registrationGtmSent;
            user.stripe_payment_validation_in_process = newUser.registrationGtmSent;

            if (referringUser && newUser._id) {
                await User.findByIdAndUpdate(referringUser._id, {
                    $inc: { credits: refCreditsCount },
                    $push: { 
                      referrals: newUser._id.toString(),
                      referralsTime: referredByTime
                    }
                });
            }
            
            // if (referringUser && newUser._id) {
            //     await User.findByIdAndUpdate(referringUser._id, {
            //         $push: { referrals: newUser._id.toString(),
            //         $push: { referralsTime: referredByTime } 
            //       }
            //     });
            // }

          } else {

            user.id = existingUser._id;
            user.emailVerified = existingUser.emailVerified;
            user.authMethod = existingUser.authMethod;
            user.subscription = existingUser.subscription;
            user.credits = existingUser.credits;
            user.favorites = existingUser.favorites;
            user.favoriteModels = existingUser.favoriteModels;
            user.createdAt = existingUser.createdAt;
            user.updatedAt = existingUser.updatedAt;
            user.referralCode = existingUser.referralCode;
            user.referredBy = existingUser.referredBy;
            user.referrals = existingUser.referrals;
            user.visitedSocials = existingUser.visitedSocials;
            user.feedbackSubmitted = existingUser.feedbackSubmitted;
            user.serviceModalShown = existingUser.serviceModalShown;
            user.registrationGtmSent = existingUser.registrationGtmSent;
            user.stripe_payment_validation_in_process = existingUser.registrationGtmSent;
          }
        }
        return true;
      },
        // async session({ session }) {
        //     console.log('session', session);
        //   return session;
        // },
      },
});