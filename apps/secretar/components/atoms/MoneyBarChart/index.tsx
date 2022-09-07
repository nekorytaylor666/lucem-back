import { AllowedGraphTypes } from "@graphqlTypes/globalTypes";
import { Session } from "@lucem/shared-gql";
import { format } from "date-fns";
import React from "react";
import { Line } from "react-chartjs-2";

const BarChart = ({ data }: { data: Session[] }) => {
    const values = data.map(({ price, startDate }) => ({
        x: format(new Date(startDate), "dd.MM.yyyy"),
        y: price,
    }));
    return (
        <div className="text-black">
            <Line
                data={{
                    labels: ["Прибыль/Дата"],
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
