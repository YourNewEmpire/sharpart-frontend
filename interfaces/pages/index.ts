
export type GasData = {
      safeLow : number
      standard : number
      fast : number
      fastest : number
      blockTime :number
      blockNumber :number
}

export interface EthHistoric {
      market_caps: number[][];
      total_volumes: number[][];
      prices: number[][];
}

export interface HomeProps {
      data: GasData | null
}

export interface EthOrbProps {
      ethHistoric: EthHistoric | null
}

export type artistImg = {
      url: string;

}
export interface IArtist {
      artistSlug: string;
      artistName: string;
      artistDesc: string;
      createdAt?: string;
      updatedAt?: string;
      artistImage: artistImg;
}