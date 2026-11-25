import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const userId = user?.id ?? null;
  const [adminCheck, setAdminCheck] = useState<{
    userId: string | null;
    allowed: boolean | null;
  }>({ userId: null, allowed: null });

  useEffect(() => {
    let active = true;

    if (!userId) {
      setAdminCheck({ userId: null, allowed: false });
      return () => {
        active = false;
      };
    }

    setAdminCheck({ userId, allowed: null });
    supabase
      .rpc("is_current_user_admin")
      .then(
        ({ data, error }) => {
          if (active) setAdminCheck({ userId, allowed: !error && data === true });
        },
        () => {
          if (active) setAdminCheck({ userId, allowed: false });
        },
      );

    return () => {
      active = false;
    };
  }, [userId]);

  if (loading || (userId && (adminCheck.userId !== userId || adminCheck.allowed === null))) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  if (adminCheck.userId !== userId || adminCheck.allowed !== true) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
