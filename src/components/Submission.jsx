import { useState } from "react";

const Task = ({ status }) => {
    let message, color = ''
    if (status == 'p') {
        message = 'PASS'
        color = 'border-lime-400'
    } else if (status == 't') {
        message = 'TIME EXCEED'
    } else if (status == 'f') {
        message = 'FAILED'
        color = 'border-red-400'
    } else if (status == 'e') {
        message = 'COMPILATION ERROR'
    }
    return (
        <div className={`border-2 m-2 my-5 p-1.5 rounded-lg ${color}`}>
            {message}
        </div>
    )
}

const Submission = ({ name }) => {
    const [file, setFile] = useState(null);
    const [result, setResult] = useState('');

    const handleFileChange = (e) => setFile(e.target.files[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!file || !name) {
            setResult('Please upload a file and enter the problem name');
            return;
        }
    
        const formData = new FormData();
        formData.append('codeFile', file);
        formData.append('problemName', name);
    
        try {
            const response = await fetch('http://127.0.0.1:5000/grade', {
                method: 'POST',
                body: formData,
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error from server:', errorData);
                setResult(`Error: ${errorData.message || 'Unknown error'}`);
                return;
            }
    
            const data = await response.json();
            setResult(data.message);
        } catch (error) {
            console.error('Fetch error:', error);
            setResult(`Grade submission error: ${error.message}`);
        }
    };

    let countPass = 0
    for (const i of result) {
        if (i === 'p') {
            countPass += 1
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="my-4">
                <input type="file" onChange={handleFileChange} required className="mb-4" />
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Upload & Grade
                </button>
            </form>
            {result && result.map((element) => <Task status={element} />)}
            {result && <p className="font-bold">PASS: {countPass / result.length * 100}%</p>}
        </div>
    )
}

export default Submission