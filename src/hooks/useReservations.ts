import { rrulestr } from "rrule";
import moment from "jalali-moment";
import { useEffect, useState } from "react";

// const RRuleString =
//   "DTSTART:20240401T093000Z\nRRULE:FREQ=WEEKLY;INTERVAL=1;UNTIL=20240501T230000Z;BYDAY=MO,WE";

// type Reservation = {
//   id: number;
//   title: string;
//   start: Date;
//   end: Date;
//   services: string[];
//   specialistId: number; // Optional resource ID if you're using resource grouping
//   isAllDay: boolean;
// };

const apiData = [
  {
    id: 1,
    name: "الهام کرمی مقدم",
    RRuleString:
      "DTSTART:20240508T073000Z\nRRULE:FREQ=WEEKLY;INTERVAL=1;UNTIL=20241010T230000Z;COUNT=1;BYDAY=MO,WE",
    specialistId: 1,
    services: ["لاک ژل"],
  },
  {
    id: 2,
    name: "مهتاب احمدی",
    RRuleString:
      "DTSTART:20240508T093000Z\nRRULE:FREQ=WEEKLY;INTERVAL=1;UNTIL=20241010T230000Z;COUNT=1;BYDAY=MO,TU,TH",
    specialistId: 2,
    services: ["ریموو ناخن", "کاشت پودری", "فرنچ"],
  },
  {
    id: 3,
    name: "سپیده معینی",
    RRuleString:
      "DTSTART:20240508T100000\nRRULE:FREQ=WEEKLY;UNTIL=20241010T150000;COUNT=1;WKST=MO",
    specialistId: 3,
    services: ["کاشت پودری", "فرنچ"],
  },
  {
    id: 4,
    name: "عباس معینی",
    RRuleString:
      "DTSTART:20240508T100000\nRRULE:FREQ=WEEKLY;UNTIL=20241010T150000;COUNT=1;WKST=MO",
    specialistId: 4,
    services: ["کاشت پودری", "فرنچ"],
  },
];

const getInitialReservations = () => {
  const reservations: Reservation[] = [];
  apiData.forEach((reservation) => {
    const { id, name, services, specialistId } = reservation;
    const reservationsRule = rrulestr(reservation.RRuleString);
    const reservationDates = reservationsRule.all();
    reservationDates.forEach((date) => {
      reservations.push({
        id,
        title: name,
        start: date,
        end: moment(date).add(1.5, "hour").toDate(),
        services,
        specialistId, // Optional resource ID if you're using resource grouping
        isAllDay: false,
      });
    });
  });

  return reservations;
};

function useReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    setReservations(getInitialReservations());
  }, []);

  return [reservations, setReservations] as const;
}

export default useReservations;
