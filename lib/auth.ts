import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import bcrypt from 'bcryptjs';
import { getUserByEmail, createUser, createOAuthUser } from './db';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        name: { label: 'Name', type: 'text' },
        isSignUp: { label: 'Sign Up', type: 'text' },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.error('Missing email or password');
            return null;
          }

          const email = credentials.email as string;
          const password = credentials.password as string;
          const isSignUp = credentials.isSignUp === 'true';

          if (isSignUp) {
            // Sign up flow
            const existingUser = await getUserByEmail(email);
            if (existingUser) {
              throw new Error('User already exists');
            }

            const passwordHash = await bcrypt.hash(password, 10);
            const user = await createUser(email, passwordHash, credentials.name as string);

            return {
              id: user.id.toString(),
              email: user.email,
              name: user.name,
            };
          } else {
            // Sign in flow
            const user = await getUserByEmail(email);
            if (!user) {
              console.error('User not found:', email);
              return null;
            }

            if (!user.password_hash) {
              console.error('User signed up with OAuth, no password set:', email);
              return null;
            }

            const isValid = await bcrypt.compare(password, user.password_hash);
            if (!isValid) {
              console.error('Invalid password for user:', email);
              return null;
            }

            return {
              id: user.id.toString(),
              email: user.email,
              name: user.name,
            };
          }
        } catch (error) {
          console.error('Auth error:', error);
          throw error;
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google' && user.email) {
        // Look up or create the user in our DB for OAuth sign-ins
        let dbUser = await getUserByEmail(user.email);
        if (!dbUser) {
          dbUser = await createOAuthUser(user.email, user.name || undefined);
        }
        // Attach our DB id so the jwt callback can use it
        user.id = dbUser.id.toString();
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }
      // For OAuth sign-ins, also look up DB id if not already set
      if (account?.provider === 'google' && token.email && !token.id) {
        const dbUser = await getUserByEmail(token.email);
        if (dbUser) {
          token.id = dbUser.id.toString();
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
});
