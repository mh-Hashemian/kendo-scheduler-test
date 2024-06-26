import { useState } from "react";
import { SchedulerResource } from "@progress/kendo-react-scheduler";

const initialResources: SchedulerResource[] = [
  {
    name: "Specialists",
    data: [
      {
        text: "سپیده آبکار",
        value: 1,
      },
      {
        text: "مریم جلالی",
        value: 2,
      },
      {
        text: "فهیمه معینی",
        value: 3,
      },
      {
        text: "جناب گلشنی",
        value: 4,
      },
    ],
    field: "specialistId",
    valueField: "value",
    textField: "text",
    colorField: "color",
  },
];

function useSpecialists() {
  const [specialists, setSpecialists] =
    useState<SchedulerResource[]>(initialResources);

  return [specialists, setSpecialists] as const;
}

export default useSpecialists;
