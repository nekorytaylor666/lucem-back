import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Desease } from "custom_typings/desease";
import { Doctor } from "custom_typings/doctor";
import { Service } from "custom_typings/service";
import Link from "next/link";
import { Specialization } from "custom_typings/specialization";

const SEARCH_QUERY = gql`
    query Search($q: String!) {
        search(searchQuery: $q) {
            doctors {
                _id
                fullName
                description
            }
            deseases {
                name
                _id
            }
            specializations {
                _id
                name
                description
            }
        }
    }
`;

const Search = () => {
    const [searchParans, setSearchParams] = React.useState("");
    const [searchResults, setSearchResults] =
        React.useState<SearchResultsProps>();
    const [open, setOpen] = React.useState(false);
    const { loading, error, data } = useQuery(SEARCH_QUERY, {
        variables: { q: searchParans },
        onCompleted: (data) => {
            setSearchResults(data.search);
        },
    });
    const searchRef = React.useRef<HTMLDivElement>(null);
    // const isOpen = useComponentVisible(searchRef, open);
    useOutsideClick(searchRef, () => setOpen(false));
    return (
        <>
            <div className="w-full">
                <p className="text-dark-grey text-sm">
                    Поиск по врачу или специализации
                </p>
                <div className="w-wull flex space-x-1">
                    <div className="p-1 rounded-sm w-9/12 bg-gradient-to-b from-light-pink to-light-blue">
                        <input
                            type="text"
                            className="py-2 px-4 focus:outline-none w-full h-full"
                            placeholder="Например: Эндокринолог или УЗИ"
                            onChange={(event) => {
                                setOpen(true);
                                setSearchParams(event.target.value);
                            }}
                        />
                    </div>
                    <button className="bg-pink-purple text-white rounded-md w-3/12">
                        Найти
                    </button>
                </div>
                <div className="relative" ref={searchRef}>
                    {open && (
                        <SearchResults
                            doctors={searchResults?.doctors}
                            specializations={searchResults?.specializations}
                            loading={loading}
                            error={error}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default Search;

interface SearchResultsProps {
    deseases?: Desease[];
    doctors?: Doctor[];
    services?: Service[];
    specializations?: Specialization[];
    loading: boolean;
    error?: Error;
}

const SearchResults = (props: SearchResultsProps) => {
    const { loading, deseases, doctors, specializations } = props;
    const DoctorsList = () => {
        if (!doctors || !doctors.length) return <></>;
        return (
            <>
                <div className="text-2xl font-semibold ">Доктора</div>
                {doctors.map((doctor, index: number) => (
                    <Link href={`/doctor/${doctor._id}`}>
                        <div className="flex flex-col w-full my-2 ">
                            <div
                                className="bg-white rounded-lg overflow-hidden shadow-xl py-4 hover:bg-pink-purple hover:text-white cursor-pointer transition-all ease-in-out"
                                key={index}
                            >
                                <div className="p-4">
                                    <p className="font-medium text-lg">
                                        Имя:{" "}
                                        <span className="font-normal text-base leadin-relaxed">
                                            {doctor.fullName}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </>
        );
    };
    const ServiceList = ({
        specializations,
    }: {
        specializations: Specialization[];
    }) => {
        if (!specializations || !specializations.length) return <></>;
        return (
            <>
                <div className="text-2xl font-semibold ">Специализация</div>
                {specializations.map((specialization, index: number) => {
                    return (
                        index <= 5 && (
                            <Link
                                href={`/specialization/${specialization._id}?age=adult`}
                            >
                                <div className="flex flex-col px-2 w-full my-2">
                                    <div
                                        className="bg-white rounded-lg overflow-hidden shadow-xl py-4 hover:bg-pink-purple cursor-pointer transition-all ease-in-out hover:text-white"
                                        key={index}
                                    >
                                        <div className="p-4">
                                            <p className="font-medium text-lg">
                                                Название:{" "}
                                                <span className="font-normal text-base leadin-relaxed">
                                                    {specialization.name}
                                                </span>
                                            </p>
                                            <p className="font-medium text-lg">
                                                Описание:{" "}
                                                <span className="font-normal text-base">
                                                    {specialization.description}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    );
                })}
            </>
        );
    };
    return (
        <div className="w-full flex flex-col transparent absolute space-y-6 my-2 bg-white  rounded-lg shadow-lg z-40 p-4 lg:p-8">
            {loading ? (
                <span className="font-bold text-lg"> Идёт Поиск... </span>
            ) : (
                <div className="">
                    <DoctorsList />
                    <ServiceList specializations={specializations ?? []} />
                </div>
            )}
        </div>
    );
};

// function useComponentVisible(ref, isOpen) {
//     const [open, setOpen] = React.useState(isOpen);
//     const handleClickOutside = () => {
//         setOpen(!isOpen);
//     };
//     React.useEffect(() => {
//         // Bind the event listener
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             // Unbind the event listener on clean up
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, [ref]);
//     return open;
// }

const useOutsideClick = (
    ref: React.RefObject<HTMLDivElement>,
    callback: () => void,
): void => {
    const handleClick = (e: { target: any }) => {
        if (ref.current && !ref.current.contains(e.target)) {
            callback();
        }
    };

    React.useEffect(() => {
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    });
};
