export interface IToken {
  address: string;
  network: string;
  tokenId: string;
  blockNumber: number;
  createdAt: string;
  data: {
    tokenId: string;
    media: {
      image: string;
      [key: string]: string;
    };
    [key: string]: string | { image: string; [key: string]: string };
  };
}

export interface INFT {
  tokenId: string;
  meta: {
    name: string;
    image: string;
    description: string;
    attributes: {
      trait_type: string;
      value: string;
    }[];
  };
}

// Modified
