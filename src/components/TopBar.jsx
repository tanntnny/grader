import Divider from '@mui/material/Divider';
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from './GoogleLogin';


const TopBar = () => {
    const navigate = useNavigate()

    const handleClick = (page) => () => {
        navigate(page)
    }

    return (
        <div className='flex flex-col w-[1440px] p-5'>
            <div className='flex items-center justify-between mb-4'>
                <div className="w-[400px] flex justify-start">
                    <p className='font-bold text-xl text-zinc-500 my-4 cursor-pointer hover:text-zinc-400' onClick={handleClick('/')}>BugBuster</p>
                </div>
                <div className="w-[400px] flex justify-center">
                    <p className='font-bold text-xl text-zinc-500 my-4 cursor-pointer hover:text-zinc-400' onClick={handleClick('/tasks')}>Tasks</p>
                    <p className='ml-10 font-bold text-xl text-zinc-500 my-4 cursor-pointer hover:text-zinc-400' onClick={handleClick('/submissions')}>Submissions</p>
                </div>
                <div className="w-[400px] flex justify-end">
                    <GoogleLogin />
                </div>
            </div>
            <Divider aria-hidden="true" />
        </div>)
}

export default TopBar;