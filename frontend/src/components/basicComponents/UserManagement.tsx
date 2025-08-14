
'use client';

import React, { useState, useEffect } from 'react';
import { userService } from '@/services/userService/userService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Users, UserCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const searchUsers = async () => {
    if (!searchTerm.trim()) {
      fetchAllUsers();
      return;
    }
    
    setLoading(true);
    try {
      const data = await userService.searchUsers(searchTerm);
      setUsers(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to search users",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          User Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Search users by username..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && searchUsers()}
          />
          <Button onClick={searchUsers} disabled={loading}>
            <Search className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {loading ? (
            <div className="text-center py-4 text-gray-500">Loading users...</div>
          ) : users.length === 0 ? (
            <div className="text-center py-4 text-gray-500">No users found</div>
          ) : (
            users.map((user: any, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <UserCheck className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="font-medium">{user.username || user.name || 'Unknown User'}</p>
                    <p className="text-sm text-gray-500">{user.email || 'No email'}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserManagement;
