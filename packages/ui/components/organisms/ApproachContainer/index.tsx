import React from "react";
import styled from "styled-components";
import Image from "next/image";

const ApproachContainer = () => {
  return (
    <MainBlock className="text-white">
      <div className="flex py-10 px-8 h-5/6 rounded-2xl bg-gradient-to-r from-pink-purple to-light-purple">
        <div className="flex-1">
          <p className="text-5xl font-extrabold">Меняем подход к медицине</p>
        </div>
        <div className="flex flex-1">
          <div className="flex-1 space-y-4">
            <p className="text-2xl font-semibold">
              Электронная медицинская карта
            </p>
            <p>
              Ваша полная история болезни, формируемая из всех визитов в Lucem.
              С возможностью экспорта в любом удобном виде.
            </p>
          </div>
          <div className="flex-1 space-y-4">
            <p className="text-2xl font-semibold">Дневник здоровья</p>
            <p>
              Персональные рекомендации о поддержании здоровья, напоминания о
              вашем курсе лечения интегрированное в календарь на ваших
              устройствах
            </p>
          </div>
        </div>
      </div>
      <LaptopBlock>
        <Image width={1204} height={687} src="/icons/laptop.svg" />
      </LaptopBlock>
    </MainBlock>
  );
};

const MainBlock = styled.div`
  height: 950px;
  position: relative;
`;

const LaptopBlock = styled.div`
  position: absolute;
  bottom: 0;
`;

export default ApproachContainer;
