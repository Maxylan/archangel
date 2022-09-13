interface Configuration {
  ARCHANGEL_TOKEN: string | undefined;
}

const config: Configuration = {
  ARCHANGEL_TOKEN: process.env.ARCHANGEL_TOKEN,
};

export {config};
