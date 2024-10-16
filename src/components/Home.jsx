import { useNavigate } from "react-router-dom"

const Home = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/tasks')
    }
    return (
        <div className="flex flex-col items-center">
            <p className="font-bold text-3xl mt-10 font-mono">Welcome to "Tanny grader".</p>
            <p className="mt-3 text-lg">'This is built to extend your knowledge in computer programming<br />withvarious additional problems outside the class!'</p>
            <div className="flex font-bold justify-center w-[150px] mt-5 rounded-lg p-3 bg-green-500 text-white cursor-pointer hover:bg-green-600" onClick={handleClick}>
                Explore tasks!
            </div>
        </div>
    )
}

export default Home;