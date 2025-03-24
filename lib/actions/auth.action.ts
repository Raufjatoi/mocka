'use server';
import { db, auth } from 'firebase-admin';

import { cookies } from 'next/headers';

const WEEK = 60 * 60 * 24 * 7;

export async function signUp(params: SignUpParams) {
    const { uid, name, email } = params;

    try {
        const userRecord = await db.collection('users').doc(uid).get();

        if (userRecord.exists) {
            return {
                success: false,
                message: 'User already exists. Please sign in.'
            };
        }

        await db.collection('users').doc(uid).set({
            name,
            email
        });

        return {
            success: true,
            message: 'Account created successfully.'
        };
    } catch (e: any) {
        console.log("Error:", e);

        if (e.code === 'auth/email-already-exists') {
            return {
                success: false,
                message: 'This email is already in use.'
            };
        }

        return {
            success: false,
            message: 'Failed to create an account.'
        };
    }
}

export async function signIn(params: SignInParams) {
    const { email, idToken } = params;

    try {
        const userRecord = await auth.getUserByEmail(email);

        if (!userRecord) {
            return {
                success: false,
                message: 'User does not exist. Please create an account.'
            };
        }

        await setSessionCookie(idToken);

        return {
            success: true,
            message: 'Successfully signed in.'
        };
    } catch (e) {
        console.log("Error:", e);

        return {
            success: false,
            message: 'Failed to log into an account.'
        };
    }
}

export async function setSessionCookie(idToken: string) {
    const cookieStore = cookies();

    const sessionCookie = await auth.createSessionCookie(idToken, {
        expiresIn: WEEK * 1000,
    });

    cookieStore.set('session', sessionCookie, {
        maxAge: WEEK,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
    });
}
