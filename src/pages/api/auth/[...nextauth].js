import NextAuth from 'next-auth';
import { Providers } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import axiosInstance from "@/utils/axiosInstance"

var UserRole = null
export default NextAuth({
    secret: process.env.AUTH_SECRET,
    providers: [
        CredentialsProvider({
            credentials: {
                email: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {

                try {
                    const response = await axiosInstance.post("/v1/auth/user/login", {
                        email: credentials.email,
                        password: credentials.password,
                    });

                    if (response.status === 200) {

                        const login_res = response.data;

                        const token = login_res.token;
                        const profile_response = await axiosInstance.get("/v1/auth/profile", {
                            headers: { Authorization: `Bearer ${token}` }
                        });

                        if (profile_response.status === 200) {
                            const user = profile_response.data.data.user;

                            UserRole = user.type;
                            const ReturnedUserObj = {
                                user_id: user.id,
                                username: user.username,
                                email: user.email,
                                mobile: user.mobile,
                                address: user.address,
                                profile: user.profile,
                                type: user.type,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                isBlocked: user.isBlocked,
                                token: token
                            };

                            return Promise.resolve(ReturnedUserObj);
                        }

                    }
                } catch (error) {
                    //console.log("error", error)
                    const ErrorObject = {
                        responseMessage: error.response.data.message,
                        responseStatus: error.response.status,
                    };
                    throw new Error(JSON.stringify(ErrorObject));
                }
            },
        })
    ],

    callbacks: {
        async signIn(user, account, profile) {
            return true;
        },
        async jwt(returnedObj) {
            const { token, user, account, trigger, session } = returnedObj;


            let updatedData = {};
            // UPDATING SESSION IMAGE
            if (trigger === "update") {
                updatedData = { ...session }
            }

            return { ...token, ...user, ...updatedData }; // Set your custom token value
        },
        async session(returnedObj) {
            const { session, token } = returnedObj;
            session.user = token; // Set your custom token value
            return session;
        },

        async redirect({ url, baseUrl }) {

            const redirectUrl = (UserRole === "Host" ? (`${process.env.NEXT_PUBLIC_DOMAIN}/host`) : process.env.NEXT_PUBLIC_DOMAIN)
            return redirectUrl;
        },
    },
    events: {
        async signIn(message) {
            // console.log('signIn event', message);
        },
    },
    session: {
        // jwt: true,
        strategy: "jwt",
    },

});