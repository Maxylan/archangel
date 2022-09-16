export interface PrivateConfiguration {
  ARCHANGEL_TOKEN: 			string | undefined;
  ARCHANGEL_DB: 			string | undefined;
  ARCHANGEL_DB_ADRESS: 		string | undefined;
  ARCHANGEL_DBUSER: 		string | undefined;
  ARCHANGEL_DBUSER_ADRESS: 	string | undefined;
  ARCHANGEL_DBUSER_PSWD:	string | undefined;
  ARCHANGEL_PSWD_SALT:		string | undefined;
}

export const config: PrivateConfiguration = {
  ARCHANGEL_TOKEN:			process.env.ARCHANGEL_TOKEN,
  ARCHANGEL_DB:				process.env.ARCHANGEL_DB,
  ARCHANGEL_DB_ADRESS:		process.env.ARCHANGEL_DB_ADRESS,
  ARCHANGEL_DBUSER:			process.env.ARCHANGEL_DBUSER,
  ARCHANGEL_DBUSER_ADRESS:	process.env.ARCHANGEL_DBUSER_ADRESS,
  ARCHANGEL_DBUSER_PSWD:	process.env.ARCHANGEL_DBUSER_PSWD,
  ARCHANGEL_PSWD_SALT:		process.env.ARCHANGEL_PSWD_SALT
};
