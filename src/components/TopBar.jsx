import Divider from '@mui/material/Divider';
import { useNavigate } from "react-router-dom";


const TopBar = () => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/')
    }

    return (
        <div className='p-5'>
            <p className='font-bold text-xl text-zinc-500 text-left my-4 cursor-pointer hover:text-zinc-400' onClick={handleClick}>Tanny Grader!</p>
            <Divider aria-hidden="true" />
        </div>)
}

export default TopBar;