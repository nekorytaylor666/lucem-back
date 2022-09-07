import React from "react";
import { Line } from "react-chartjs-2";

const BarChart = () => {
    return (
        <div className="text-black">
            <Line
                data={{
                    labels: [
                        "25 августа",
                        "1 сентября",
                        "7 сентября",
                        "14 сентября",
                        "21 сентября",
                    ],
                    datasets: [
                        {
                            label: "Кол-во услуг",
                            data: [1792, 1249, 1543, 1195, 1754],
                            backgroundColor: "rgba(30, 71, 131, 0.2)",
                            borderColor: "#3293d4",
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
