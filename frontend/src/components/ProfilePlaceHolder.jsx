import React from "react";
import SkeletonPlaceholder from "./SkeletonPlaceholder";
const ProfilePlaceHolder = () => {
    return (
        <div className="flex flex-col gap-5 bg-white p-2 rounded-md">
            <div className="flex gap-2 justify-between items-center">
                <SkeletonPlaceholder variant={"rectangular"} width={"35%"} height={10} animation="pulse" />
                <SkeletonPlaceholder variant={"circular"} width={90} height={90} animation="pulse" />
            </div>
            <SkeletonPlaceholder variant={"rectangular"} width={"60%"} height={10} animation="pulse" />
           <div className="flex gap-2">
           <SkeletonPlaceholder variant={"rectangular"} width={"100%"} height={35} animation="pulse" />
            <SkeletonPlaceholder variant={"rectangular"} width={"100%"} height={35} animation="pulse" />
           </div>
        </div>
    );
};

export default ProfilePlaceHolder;