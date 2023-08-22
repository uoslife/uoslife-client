import { ReactNode } from "react";
import { cafeteriaItem } from "../../screens/cafeteria/CafeteriaScreen";

export type CafeteriaCardProps = {
    title?: string,
    caption?: string,
    cafeteriaItems?: cafeteriaItem[],
    isEmpty?:boolean,
  };
  
  export default CafeteriaCardProps;
  