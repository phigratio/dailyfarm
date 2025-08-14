
'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, Users } from 'lucide-react';

const LoginPage = () => {
  const { login } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              MetaHive Dashboard
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Secure access to your service management console
            </p>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-blue-50 rounded-lg">
              <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-blue-900">User Management</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <Lock className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-green-900">Secure Access</p>
            </div>
          </div>
          
          <Button 
            onClick={login} 
            className="w-full bg-blue-600 hover:bg-blue-700"
            size="lg"
          >
            Sign in with Keycloak
          </Button>
          
          <p className="text-xs text-center text-gray-500">
            Protected by Keycloak authentication
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
