'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from '../../../axiosConfig';
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import { Card } from '@/components/ui/card';

const RegisterPage: React.FC = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        try {
            const response = await axios.post('/user-management/users/register', { username, password });
            if (response.status === 201) {
                router.push('/login');
            }
        } catch (error) {
            console.error('Registration failed', error);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <Card className="w-full max-w-md p-8 space-y-4">
                <h1>Register</h1>
                <form onSubmit={handleRegister} className="space-y-4">
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
                    <div>
                        <label>Confirm Password:</label>
                        <Input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <Button type="submit">Register</Button>
                </form>
            </Card>
        </div>
    );
};

export default RegisterPage;
