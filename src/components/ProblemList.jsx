import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMetadata } from "../supabaseFetcher";
import { LinearProgress } from "@mui/material";

const List = (props) => {
    const navigate = useNavigate();

    const handleClick = () => {
        const json = JSON.stringify(props)
        navigate(`/view/${encodeURIComponent(json)}`)
    }

    return (
        <div className='flex flex-col w-[800px] border shadow-md p-3 my-2 rounded-xl cursor-pointer hover:bg-zinc-100' onClick={handleClick}>
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

const ProblemList = (props) => {
    const [problemSetsData, setProblemSetsData] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchMetadata({"column": 'tags', "value": props.tags})
                setProblemSetsData(response)
            } catch (error) {
                console.error('Error fetching problem sets data:', error)
            }
        }
        fetchData();
    }, [props.tags])

    return (
        <div className="flex flex-col justify-center content-center items-center">
            { problemSetsData ? problemSetsData.map((element) => {
                return ( <List {...element} key={element.name} /> )
                })
                :
                <div>
                    <p>Loading task ...</p>
                    <LinearProgress width="800px"/>
                </div>
            }
        </div >
    )
}

export default ProblemList;