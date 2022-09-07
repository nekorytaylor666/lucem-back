import React from "react";
import styled from "styled-components";
import getAdminLayout from "components/layouts/adminLayout";

const FinancePage = () => {
  return (
    <div>
      <div className="flex justify-between">
        <p className="text-3xl font-bold">Финансы</p>
        <p className=" text-gray-400 self-center">
          Обновлено 10 сентября, 11:27
        </p>
      </div>
      <hr className="my-3" />
      <div className="py-5">
        <div className="flex">
          <div className="flex-1 bg-gradient-to-b from-main-green to-green-400 rounded p-10 text-white space-y-10">
            <div>
              <p>За сегодня вы получите:</p>
              <p className="text-4xl font-bold">
                45 000<span>₸</span>
              </p>
            </div>
            <p>Платеж в конце сегодняшнего дня в 18:00</p>
          </div>
          <div className="flex-1"></div>
        </div>
      </div>
      <div>
        <p className="text-lg">История плажетей</p>
      </div>
      <div className="flex justify-between">
        <div className="flex space-x-2 bg-gray-100 p-1 rounded">
          <div className="flex items-center rounded py-1 px-2 bg-gray-100 hover:bg-pink-purple hover:text-white cursor-pointer">
            <p>За сегодня</p>
          </div>
          <div className="flex items-center rounded py-1 px-2 bg-gray-100 hover:bg-pink-purple hover:text-white cursor-pointer">
            <p>За неделю</p>
          </div>
          <div className="flex items-center rounded py-1 px-2 bg-gray-100 hover:bg-pink-purple hover:text-white cursor-pointer">
            <p>За месяц</p>
          </div>
          <div className="flex items-center rounded py-1 px-2 bg-gray-100 hover:bg-pink-purple hover:text-white cursor-pointer">
            <p>За год</p>
          </div>
        </div>
        <div className="flex items-center p-2 bg-gray-100 rounded space-x-2">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </button>
          <p>4 авг.</p>
        </div>
      </div>
      <div className="p-5 bg-gray-100 rounded-t mt-5">
        <div className="flex justify-between">
          <p>Платежи полученные за выбранный период времени</p>
          <p className="text-main-green">+45 000 тг.</p>
        </div>
        <div className="pt-5">
          <div className=" h-60 overflow-auto space-y-2">
            <PaymentCard />
            <PaymentCard />
            <PaymentCard />
            <PaymentCard />
            <PaymentCard />
            <PaymentCard />
            <PaymentCard />
            <PaymentCard />
            <PaymentCard />
            <PaymentCard />
          </div>
        </div>
      </div>
    </div>
  );
};

const PaymentCard = () => {
  return (
    <div className="grid grid-cols-12 p-5 bg-white rounded">
      <div className="col-start-1 col-end-2">
        <p>04.08.21</p>
        <p className="text-gray-400">12:30</p>
      </div>
      <div className="flex col-start-2 col-end-6 space-x-2">
        <img
          src="http://www.caribbeangamezone.com/wp-content/uploads/2018/03/avatar-placeholder.png"
          alt=""
          className="h-12 w-12"
        />
        <div>
          <p>Иванов Иван</p>
          <p className="text-gray-400">Первичный прием - 50%</p>
        </div>
      </div>
      <div className="flex col-start-7 col-end-11 items-center justify-center">
        <p className="text-main-green">Подтверждено</p>
      </div>
      <div className="flex col-start-11 col-end-13 items-center justify-end">
        <p>+3000 тг.</p>
      </div>
    </div>
  );
};

export default FinancePage;
