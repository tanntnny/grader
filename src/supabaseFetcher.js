import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_PROJECT_URL;
const supabaseKey = process.env.REACT_APP_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchMetadata(searching) {
    let firstRow
    try {
        const {data, error} = await supabase
            .from('problemSets')
            .select('*')
            .limit(1)
        if (error) {
            console.error('Error fetching first row:', error)
            firstRow = null
        } else {
            firstRow = data[0]
        }
    } catch (err) {
        console.error('Error:', err)
    }

    try {
        let query = supabase
            .from('problemSets')
            .select('*')
        for (const key in searching) {
            if (searching[key] !== 'All') {
                if (Array.isArray(firstRow[key])) {
                    query = query.contains(key, [searching[key]])
                } else {
                    query = query.match({[key]: searching[key]})
                }
            }
        }
        const { data, error } = await query
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
        let uniques
        if (Array.isArray(data[0][column])) {
            uniques = [...new Set(data.flatMap(row => [...row[column]]))]
        } else {
            uniques = [...new Set(data.flatMap(row => row[column]))]
        }
        return uniques
    } catch (error) {
        console.error(error)
        return null
    }
}

const convertTime = (isoTime) => {
    const utcDate = new Date(isoTime)
    const utcPlus = new Date(utcDate.getTime() + 7 * 3600 * 1000)
    const hours = String(utcPlus.getUTCHours()).padStart(2, '0');
    const minutes = String(utcPlus.getUTCMinutes()).padStart(2, '0');
    const seconds = String(utcPlus.getUTCSeconds()).padStart(2, '0');
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    return formattedTime
}

const getSubmissions = async () => {
    try {
        const {data, err} = await supabase
            .from('submissions')
            .select('displayName, problemName, score, createdAt')
        if (err) {
            console.error('Error:', err);
            return null;
        }
        const newData = [...data.map(element => {
            return {...element, createdAt: convertTime(element.createdAt)}
        })]
        return newData
    } catch(err) {
        console.error('Error fetching submissions:', err)
    }
}

export { fetchMetadata, fetchPDF, fetchUniques, getSubmissions }