import { GetGeneralStats_getGeneralStats_data } from "@graphqlTypes/getGeneralStats";
import { AllowedGraphTypes } from "@graphqlTypes/globalTypes";
import { format } from "date-fns";
import React from "react";
import { Line } from "react-chartjs-2";

const BarChart = ({
  data,
}: {
  data: GetGeneralStats_getGeneralStats_data[]
}) => {
  const dates = data?.map(({ day, month, year }) =>
    format(
      new Date(year ?? new Date().getFullYear(), month, day ?? 1),
      "dd.MM.yyyy",
    ),
  );
  const values = data
    ?.filter((item) => item.type === AllowedGraphTypes.Money)
    .map(({ sum }) => sum);
  return (
    <div className="text-black">
      <Line
        data={{
          labels: dates,
          datasets: [
            {
              label: "Прибыль",
              data: values,

              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
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
