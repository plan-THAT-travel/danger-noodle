import React from "react";
import { useSelector } from "react-redux";

const Activity = (
    {index}
    ) => {
    const { _id, group_id, title, category, hyperlink, cost, date_of_event} = useSelector((store) => store.groups.activityList[index]);
    return(
        <div className="itin-item">
            <div className="top-bar-itin">
                <div><h2>{title}</h2></div>
                <div><strong>{category}</strong></div>
                <div>{date_of_event}</div>
            </div>
            <div>Cost: ${Number(cost).toFixed(2)}</div>
            <div><a href={hyperlink}>Page</a></div>
        </div>
    )
}

export default Activity;