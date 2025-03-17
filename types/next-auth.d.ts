import "next-auth";

declare module "next-auth" {
  interface User {
    id?: string;
    authMethod?: string;
    subscription?: string;
    emailVerified?: boolean;
    credits?: number;
    favorites?: string[];
    favoriteModels?: string[];
    createdAt?: Date;
    updatedAt?: Date;
    referralCode?: string;
    referredBy?: string;
    referrals?: string[];
    visitedSocials?: string[];
    feedbackSubmitted?: boolean;
    feedbackRating?: number;
    feedback1?: string;
    feedback2?: string;
    serviceModalShown?: boolean;
    registrationGtmSent?: boolean;
    stripe_payment_validation_in_process?: boolean;
  }

  interface Session {
    user: {
      id?: string;
      authMethod?: string;
      subscription?: string;
      emailVerified?: boolean;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      credits?: number | null;
      favorites?: string[] | [];
      favoriteModels?: string[] | [];
      createdAt?: Date | null;
      updatedAt?: Date | null;
      referralCode?: string | null;
      referredBy?: string | null;
      referrals?: string[] | [];
      visitedSocials?: string[]| [];
      feedbackSubmitted?: boolean;
      serviceModalShown?: boolean;
      registrationGtmSent?: boolean;
      stripe_payment_validation_in_process?: boolean;
    };
  }
}