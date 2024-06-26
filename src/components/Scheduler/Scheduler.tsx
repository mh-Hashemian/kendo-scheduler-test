import "./scheduler.css";
import { Fragment, useEffect } from "react";
import {
  Scheduler as KendoScheduler,
  DayView,
  //   WeekView,
  SchedulerDataChangeEvent,
  SchedulerGroup,
} from "@progress/kendo-react-scheduler";
import { guid } from "@progress/kendo-react-common";

import likelySubtags from "cldr-core/supplemental/likelySubtags.json";
import currencyData from "cldr-core/supplemental/currencyData.json";
import weekData from "cldr-core/supplemental/weekData.json";

import localCurrency from "cldr-numbers-full/main/fa/currencies.json";
import numbers from "cldr-numbers-full/main/fa/numbers.json";
import caGregorian from "cldr-dates-full/main/fa/ca-gregorian.json";
import dateFields from "cldr-dates-full/main/fa/dateFields.json";

import {
  IntlProvider,
  LocalizationProvider,
  load,
  loadMessages,
  // setCulture,
} from "@progress/kendo-react-intl";
import messages from "./fa.json";
import useReservations from "../../hooks/useReservations";
import useSpecialists from "../../hooks/useSpecialists";
import CustomItem from "./CustomItem";
import CustomSlot from "./CustomSlot";
import CustomEditItem from "./CustomEditItem";

load(
  likelySubtags,
  currencyData,
  weekData,
  localCurrency,
  numbers,
  caGregorian,
  dateFields
);

interface ISchedulerProps {
  reservations?: Reservation[];
  headers?: [];
}

function Scheduler(props: ISchedulerProps) {
  const [reservations, setReservations] = useReservations();
  loadMessages(messages, "fa");

  const [specialists] = useSpecialists();

  useEffect(() => {
    // this timeout will click on liscense error toast in order to close it
    setTimeout(() => {
      const button: HTMLButtonElement | null = document.querySelector(
        "button[title='Close']"
      );
      if (button) button.click();
    }, 10);

    const schedulerDiv: HTMLDivElement | null = document.querySelector(
      "#scheduler .k-scheduler-layout"
    );
    const schedulerDiv2: HTMLDivElement | null = document.querySelector(
      "#scheduler2 .k-scheduler-layout"
    );

    // this scroll handler will synchronize scroll value of two scheduler instances
    const handleScroll = () => {
      schedulerDiv2!.scrollTop = schedulerDiv!.scrollTop;
      // console.log(timeLabelElement.scrollTop, e.target.scrollTop);
    };

    schedulerDiv!.addEventListener("scroll", handleScroll);

    return () => {
      schedulerDiv!.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // make scheduler horizontally scrollable if specialists length is more than 2
  useEffect(() => {
    if (specialists[0].data.length > 2) {
      const elements = Array.from(
        document!.querySelectorAll(".k-scheduler-head,.k-scheduler-body")!
      ) as HTMLDivElement[];

      elements.forEach((element) => {
        element.style.minWidth = "600px";
      });
    }
  }, [specialists]);

  const group: SchedulerGroup = {
    resources: ["Specialists"],
    orientation: "horizontal",
  };

  const handleDataChange = ({
    created,
    updated,
    deleted,
  }: SchedulerDataChangeEvent) => {
    // API req here

    // get the reservation id from updated variable
    setReservations((old) =>
      old
        // Filter the deleted items
        .filter(
          (item) =>
            deleted.find((current) => current.id === item.id) === undefined
        )
        // Find and replace the updated items
        .map(
          (item) => updated.find((current) => current.id === item.id) || item
        )
        // Add the newly created items and assign an `id`.
        .concat(created.map((item) => Object.assign({}, item, { id: guid() })))
    );
  };

  return (
    <div className="bg-white w-full overflow-hidden relative flex rounded-lg">
      <LocalizationProvider language="fa">
        <IntlProvider locale="fa">
          <KendoScheduler
            id="scheduler2"
            defaultView="day"
            header={() => <Fragment />}
            footer={() => <Fragment />}
            rtl={true}
            slot={CustomSlot}
            editable={{
              add: false,
              remove: false,
              drag: false,
              resize: false,
              select: false,
              edit: false,
            }}
            className="border-none z-50 time-label w-[50px] min-h-full"
          >
            <DayView
              showWorkHours={false}
              // startTime="07:00"
              // slotDivisions={2}
              // slotDuration={60}
            />
            {/* <WeekView /> */}
          </KendoScheduler>
          <KendoScheduler
            id="scheduler"
            defaultView="day"
            header={() => <Fragment />}
            footer={() => <Fragment />}
            data={reservations as any}
            group={group}
            resources={specialists}
            onDataChange={handleDataChange}
            rtl={true}
            item={CustomItem}
            slot={CustomSlot}
            editItem={CustomEditItem}
            editable={{
              add: false,
              remove: true,
              drag: true,
              resize: true,
              select: false,
              edit: false,
            }}
            className="border-none min-h-full -ms-9 overflow-hidden scheduler"
            {...props}
          >
            <DayView
              showWorkHours={false}
              // startTime="7:00"
              // slotDivisions={2}
              // slotDuration={60}
            />
          </KendoScheduler>
        </IntlProvider>
      </LocalizationProvider>
    </div>
  );
}

export default Scheduler;
