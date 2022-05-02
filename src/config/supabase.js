import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://gkantgxspryqkwznznjm.supabase.co';
const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdrYW50Z3hzcHJ5cWt3em56bmptIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTEzMTc0MjYsImV4cCI6MTk2Njg5MzQyNn0.RIsN7sU6DIIOFc4WeeivcWNjNlD0S8QTvamFQPcrKBQ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
