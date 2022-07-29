import heatMapData from "src/__mocks__/heatspots";
import useGeo from "./useGeocode";
import { Heatmap } from "src/types";

export default function useHeatmap(): Heatmap[] {
    let pos = Math.floor(Math.random() * heatMapData.length);
    // console.log(pos);
    let data: Heatmap[] = [];

    heatMapData[0].forEach((location) => {
        let temp = useGeo(location);

        let tempData: Heatmap = {
            lat: temp.lat,
            lng: temp.lng,
            weight: Math.floor(Math.random() * Math.floor(5)),
        }

        data.push(tempData);
    })

    // console.log(data);
    return data;
}
