import React from 'react';

interface LayoutAProps {
  children: React.ReactNode;
}

const DefLayout: React.FC<LayoutAProps> = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  );
};

export default DefLayout;
