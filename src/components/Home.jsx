import { useNavigate } from "react-router-dom"
import React, { useState } from 'react';
import { FacebookOutlined, Instagram } from "@mui/icons-material"
import { Alert, Snackbar } from '@mui/material';

const annoucements = [
    'You can now change the display name',
    'Update tags in each task',
    'Edit problem "Multiverse Hopper"'
]

const AnnouncementList = ({ message }) => {
    return (
        <div className="flex w-[400px] justify-center bg-stone-200 rounded-md p-2 my-2">
            <p className="text-md">{message}</p>
        </div>
    )
}

const UpdateAnnoucements = () => {
    return (
        <div className="flex flex-col">
            <p className="font-mono font-bold text-lg mb-3">Update list:</p>
            {annoucements.map(element => <AnnouncementList key={element} message={element}/>)}
        </div>
    )
}

const LowerSection = () => {
    const handleClick1 = () => {
        window.open('https://www.instagram.com/tanntnny', '_blank', 'noopener,noreferrer');
    }
    const handleClick2 = () => {
        window.open('https://web.facebook.com/profile.php?id=100027066084280', '_blank', 'noopener,noreferrer');
    }
    return (
        <div className="flex justify-between w-[800px] mt-48">
            <UpdateAnnoucements />
            <div className='flex flex-col'>
                <p className="text-lg font-bold font-mono">contact: tanntnny</p>
                <div className='mt-5 border w-[200px] flex rounded-lg p-2 text-rose-500 font-bold text-lg border-rose-500 justify-center hover:bg-rose-100 cursor-pointer'
                    onClick={handleClick1}
                >
                    <Instagram />
                    <p className="ml-3">instagram</p>
                </div>
                <div className='mt-5 border w-[200px] flex rounded-lg p-2 text-blue-600 font-bold text-lg border-blue-600 justify-center hover:bg-blue-100 cursor-pointer'
                    onClick={handleClick2}
                >
                    <FacebookOutlined />
                    <p className="ml-3">facebook</p>
                </div>
            </div>
        </div>
    )
}

const Home = () => {
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarConfig, setSnackbarConfig] = useState({})

    const navigate = useNavigate()

    const handleClick = () => {
        const user = localStorage.getItem('user')
        if (user) {
            navigate('/tasks')
        } else {
            setSnackbarConfig({
                message: 'You have to login before doing the tasks!',
                severity: 'warning'
            })
            setSnackbarOpen(true)
        }
    }
    
    const handleCloseSnackbar = () => {
        setSnackbarOpen(false)
    }
    return (
        <div className="flex flex-col items-center">
            <p className="font-bold text-3xl mt-10 font-mono">Welcome to "BugBuster grader".</p>
            <p className="mt-3 text-lg">'This is built to extend your knowledge in computer programming<br />withvarious additional problems outside the class!'</p>
            <div className="flex font-bold justify-center w-[150px] mt-5 rounded-lg p-3 bg-green-200 text-green-800 cursor-pointer hover:bg-green-300" onClick={handleClick}>
                Explore tasks!
            </div>
            <LowerSection />
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbarConfig.severity}
                    className="justify-center items-center"
                >
                    <p className="text-sm font-bold">{snackbarConfig.message}</p>
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Home;