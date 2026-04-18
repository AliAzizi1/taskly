import TaskList from "@/components/mainComponents/TaskList/TaskList";

interface ProductProps {
    params: Promise<{ id: string }>;
}


const page = async (props: ProductProps) => {

    const { id } = await props.params;

    return(
        <>
            <TaskList tagId={id} name='' saved={false}/>
        </>
    )
}

export default page