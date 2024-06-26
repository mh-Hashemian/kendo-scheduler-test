import { guid } from "@progress/kendo-react-common";
import {
  SchedulerItem,
  SchedulerItemProps,
} from "@progress/kendo-react-scheduler";

const CustomItem = (props: SchedulerItemProps) => {
  return (
    <SchedulerItem
      {...props}
      style={{ ...props.style, width: "calc(100% - 10px)" }}
      className="scheduler-item"
    >
      <div className="font-bold">{props.children}</div>
      <div className="border-r-2 !border-r-primary-red text-slate-600 px-2 mr-2 !w-full pointer-events-none">
        {props.dataItem.services.map((s: string[]) => (
          <p key={guid()} className="font-normal">
            {s}
          </p>
        ))}
      </div>
    </SchedulerItem>
  );
};

export default CustomItem;
