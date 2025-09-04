import { useEffect, useState } from "react";
import { getBoards } from "../api/boardApi";
import type { ImgCardData } from "../type";
import ImgCard from "../componuent/Card";

export default function Korean() {
    const [data, setData] = useState<ImgCardData[]>([]);

    useEffect(() => {
        getBoards("KR").then(res => setData(res))
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
                            />
                        )
                    })}
                </div>
            </div>
        </>
    )
}