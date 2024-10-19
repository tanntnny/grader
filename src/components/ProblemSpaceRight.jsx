import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { useEffect, useState } from "react"
import { fetchUniques } from "../supabaseFetcher"

const ProblemSpaceRight = ({ searching, setSearching }) => {
    const [uniqueTags, setUniqueTags] = useState(['All'])
    const [uniqueAuthors, setUniqueAuthors] = useState(['All'])

    useEffect(() => {
        const newFetchUniques = async () => {
            setUniqueTags([...uniqueTags, ...await fetchUniques('tags')])
            setUniqueAuthors([...uniqueAuthors, ...await fetchUniques('author')])
        }
        newFetchUniques()
    }, [])

    const handleChange = (field) => (e) => {
        setSearching({ ...searching, [field]: e.target.value})
    }

    return (
        <div className="flex flex-col w-[350px] rounded-xl p-2">
            <div>
                <FormControl fullWidth>
                    <InputLabel id="tag-selection">Tags</InputLabel>
                    <Select
                        id="tag-selection"
                        label="tags"
                        value={searching.tags}
                        onChange={handleChange('tags')}
                    >
                        {uniqueTags.map(tag => {
                            return <MenuItem key={tag} value={tag}>{tag}</MenuItem>
                        })}
                    </Select>
                </FormControl>
                <div className="h-[35px]"/>
                <FormControl fullWidth>
                    <InputLabel id="author-selection">Author</InputLabel>
                    <Select
                        id="author-selection"
                        label="author"
                        value={searching.author}
                        onChange={handleChange('author')}
                    >
                        {uniqueAuthors.map(author => {
                            return <MenuItem key={author} value={author}>{author}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </div>
        </div>
    )
}

export default ProblemSpaceRight