
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

interface ServiceCardProps {
  name: string;
  status: 'UP' | 'DOWN';
  port?: string;
  url?: string;
  amis?: string;
  availabilityZones?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  name,
  status,
  port,
  url,
  amis,
  availabilityZones
}) => {
  const isUp = status === 'UP';
  
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold text-gray-900">
            {name}
          </CardTitle>
          <Badge 
            variant={isUp ? "default" : "destructive"}
            className={isUp ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
          >
            <div className={`w-2 h-2 rounded-full mr-2 ${isUp ? 'bg-green-500' : 'bg-red-500'}`} />
            {status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {port && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Port:</span>
            <span className="font-mono bg-gray-100 px-2 py-1 rounded">{port}</span>
          </div>
        )}
        
        {amis && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">AMIs:</span>
            <span className="text-gray-900">{amis}</span>
          </div>
        )}
        
        {availabilityZones && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">AZ:</span>
            <span className="text-gray-900">{availabilityZones}</span>
          </div>
        )}
        
        {url && (
          <div className="pt-2 border-t">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => window.open(url, '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open Service
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
