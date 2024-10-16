import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { twMerge } from 'tailwind-merge';
import { fetchMetadata } from "../supabaseFetcher";

const List = (props) => {
    const navigate = useNavigate();

    const handleClick = () => {
        const json = JSON.stringify(props)
        navigate(`/view/${encodeURIComponent(json)}`)
    }

    return (
        <div className='flex flex-col w-[800px] border shadow-md p-3 m-1 rounded-xl cursor-pointer hover:bg-zinc-100' onClick={handleClick}>
            <div className='flex justify-between'>
                <p className='font-semibold text-[16px]'>{props.name}</p>
                <p className='font-semibold text-[16px]'>{props.difficulty}</p>
            </div>
            <div className='flex'>
                <p className='font-light text-[14px]'>Author: {props.author}</p>
            </div>
        </div>
    )
}

const ProblemList = ({ className }) => {
    const [problemSetsData, setProblemSetsData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchMetadata()
                setProblemSetsData(response)
            } catch (error) {
                console.error('Error fetching problem sets data:', error)
            }
        }
        fetchData();
    }, [])

    return (
        <div className={twMerge('flex flex-col justify-center content-center items-center', className)}>
            {
                problemSetsData.map((element) => {
                    return (
                        <List {...element} key={element.name} />
                    )
                })
            }
        </div >
    )
}

export default ProblemList;