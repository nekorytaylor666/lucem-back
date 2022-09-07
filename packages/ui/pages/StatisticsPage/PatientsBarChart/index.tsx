import { AllowedGraphTypes } from "@lucem/shared-gql";
import { format } from "date-fns";
import React from "react";
import { Line } from "react-chartjs-2";

const BarChart = ({ data }: { data: any[] }) => {
  const dates = data?.map(({ day, month, year }) =>
    format(
      new Date(year ?? new Date().getFullYear(), month, day ?? 1),
      "dd.MM.yyyy"
    )
  );
  const values = data
    ?.filter((item) => item.type === AllowedGraphTypes.people)
    .map(({ sum }) => sum);
  return (
    <div className="text-black">
      <Line
        data={{
          labels: dates,

          datasets: [
            {
              label: "Кол-во пациентов",
              data: values,

              backgroundColor: "rgba(52, 170, 77, 0.2)",
              borderColor: "#58d432",
              borderWidth: 1,
              fill: true,
              tension: 0.3,
            },
          ],
        }}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};

export default BarChart;
