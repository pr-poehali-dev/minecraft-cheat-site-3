import { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';

const queryClient = new QueryClient();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [uid, setUid] = useState<number | null>(null);
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    const savedUid = localStorage.getItem('uid');
    const savedUsername = localStorage.getItem('username');
    if (savedUid && savedUsername) {
      setUid(parseInt(savedUid));
      setUsername(savedUsername);
      setIsAuthenticated(true);
    }
  }, []);

  const handleAuth = (userUid: number, userName: string) => {
    setUid(userUid);
    setUsername(userName);
    setIsAuthenticated(true);
    localStorage.setItem('uid', userUid.toString());
    localStorage.setItem('username', userName);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUid(null);
    setUsername('');
    localStorage.removeItem('uid');
    localStorage.removeItem('username');
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {isAuthenticated && uid ? (
          <Dashboard uid={uid} username={username} onLogout={handleLogout} />
        ) : (
          <Auth onAuth={handleAuth} />
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
