import { Planet } from "../generated/graphql";

export const getCountOfPlanetsNoWater = (planets: Planet[]) => {
    let count = 0;
    planets?.forEach((planet: Planet) => {
      if (!planet?.surfaceWater) {
        count += 1;
      }
    });
    return count;
  };