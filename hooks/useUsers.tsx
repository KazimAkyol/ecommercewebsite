'use client';

import { useState, useEffect } from 'react';

interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
}

export function useUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch('/api/users');
                const data = await response.json();

                if (data.success) {
                    setUsers(data.data);
                } else {
                    setError(data.error);
                }
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchUsers();
    }, []);

    return { users, loading, error };
}