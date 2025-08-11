import React, { useEffect, useState } from 'react';

const ClientOnly = ({ children }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Do not render anything until the component has mounted on the client
  }

  return <>{children}</>;
};

export default ClientOnly;
