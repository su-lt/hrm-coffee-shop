const page = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts")
    const data = await res.json()
    console.log(data)

    return (
        <div>
            hello world
            <div>{data[0].body}</div>
        </div>
    )
}

export default page
