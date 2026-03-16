import React, { createContext, useContext, useState, useCallback } from 'react';

type ScrollContextType = {
  videoFullscreen: boolean;
  setVideoFullscreen: (v: boolean) => void;
  videoProgress: number;
  setVideoProgress: (v: number) => void;
};

const ScrollContext = createContext<ScrollContextType>({
  videoFullscreen: false,
  setVideoFullscreen: () => {},
  videoProgress: 0,
  setVideoProgress: () => {},
});

export const useScrollContext = () => useContext(ScrollContext);

export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [videoFullscreen, setVideoFullscreenState] = useState(false);
  const [videoProgress, setVideoProgressState] = useState(0);

  const setVideoFullscreen = useCallback((v: boolean) => {
    setVideoFullscreenState(v);
  }, []);

  const setVideoProgress = useCallback((v: number) => {
    setVideoProgressState(v);
  }, []);

  return (
    <ScrollContext.Provider value={{ videoFullscreen, setVideoFullscreen, videoProgress, setVideoProgress }}>
      {children}
    </ScrollContext.Provider>
  );
};
