import React, { createContext, useState, useEffect, useContext } from 'react';
import { createClient } from '@supabase/supabase-js';

const SupabaseContext = createContext(null);

const supabaseUrl = 'https://dujmewxttrgmhhjyepbo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1am1ld3h0dHJnbWhoanllcGJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkwNjcxMTEsImV4cCI6MjA1NDY0MzExfQ.oq0U5r4j3mmOGI6-mQdL9AyL8rg0D9vgR3HmSKYrTiA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const SupabaseContextProvider = ({ children }) => {
  const [session, setSession] = useState(null);

    useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, []);

  return (
    <SupabaseContext.Provider value={{ supabase, session }}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => useContext(SupabaseContext);
