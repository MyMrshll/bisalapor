import React, { createContext, useContext, useState, useEffect } from 'react';

export type RouteKey =
  | 'overview'
  | 'work-orders'
  | 'work-order-detail'
  | 'reports'
  | 'report-review'
  | 'inbox'
  | 'technicians'
  | 'customers'
  | 'settings';

interface NavigationContextType {
  currentRoute: RouteKey;
  activeNavTile: string; // the primary nav item (e.g. 'work-orders' even when on 'work-order-detail')
  navigateTo: (route: RouteKey) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getInitialRoute = (): RouteKey => {
    const hash = window.location.hash.replace(/^#\/?/, '') as RouteKey;
    const validRoutes: RouteKey[] = [
      'overview',
      'work-orders',
      'work-order-detail',
      'reports',
      'report-review',
      'inbox',
      'technicians',
      'customers',
      'settings',
    ];
    return validRoutes.includes(hash) ? hash : 'overview';
  };

  const [currentRoute, setCurrentRoute] = useState<RouteKey>(getInitialRoute);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '') as RouteKey;
      if (hash && hash !== currentRoute) {
        setCurrentRoute(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentRoute]);

  const navigateTo = (route: RouteKey) => {
    setCurrentRoute(route);
    window.location.hash = route;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeNavTile =
    currentRoute === 'work-order-detail'
      ? 'work-orders'
      : currentRoute === 'report-review'
      ? 'reports'
      : currentRoute;

  return (
    <NavigationContext.Provider value={{ currentRoute, activeNavTile, navigateTo }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
