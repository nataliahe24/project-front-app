import { createContext, useState } from "react";
import type { 
  GraphicsData, 
  AnalysisResponse 
} from "../helpers/analytics.model";
import { analyticsService } from "../core/analytics.service";

interface AnalyticsContextType {
  graphicsData: GraphicsData | null;
  loading: boolean;
  getGraphicsData: () => Promise<GraphicsData>;
  getProjectAnalysis: (id: string) => Promise<AnalysisResponse>;
}

export const AnalyticsContext = createContext<AnalyticsContextType>({
  graphicsData: null,
  loading: false,
  getGraphicsData: async () => ({} as GraphicsData),
  getProjectAnalysis: async () => ({} as AnalysisResponse),
});

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

export const AnalyticsContextProvider = ({ 
  children 
}: AnalyticsProviderProps) => {
  const [graphicsData, setGraphicsData] = useState<GraphicsData | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  const getGraphicsData = async () => {
    setLoading(true);
    try {
      const data = await analyticsService.getGraphicsData();
      setGraphicsData(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const getProjectAnalysis = async (id: string) => {
    const data = await analyticsService.getProjectAnalysis(id);
    return data;
  };

  return (
    <AnalyticsContext.Provider
      value={{
        graphicsData,
        loading,
        getGraphicsData,
        getProjectAnalysis,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};

