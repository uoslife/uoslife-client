import { ReactNode } from "react";
import { cafeteriaItem } from "../../screens/cafeteria/CafeteriaScreen";

export type CafeteriaCardProps = {
    place: string,
    time: string,
    cafeteriaItems?: cafeteriaItem[],
    isEmpty?:boolean,
  };
  
  export default CafeteriaCardProps;
  