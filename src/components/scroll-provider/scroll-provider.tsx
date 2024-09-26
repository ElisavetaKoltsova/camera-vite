import React, { createContext, useEffect, useState } from 'react';

type ScrollProviderProps = {
  children: React.ReactNode;
}

export const ScrollContext = createContext<{
  disableScroll: () => void;
  enableScroll: () => void;
    } | undefined>(undefined);

export default function ScrollProvider ({children}: ScrollProviderProps): JSX.Element {
  const [isScrollDisabled, setIsScrollDisabled] = useState(false);

  useEffect(() => {
    if (isScrollDisabled) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isScrollDisabled]);

  const disableScroll = () => setIsScrollDisabled(true);
  const enableScroll = () => setIsScrollDisabled(false);

  return (
    <ScrollContext.Provider value={{ disableScroll, enableScroll }}>
      {children}
    </ScrollContext.Provider>
  );
}
