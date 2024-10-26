import { useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";
import { useEffect } from "react";

const TagList = ({ message }) => {
    return (
        <div className="rounded-xl bg-zinc-200 px-2">
            <p className="text-base">{message}</p>
        </div>
    )
}

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
            <div className='flex justify-between mt-3'>
                <p className='font-light text-[14px]'>Author: {props.author}</p>
                <div className="flex w-[500px] justify-end">
                    {props.tags.map(element => {
                        return <TagList key={element} message={element}/>
                    })}
                </div>
            </div>
        </div>
    )
}

const ProblemList = ({ searching, setSearching, problemSets }) => {
    const navigate = useNavigate()

    useEffect(() => {
        const user = localStorage.getItem('user')
        if (user == null) {
            navigate('/')
        }
    }, [navigate])

    return (
        <div className="flex flex-col items-center">
            { problemSets ? problemSets.map((element) => {
                return ( <List {...element} key={element.name} /> )
                })
                :
                <div>
                    <Skeleton variant="rounded" width={800} height={70} className="my-2" animationi="wave"/>
                    <Skeleton variant="rounded" width={800} height={70} className="my-2" animationi="wave"/>
                    <Skeleton variant="rounded" width={800} height={70} className="my-2" animationi="wave"/>
                </div>
            }
        </div >
    )
}

export default ProblemList;