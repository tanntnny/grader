import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { useEffect, useState } from "react"
import { fetchUniques } from "../supabaseFetcher"

const ProblemSpaceRight = (props) => {
    const [uniqueTags, setUniqueTags] = useState(['All'])

    useEffect(() => {
        const newFetchUniques = async () => {
            setUniqueTags([...uniqueTags, ...await fetchUniques('tags')])
        }
        newFetchUniques()
    }, [])

    const handleChange = (e) => {
        props.setTags(e.target.value)
    }

    return (
        <div className="flex flex-col w-[350px] rounded-xl">
            <div>
                <FormControl fullWidth>
                    <InputLabel id="tag-selection">Tags</InputLabel>
                    <Select
                        id="tag-selection"
                        label="tags"
                        value={props.tags}
                        onChange={handleChange}
                    >
                        {uniqueTags.map(tag => {
                            return <MenuItem key={tag} value={tag}>{tag}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </div>
        </div>
    )
}

export default ProblemSpaceRight