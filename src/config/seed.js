import sourceData from '@/data.json';
import { supabase } from '@/config/supabase';

export const seedUsers = async () => {
  try {
    sourceData.users.forEach(async (user) => {
      const { error } = await supabase.auth.signUp(
        {
          email: user.email,
          password: 'HelloWorld',
        },
        {
          data: {
            name: user.name,
            username: user.username,
            avatar: user.avatar,
          },
        }
      );
    });
  } catch (error) {
    console.error(error.message);
  }
};

export const seedCategories = async () => {
  // todo
};
