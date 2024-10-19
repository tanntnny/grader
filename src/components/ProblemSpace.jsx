import { useState, useEffect } from "react";
import { fetchMetadata } from "../supabaseFetcher";
import ProblemList from "./ProblemList";
import ProblemSpaceRight from "./ProblemSpaceRight";

const ProblemSpace = () => {
    const [problemSetsData, setProblemSetsData] = useState()
    const [searching, setSearching] = useState({
        tags: 'All',
        author: 'All',
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchMetadata(searching)
                setProblemSetsData(response)
            } catch (error) {
                console.error('Error fetching problem sets data:', error)
            }
        }
        fetchData();
    }, [searching])

    return (
        <div className="flex flex-col w-[1200px]">
            <p className='font-medium text-5xl'>Tasks</p>
            <div className="flex justify-between mt-10">
                <ProblemList searching={searching} setSearching={setSearching} problemSets={problemSetsData} />
                <ProblemSpaceRight searching={searching} setSearching={setSearching} problemSets={problemSetsData} />
            </div>
        </div>
    )
}

export default ProblemSpace;