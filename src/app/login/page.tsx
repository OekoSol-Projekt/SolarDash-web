'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from '../../../axiosConfig';
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import { Card } from '@/components/ui/card';

const LoginPage: React.FC = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('/users/login', { username, password });
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token); // Save JWT token
                router.push('/dashboard'); // Redirect to dashboard
            }
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <Card className="w-full max-w-md p-8 space-y-4">
                <h1>Login</h1>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label>Username:</label>
                        <Input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <Button type="submit">Login</Button>
                </form>
            </Card>
        </div>
    );
};

export default LoginPage;
