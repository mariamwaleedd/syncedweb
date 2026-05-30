const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://uwtejjvilzwbxzhanbyd.supabase.co';
const supabaseKey = 'sb_publishable_qzM2c6A6fQCMcbOgUN7kVg_T5GdRxrp';
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
    const { data: imgsFiles, error: err1 } = await supabase.storage.from('Synced').list('imgs', { limit: 100 });
    if (err1) console.error(err1);
    console.log("FILES IN imgs:", imgsFiles.map(f => f.name));
    for (const folder of imgsFiles.filter(f => f.metadata === null || f.id === undefined || !f.metadata) || []) {
        const path = `imgs/${folder.name}`;
        const { data: subFiles } = await supabase.storage.from('Synced').list(path, { limit: 100 });
        console.log(`FILES IN ${path}:`, subFiles ? subFiles.map(f => f.name) : []);
        for (const subFolder of subFiles.filter(f => !f.metadata) || []) {
            const subPath = `${path}/${subFolder.name}`;
            const { data: subSubFiles } = await supabase.storage.from('Synced').list(subPath, { limit: 100 });
            console.log(`FILES IN ${subPath}:`, subSubFiles ? subSubFiles.map(f => f.name) : []);
        }
    }
}
check();
