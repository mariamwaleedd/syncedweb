import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uwtejjvilzwbxzhanbyd.supabase.co'
const supabaseKey = 'sb_publishable_qzM2c6A6fQCMcbOgUN7kVg_T5GdRxrp'

export const supabase = createClient(supabaseUrl, supabaseKey)

export const fetchWithCache = async (cacheKey, fetchPromise, onData) => {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
        try {
            onData(JSON.parse(cached));
        } catch(e) {}
    }
    
    try {
        const { data, error } = await fetchPromise;
        if (data) {
            localStorage.setItem(cacheKey, JSON.stringify(data));
            onData(data);
        } else if (error) {
            console.error('Supabase fetch error:', error);
        }
    } catch(e) {
        console.error('Error fetching/caching data:', e);
    }
}
