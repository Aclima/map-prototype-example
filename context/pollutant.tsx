import { createContext, useContext, useState } from 'react';

interface PollutantContextProps {
  pollutant: string;
  setPollutant: (pollutant: string) => void;
}

export const PollutantContext = createContext<PollutantContextProps>(null);

export const usePollutant = (): PollutantContextProps => {
  const context = useContext(PollutantContext);
  if (!context) {
    throw new Error('usePollutant must be used within a PollutantProvider');
  }
  return context;
};

export const PollutantProvider = ({ children }) => {
  const [pollutant, setPollutant] = useState<string>('blackcarbon');

  return (
    <PollutantContext.Provider value={{ pollutant, setPollutant }}>
      {children}
    </PollutantContext.Provider>
  );
};
