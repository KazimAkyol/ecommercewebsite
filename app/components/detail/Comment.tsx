"use client"

import Avatar from "../general/Avatar";

const Comment = ({ prd }: { prd: any }) => {

    console.log(prd, "prd");
    return (
        <div>
            <Avatar image={prd?.user?.image} />
        </div>
    )
}

export default Comment