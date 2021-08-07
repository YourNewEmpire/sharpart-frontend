
export type GasData = {
      safeLow : number
      standard : number
      fast : number
      fastest : number
      blockTime :number
      blockNumber :number
      //? like standard but for eth.
      average?: number
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

export type asset = {
      url: string;

}

export interface IArtist {
      artistSlug: string;
      artistName: string;
      artistDesc: string;
      createdAt?: string;
      updatedAt?: string;
      artistImage: asset;
      artistMarkdown: string;
      artistLinks: string;
      nftAddress: string[];
      posts: { compiledSource: string };
      links: { compiledSource: string };
}