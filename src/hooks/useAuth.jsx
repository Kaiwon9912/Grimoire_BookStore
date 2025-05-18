import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Lấy user ban đầu
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    // Theo dõi thay đổi đăng nhập/đăng xuất
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return user;
}
