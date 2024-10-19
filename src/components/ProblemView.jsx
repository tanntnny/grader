import { useParams } from "react-router-dom"
import { useEffect, useState } from 'react'
import { fetchPDF } from "../supabaseFetcher"
import SideBar from "./SideBar"

const ProblemView = () => {
    const { props } = useParams()
    const [pdfUrl, setPdfUrl] = useState('')

    const { name, author, file_name, difficulty } = JSON.parse(props || '{}')
    
    useEffect(() => {
        const thisFetch = async () => {
            const url = await fetchPDF(file_name)
            if (url) {
                setPdfUrl(url)
            } else {
                console.error('Failed to fetch PDF URL')
            }
        };
        thisFetch()
        return () => {
            if (pdfUrl) {
                // URL.revokeObjectURL(pdfUrl)
            }
        }
    }, [file_name])
    
    return (
        <div className="flex flex-col w-full">
            <div className="flex mt-3">
                <div className="mr-5 w-full">
                    { pdfUrl ?
                        <embed
                            src={pdfUrl}
                            type="application/pdf"
                            width="100%"
                            height="1000px"
                        />
                        : <p>pdf loading ...</p>
                    }
                </div>
                <SideBar name={name} author={author} difficulty={difficulty} />
            </div>
        </div>
    )
}

export default ProblemView