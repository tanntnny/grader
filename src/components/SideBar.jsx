import { Divider } from "@mui/material";
import Submission from "./Submission";

const SideBar = ({
    name,
    author,
    difficulty
}) => {
    
    return (
        <div className="flex flex-col h-full">
            <div className="border flex flex-col p-3 px-5 items-start rounded-lg">
                <p className="font-bold text-[32px]">{name}</p>
                <p className="text-[16px]">Author: {author}</p>
                <p className="text-[16px]">Difficulty: {difficulty}</p>
            </div>
            <div className="flex flex-col border w-[300px] p-3 mt-3 rounded-lg">
                <div className="flex flex-col justify-center">
                    <p className="font-bold text-[24px] mb-3">Submission</p>
                    <Divider />
                    <Submission name={name}/>
                </div>
            </div>
        </div>
    )
}

export default SideBar