import FailedAlert from "@/components/mainComponents/Alert/FailedAlert/FailedAlert";
import SuccessAlert from "@/components/mainComponents/Alert/SuccessAlert/SuccessAlert";
import TaskList from "@/components/mainComponents/TaskList/TaskList";

export default function Home() {
  return (
    <TaskList tagId={null} name={'همه کارها'} saved={false} />
  );
}
