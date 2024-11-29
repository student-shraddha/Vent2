import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';

export default function Logout() {
    const router = useRouter();

    useEffect(() => {
        Logout()

    }, [])

    const Logout = async () => {
        await signOut({ redirect: false });
        router.push('/');
    }

    return (
        <></>
    )
}
