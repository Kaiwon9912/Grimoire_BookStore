import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export const useFetch = (table, options = {}) => {
  const { match, orderBy, limit, single, select } = options;
  const [data, setData] = useState(single ? null : []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let query = supabase.from(table).select(select || '*', { foreignTable: undefined });

        if (match) {
          query = query.match(match);
        }

        if (orderBy) {
          const { column, ascending } = orderBy;
          query = query.order(column, { ascending });
        }

        if (limit) {
          query = query.limit(limit);
        }

        if (single) {
          query = query.single();
        }

        const { data, error } = await query;

        if (error) throw error;

        setData(data);
      } catch (err) {
        setError(err.message || 'Fetch error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [table, JSON.stringify(match), JSON.stringify(orderBy), limit, single]);

  return { data, loading, error };
};
