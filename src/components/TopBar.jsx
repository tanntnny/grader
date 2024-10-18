import Divider from '@mui/material/Divider';
import { useNavigate } from "react-router-dom";


const TopBar = () => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/')
    }

    return (
        <div className='flex flex-col w-full p-5'>
            <p className='font-bold text-xl text-left text-zinc-500 my-4 cursor-pointer hover:text-zinc-400' onClick={handleClick}>BugBuster</p>
            <Divider aria-hidden="true" />
        </div>)
}

export default TopBar;