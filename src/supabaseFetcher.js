import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_PROJECT_URL;
const supabaseKey = process.env.REACT_APP_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchMetadata(contain) {
    try {
        const { data, error } =
            contain && contain.value != 'All' ?
            await supabase
            .from('problemSets')
            .select('*')
            .contains(contain.column, [contain.value]) : 
            await supabase
            .from('problemSets')
            .select('*')
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

async function fetchUniques(column) {
    try {
        const { data, error } = await supabase
            .from('problemSets')
            .select(column)
        if (error) {
            console.error(`Error fetching ${column}:`, error)
            return null
        }
        const uniques = [...new Set(data.flatMap(row => [...row[column]]))]
        return uniques
    } catch (error) {
        console.error(error)
        return null
    }
}

export { fetchMetadata, fetchPDF, fetchUniques }