import { Film } from "../generated/graphql";

export const getAllProducersWorkCount = (
    films: Film[] | undefined | null
  ): Record<string, number> => {
    let producerCounts: any = {};
  
    films?.map((film: Film) => {
      film?.producers?.forEach((producer) => {
        if (producer) {
          producerCounts[producer] = !producerCounts[producer]
            ? 1
            : producerCounts[producer] + 1;
        }
      });
    });
    return producerCounts;
  };
  