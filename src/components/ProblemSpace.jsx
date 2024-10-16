import ProblemList from "./ProblemList";

const ProblemSpace = () => {
    return (
        <div>
            <p className='font-medium text-5xl'>Tasks</p>
            <ProblemList className='mt-10'/>
        </div>
    )
}

export default ProblemSpace;