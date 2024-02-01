export function getThreads() {
    const threads = [
        {
            id: 1,
            title: '1st thread',
        },
        {
            id: 2,
            title: '2nd thread'
        }
    ];

    return threads;
}

export function getOneThread(id) {
    const threads = getThreads();
    return threads.find(thread => thread.id === id)
}