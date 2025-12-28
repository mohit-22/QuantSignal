'use server';

import {auth} from "@/lib/better-auth/auth";
import {inngest} from "@/lib/inngest/client";
import {headers} from "next/headers";

export const signUpWithEmail = async ({ email, password, fullName, country, investmentGoals, riskTolerance, preferredIndustry }: SignUpFormData) => {
    try {
        if (!auth) throw new Error('Auth not initialized');

        // Create the account
        const response = await auth.api.signUpEmail({ body: { email, password, name: fullName } })

        if(response) {
            // Automatically sign in the user after successful account creation
            let signInResult;
            try {
                signInResult = await signInWithEmail({ email, password });
            } catch (signInError) {
                console.warn('Auto sign-in failed after account creation:', signInError);
                signInResult = { success: false, error: 'Auto sign-in failed' };
            }

            // Send welcome email and user creation event (optional - don't fail if Inngest is not configured)
            try {
                await inngest.send({
                    name: 'app/user.created',
                    data: { email, name: fullName, country, investmentGoals, riskTolerance, preferredIndustry }
                });
            } catch (inngestError: any) {
                // Log the error but don't fail the sign-up process
                console.warn('Inngest event failed (this is optional):', inngestError?.message || inngestError);
            }

            return {
                success: true,
                data: response,
                signInSuccess: signInResult.success,
                signInData: signInResult.data
            }
        }

        return { success: false, error: 'Account creation failed' }
    } catch (e) {
        console.log('Sign up failed', e)
        return { success: false, error: e instanceof Error ? e.message : 'Sign up failed' }
    }
}

export const signInWithEmail = async ({ email, password }: SignInFormData) => {
    try {
        if (!auth) throw new Error('Auth not initialized');
        const response = await auth.api.signInEmail({ body: { email, password } })

        return { success: true, data: response }
    } catch (e) {
        console.log('Sign in failed', e)
        return { success: false, error: 'Sign in failed' }
    }
}

export const signOut = async () => {
    try {
        if (!auth) throw new Error('Auth not initialized');
        await auth.api.signOut({ headers: await headers() });
    } catch (e) {
        console.log('Sign out failed', e)
        return { success: false, error: 'Sign out failed' }
    }
}
