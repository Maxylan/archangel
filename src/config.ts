export interface PrivateConfiguration {
  ARCHANGEL_TOKEN: string | undefined;
}

export const config: PrivateConfiguration = {
  ARCHANGEL_TOKEN: process.env.ARCHANGEL_TOKEN,
};
