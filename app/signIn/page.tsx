'use client';

import { signIn } from 'next-auth/react';

const SignInPage = () => {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const target = event.target as typeof event.target & {
          email: { value: string };
          password: { value: string };
        };
        const email = target.email.value;
        const password = target.password.value;
      
        try {
          const result = await signIn('credentials', { email, password, redirect: false });
          // console.log('Sign in result:', result);
        } catch (error) {
          console.error('Sign in error:', error);
        }
      };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div>
          <button type="submit">Sign in with Email</button>
        </div>
      </form>
      <div>
        <button onClick={() => signIn('google', { redirect: false })}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default SignInPage;