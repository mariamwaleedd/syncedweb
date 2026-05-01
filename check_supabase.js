const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://uwtejjvilzwbxzhanbyd.supabase.co';
const supabaseKey = 'sb_publishable_qzM2c6A6fQCMcbOgUN7kVg_T5GdRxrp';
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
    const { data: offers, error } = await supabase.from('what_we_offer').select('*').eq('type', 'card');
    if (error) console.error(error);
    console.log("OFFERS TITLES:");
    console.log(offers.map(o => o.title_en));
}
check();
