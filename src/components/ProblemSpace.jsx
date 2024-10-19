import { useState } from "react";
import ProblemList from "./ProblemList";
import ProblemSpaceRight from "./ProblemSpaceRight";

const ProblemSpace = () => {
    const [tags, setTags] = useState('All')

    return (
        <div className="flex flex-col w-[1200px]">
            <p className='font-medium text-5xl'>Tasks</p>
            <div className="flex justify-between mt-10">
                <ProblemList setTags={setTags} tags={tags} />
                <ProblemSpaceRight setTags={setTags} tags={tags} />
            </div>
        </div>
    )
}

export default ProblemSpace;