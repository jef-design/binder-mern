import React from "react";
import SkeletonPlaceholder from "./SkeletonPlaceholder";
const PostPlaceholder = () => {
    return (
        <div className="flex flex-col gap-5 bg-white py-2 px-4 rounded-md mt-4">
            <div className="flex gap-2 items-center">
                <SkeletonPlaceholder variant={"circular"} width={40} height={40} animation="pulse" />
                <SkeletonPlaceholder variant={"rectangular"} width={"35%"} height={10} animation="pulse" />
            </div>
            <SkeletonPlaceholder variant={"rectangular"} width={"60%"} height={10} animation="pulse" />
            <SkeletonPlaceholder variant={"rectangular"} width={"100%"} height={145} animation="pulse" />
            <SkeletonPlaceholder variant={"rectangular"} width={"100%"} height={14} animation="pulse" />
        </div>
    );
};

export default PostPlaceholder;
