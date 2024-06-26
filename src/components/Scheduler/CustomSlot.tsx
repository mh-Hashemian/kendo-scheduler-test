import {
  SchedulerSlot,
  SchedulerSlotProps,
} from "@progress/kendo-react-scheduler";

const CustomSlot = (props: SchedulerSlotProps) => (
  <SchedulerSlot
    {...props}
    className="!border-dashed !border-r-0 !border-l-0 !border-b-[2px] mx-1"
  />
);

export default CustomSlot;
