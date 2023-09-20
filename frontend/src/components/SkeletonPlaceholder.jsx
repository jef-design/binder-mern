import React from "react";
import {Skeleton} from "@mui/material";

const SkeletonPlaceholder = ({variant,width, height,animation}) => {
    return (
        <Skeleton
            // sx={{bgcolor: "#252833"}}
            variant={variant}
            width={width}
            height={height}
            animation={animation}
        />
    );
};

export default SkeletonPlaceholder;
