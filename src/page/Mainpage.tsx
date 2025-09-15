import { useEffect, useState } from "react";
import ImgCard from "../componuent/Card";
import type { ImgCardData } from "../type";
import { getBoards } from "../api/boardApi";
import { useAuthState } from "../store";
import { useNavigate } from "react-router-dom";



export default function Mainpage() {
    const { isAuthenticated } = useAuthState();
    const [data, setData] = useState<ImgCardData[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        // axios.get("http://localhost:5173/api/")
        //     .then(res => {
        //         setData(res.data);
        //     })
        getBoards("ALL")
            .then(res => setData(res))
        // .catch(e => setData([]));
    }, [isAuthenticated])

    return (
        <>
            <div className="flex justify-center">
                <div className="flex gap-5 flex-wrap m-20" >
                    {data.map((d) => {
                        return (
                            <ImgCard
                                key={d.id}
                                title={d.title}
                                content={d.contents.length > 20 ? `${d.contents.slice(0, 20)}...` : d.contents}
                                img={d.img}
                                onClick={() => navigate(`/boards/${d.id}`)}
                            />
                        )
                    })
                    }
                </div>
            </div>
        </>
    )
}