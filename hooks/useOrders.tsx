'use client';

import { useState, useEffect } from 'react';

interface Order {
    _id: string;
    user: {
        _id: string;
        name: string;
        email: string;
    };
    orderItems: any[];
    totalPrice: number;
    isPaid: boolean;
    isDelivered: boolean;
    createdAt: string;
}

export function useOrders(userId?: string) {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchOrders() {
            try {
                const url = userId ? `/api/orders?userId=${userId}` : '/api/orders';
                const response = await fetch(url);
                const data = await response.json();

                if (data.success) {
                    setOrders(data.data);
                } else {
                    setError(data.error);
                }
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchOrders();
    }, [userId]);

    return { orders, loading, error };
}