import {
  CalWeekdayGraph,
  CreateTreatmentPlanItemGraph,
} from "@lucem/shared-gql";
import { useFormikContext } from "formik";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { CreateAppointmentBlankFormSchema } from "./shared/initialValues";

export const AddCalendarService = ({ index, field }) => {
  const calendarService = {
    description: "",
    intervalNumber: 1,
    intervalWord: "Недель",
    repeatDays: [],
    finishNever: false,
    startDate: null,
    endDate: null,
    finishAfterRepeats: 1,
  };
  const [calendarServices, setCalendarServices] = useState([calendarService]);

  const [intervalNumber, setIntervalNumber] = useState(1);
  const [weekDays, setWeekDays] = useState([
    { value: CalWeekdayGraph.Mo, name: "Пн", active: false },
    { value: CalWeekdayGraph.Tu, name: "Вт", active: false },
    { value: CalWeekdayGraph.We, name: "Ср", active: false },
    { value: CalWeekdayGraph.Th, name: "Чт", active: false },
    { value: CalWeekdayGraph.Fr, name: "Пт", active: false },
    { value: CalWeekdayGraph.Sa, name: "Сб", active: false },
    { value: CalWeekdayGraph.Su, name: "Вс", active: false },
  ]);
  const [finishNever, setFinishNever] = useState(false);
  const [startDate, setStartDate] = useState("01-01-2022");
  const [endDate, setEndDate] = useState("01-01-2023");

  const onWeekDayPress = (weekDay: CalWeekdayGraph) => {
    const idx = weekDays.findIndex((item) => item.value === weekDay);
    const alteredDays = weekDays.map((item, index) => {
      if (index === idx) item.active = !item.active;

      return item;
    });
    const activeDays = alteredDays.filter((el) => el.active);
    setWeekDays(alteredDays);
    setFieldValue(
      fieldPath + ".repeatingOptions.byDay",
      activeDays.map((el) => el.value)
    );
  };
  const fieldPath = field + `[${index}]`;
  const { values, handleChange, setFieldValue } =
    useFormikContext<CreateAppointmentBlankFormSchema>();

  const curFieldValues = _.get(
    values,
    fieldPath
  ) as CreateTreatmentPlanItemGraph;
  console.log(curFieldValues);
  const isByDay = curFieldValues.repeatingOptions.freq === "DAILY";
  useEffect(() => {
    const selectedDays = curFieldValues.repeatingOptions.byDay;
    setWeekDays((curWeekdaysValue) =>
      curWeekdaysValue?.map((el) => {
        const isDaySelected = selectedDays?.includes(el.value);
        if (isDaySelected) {
          el.active = true;
        }
        return el;
      })
    );
  }, [curFieldValues]);
  return (
    <div style={{ marginTop: 20 }}>
      {calendarServices.map((calendarService) => (
        <>
          <p
            style={{
              color: "rgb(141, 141, 141)",
            }}
          >
            {index + 1} назначение
          </p>

          <div style={{ marginTop: 10, paddingLeft: 120 }}>
            <textarea
              name={fieldPath + ".text"}
              style={{
                width: "100%",
                padding: 10,
                borderRadius: 6,
                border: "0.5px solid rgba(141, 141, 141, 0.5)",
              }}
              rows={3}
              placeholder={
                "Напишите название медикамента и опишите способ его применения"
              }
              value={curFieldValues.text}
              onChange={handleChange}
            />

            <p
              className="font-bold h-auto"
              style={{
                marginTop: 20,
                marginBottom: 10,
              }}
            >
              Повтор назначения
            </p>

            <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
              <span style={{ fontSize: 16 }}>Повторять с интервалом</span>
              {!isByDay && (
                <input
                  type="number"
                  name={fieldPath + ".repeatingOptions.interval"}
                  style={{
                    padding: "8px",
                    width: 50,
                    textAlign: "center",
                    borderRadius: 6,
                    border: "0.5px solid rgba(141, 141, 141, 0.5)",
                  }}
                  value={curFieldValues?.repeatingOptions?.interval ?? 0}
                  onChange={handleChange}
                />
              )}

              <select
                name={fieldPath + ".repeatingOptions.freq"}
                style={{
                  padding: 8,
                  borderRadius: 6,
                  border: "0.5px solid rgba(141, 141, 141, 0.5)",
                }}
                value={curFieldValues.repeatingOptions.freq}
                onChange={handleChange}
              >
                <option value={"WEEKLY"}>Недель</option>
                <option value={"DAILY"}>Дней</option>
                <option value={"MONTHLY"}>Месяцев</option>
              </select>
            </div>

            {isByDay && (
              <>
                <p style={{ fontSize: 16 }}>Дни повторения</p>
                <div style={{ display: "flex", gap: 5, marginTop: 10 }}>
                  {weekDays.map((day, index) => {
                    return (
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "50%",
                          border: "0.5px solid rgba(141, 141, 141, 0.5)",
                          color: day.active ? "#fff" : "rgb(141, 141, 141)",
                          backgroundColor: day.active
                            ? "rgb(142, 24, 255)"
                            : "transparent",
                          cursor: "pointer",
                        }}
                        onClick={() => onWeekDayPress(day.value)}
                      >
                        {day.name}
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            <p style={{ fontSize: 16, marginTop: 10 }}>Окончание</p>

            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <input
                name={"finish"}
                type="radio"
                value={"never"}
                onClick={() => setFinishNever(!finishNever)}
              />
              <span style={{ fontSize: 16 }}>Никогда</span>
            </div>

            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <span style={{ fontSize: 16 }}>Дата</span>
              <input
                type="date"
                name={fieldPath + ".repeatingOptions.until"}
                value={curFieldValues.repeatingOptions.until}
                onChange={handleChange}
              />
              <input type="date" onChange={(e) => setEndDate(e.target.value)} />
            </div>

            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <span style={{ fontSize: 16 }}>После</span>
              <input
                type="number"
                style={{
                  padding: "8px",
                  width: 50,
                  textAlign: "center",
                  borderRadius: 6,
                  border: "0.5px solid rgba(141, 141, 141, 0.5)",
                }}
                name={fieldPath + ".repeatingOptions.count"}
                value={curFieldValues.repeatingOptions.count ?? 0}
                onChange={handleChange}
              />
              <span style={{ fontSize: 16 }}>повторов</span>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};
