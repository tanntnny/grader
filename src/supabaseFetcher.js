import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_PROJECT_URL;
const supabaseKey = process.env.REACT_APP_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchMetadata() {
    try {
        const { data, error } = await supabase
            .from('problemSets')
            .select('*');
        if (error) {
            console.error('Error fetching data:', error);
            return [];
        }
        return data;
    } catch (err) {
        console.error('Fetch error:', err);
    }
}

async function fetchPDF(file_name) {
    try {
        const { data, error } = await supabase
            .storage
            .from('pdfFiles')
            .download(file_name)
        if (error) {
            console.error('Error listing files:', error);
            return null;
        }
        const pdfBlob = new Blob([data], { type: 'application/pdf' })
        const fileUrl = URL.createObjectURL(pdfBlob)
        return fileUrl
    } catch (error) {
        console.error(error)
        return null
    }
}


export { fetchMetadata, fetchPDF }