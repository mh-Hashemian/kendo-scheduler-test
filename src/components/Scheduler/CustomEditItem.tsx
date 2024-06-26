import {
  SchedulerEditItem,
  SchedulerEditItemProps,
} from "@progress/kendo-react-scheduler";
import { useState } from "react";

const CustomEditItem = (props: SchedulerEditItemProps) => {
  const [dragItem, setDragItem] = useState(null);

  const handleDragItemChange = (event: any) => {
    if (
      !event.value ||
      event.value.start.getDay() == event.value.end.getDay()
    ) {
      setDragItem(event.value);
    }
  };

  return (
    <SchedulerEditItem
      {...props}
      dragItem={dragItem}
      onDragItemChange={handleDragItemChange}
    />
  );
};

export default CustomEditItem;
