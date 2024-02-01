import {useState} from 'react';
import {useParams} from 'react-router-dom';
import {getOneThread} from '../API/threads'

const ThreadPage = ({...props}) => {
    const params = useParams();
    const [thread, setBoard] = useState(getOneThread(Number(params.threadId)));
    
    return (
        <div>
            board page
            <div>url id: {params.threadId}</div>
            title: {thread.title}
        </div>
    )
}

export default ThreadPage;