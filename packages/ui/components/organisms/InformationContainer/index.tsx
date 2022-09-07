import React from "react";
import Image from "next/image";

const InformationContainer = () => {
  return (
    <div className="my-10 space-y-8">
      <div className="grid grid-cols-3">
        <div className="bg-gray-100 p-8 rounded-2xl space-y-12 col-start-1 col-end-2">
          <div className="space-y-4">
            <p className="text-4xl font-bold">3 года заботы о вашем здаровье</p>
            <p>
              Мы молодая клиника с современным подходом к лечению и
              первоклассными специалистами
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-4">
              <p className="text-4xl font-bold">100+</p>
              <p>Практикующих врачей</p>
            </div>
            <div className="space-y-4">
              <p className="text-4xl font-bold">3000+</p>
              <p>Клиентов ежемесячно</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col col-start-2 col-end-4">
          <div className="flex items-start h-3/6">
            <Image
              width={873}
              height={452}
              src="/icons/lucem-hall.svg"
              className="flex items-start"
            />
          </div>
        </div>
      </div>
      <div className="rounded-lg"></div>
      <div className="flex py-8 px-6 bg-gray-100 rounded-xl">
        <div className="flex flex-1 items-center">
          <p className="text-4xl font-bold">Lucem всегда рядом</p>
        </div>
        <div className="flex flex-1 justify-center">
          <div>
            <p>Аманат 2, г.Нурсултан,</p>
            <p>район Алматы, м-н Каратекель,</p>
            <p>Почтовый индекс: Z00D5F4</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationContainer;
