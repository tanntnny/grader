import Divider from '@mui/material/Divider';
import { useNavigate } from "react-router-dom";
import GoogleLogin from './GoogleLogin';


const TopBar = () => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/')
    }

    return (
        <div className='flex flex-col w-[1440px] p-5'>
            <div className='flex items-center justify-between mb-4'>
                <p className='font-bold text-xl text-left text-zinc-500 my-4 cursor-pointer hover:text-zinc-400' onClick={handleClick}>BugBuster</p>
                <GoogleLogin />
            </div>
            <Divider aria-hidden="true" />
        </div>)
}

export default TopBar;