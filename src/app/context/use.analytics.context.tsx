import { useContext } from "react";
import { AnalyticsContext } from "./analytics.context";

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  return context;
};

