import TaskDetail from "@/components/TaskDetail/TaskDetail"

interface Props {
    params: Promise<{id: string}>
}

const page = async (props: Props) => {

    const {id} =  await props.params
    

    return(
        <>
            <TaskDetail id={id} />
        </>
    )
}

export default page