import { useEffect, useState } from "react";
import { getSubmissions } from "../supabaseFetcher";

const TableList = ({ message }) => {
    return (
        <div className="w-[200px]">
            <p>{message}</p>
        </div>
    )
}

const SubmissionList = (props) => {
    return (
        <div className='flex w-full border shadow-md p-3 my-2 rounded-xl justify-between items-center'>
            {Object.entries(props).map(([key, value]) => <TableList key={key} message={value}/>)}
        </div>
    )
}

const SubmissionBoard = () => {
    const [submissions, setSubmissions] = useState();
    
    useEffect(() => {
        const fetchSubmissions = async () => {
            const response = await getSubmissions();
            if (response) {
                setSubmissions(response);
            }
        }
        fetchSubmissions();
    }, [])

    return (
        <div className="flex flex-col w-[1200px]">
            <p className='font-medium text-5xl'>Submissions</p>
            <div className="flex flex-col mt-10">
                <div className='font-bold text-xl flex w-full p-3 my-2 rounded-xl justify-between items-center'>
                    <TableList message="ProblemName" />
                    <TableList message="User" />
                    <TableList message="Score" />
                    <TableList message="Time" />
                </div>
                {submissions ? submissions.map(element => <SubmissionList {...element}/>) : "Loading ..."}
            </div>
        </div>
    )
}

export default SubmissionBoard;