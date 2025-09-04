import { useEffect, useState } from "react";
import ImgCard from "../componuent/Card";
import type { ImgCardData } from "../type";
import { getBoards } from "../api/boardApi";



export default function Mainpage() {

    const [data, setData] = useState<ImgCardData[]>([]);

    useEffect(() => {
        // axios.get("http://localhost:5173/api/")
        //     .then(res => {
        //         setData(res.data);
        //     })
        getBoards("ALL").then(res => setData(res));
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
                    })

                    }
                </div>
            </div>
        </>
    )
}