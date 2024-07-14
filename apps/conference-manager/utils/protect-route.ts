import { redirect } from 'next/navigation';

import { createClient } from '@repo/libs/supabase/client';

const protectRoute = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/auth/login');
  }
};

export { protectRoute };
