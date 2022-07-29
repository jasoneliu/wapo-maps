import useGeo from "./useGeocode";
import { Heatmap } from "src/types";

export default function useHeatmap(cities: string[]): Heatmap[] {
    let data: Heatmap[] = [];

    cities.forEach((location) => {
        let temp = useGeo(location);

        let tempData: Heatmap = {
            lat: temp.lat,
            lng: temp.lng,
            weight: temp.weight,
        }

        data.push(tempData);
    })

    // console.log(data);
    return data;
}
