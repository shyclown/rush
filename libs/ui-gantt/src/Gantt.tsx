import React from "react";
import {FC, useEffect} from "react";

export const Gantt: FC<{data: Record<string, any>[]}> = (data) => {
    useEffect(() => {
        console.log(data);
    }, [data])
    return (<div>Gantt Chart</div>);
}