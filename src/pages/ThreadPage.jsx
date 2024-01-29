import {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ThreadPage = ({...props}) => {
    const params = useParams();
    const route = useNavigate();
    const [thread, setThread] = useState();

    useEffect(() => {
        setThread(undefined);
    }, [])

    return (
        <div>
            thread page
            <div>{thread.threadId}</div>
            {thread.title}
            
        </div>
    )
}

export default ThreadPage;