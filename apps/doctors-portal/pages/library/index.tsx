import React, { useState } from "react";
import getAdminLayout from "components/layouts/adminLayout";
import LibraryModal from "components/atoms/LibraryModal";

const LibraryPage = () => {
    const [showModal, setShowModal] = useState(false);
    return (
        <div>
            <LibraryModal
                show={showModal}
                setShow={setShowModal}
            ></LibraryModal>
            <div className="flex justify-between">
                <p className="text-3xl font-bold">Библиотека</p>
                <button
                    onClick={() => setShowModal(!showModal)}
                    className="py-2 px-4 bg-pink-purple rounded text-white"
                >
                    Добавить раздел
                </button>
            </div>
            <hr className="my-3" />
            <div className="flex items-center space-x-2 pt-10">
                <p className="font-bold text-lg">Терапия</p>
                <div className="h-px w-11/12 bg-gray-200"></div>
                <button className="text-pink-purple">Добавить...</button>
            </div>
            <div className="py-2 grid grid-cols-4 gap-4">
                <DownloadCard />
                <DownloadCard />
                <DownloadCard />
                <DownloadCard />
                <DownloadCard />
                <DownloadCard />
                <DownloadCard />
            </div>
            <div className="flex items-center space-x-2 pt-10">
                <p className="font-bold text-lg">Гинекология</p>
                <div className="h-px w-11/12 bg-gray-200"></div>
                <button className="text-pink-purple">Добавить...</button>
            </div>
            <div className="py-2 grid grid-cols-4 gap-4">
                <DownloadCard />
                <DownloadCard />
                <DownloadCard />
                <DownloadCard />
                <DownloadCard />
                <DownloadCard />
                <DownloadCard />
            </div>
            <div className="flex items-center space-x-2 pt-10">
                <p className="font-bold text-lg">Хирургия</p>
                <div className="h-px w-11/12 bg-gray-200"></div>
                <button className="text-pink-purple">Добавить...</button>
            </div>
            <div className="py-2 grid grid-cols-4 gap-4">
                <DownloadCard />
                <DownloadCard />
                <DownloadCard />
                <DownloadCard />
                <DownloadCard />
                <DownloadCard />
                <DownloadCard />
            </div>
        </div>
    );
};

const DownloadCard = () => {
    return (
        <div className="p-5 bg-gray-100 text-pink-purple rounded">
            <p>Кузнецов - основы терапивтического анализа(PDF, 132КБ)</p>
        </div>
    );
};

export default LibraryPage;
