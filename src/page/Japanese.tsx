import { useEffect, useState } from "react";
import { getBoards } from "../api/boardApi";
import type { ImgCardData } from "../type";
import ImgCard from "../componuent/Card";
import { useNavigate } from "react-router-dom";

export default function Japanese() {
    const [data, setData] = useState<ImgCardData[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getBoards("JP").then(res => setData(res))
    }, [])

    return (
        <>
            <div className="flex justify-center">
                <div className="flex gap-5 flex-wrap m-20" >
                    {data.map((d) => {
                        return (
                            <ImgCard
                                title={d.title}
                                content={d.contents}
                                img={d.img}
                                onClick={() => navigate(`/boards/${d.id}`)}
                            />
                        )
                    })}
                </div>
            </div>
        </>
    )
}