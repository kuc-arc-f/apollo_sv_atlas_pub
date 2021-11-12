// LibMongo
const MongoClient = require('mongodb').MongoClient;

const LibMongo = {
  url: "",
  dbName: "test",
  init:function(){
  },
  get_db_name: function(){
    this.init()
    return this.dbName
  },  
  getClient:async function(){
    try{
      const uri = this.url + "?retryWrites=true&w=majority";
      //console.log(process.env.MONGODB_DB_NAME);
      const client = await new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      await client.connect();
      return client
    } catch (err) {
      console.log(err);
      throw new Error('Error, getClient');
    }
  },
  get_item: async function(collectionName: string  , where: any ){
    try{
      this.init()
      const client = await LibMongo.getClient();
      const dbName = this.get_db_name();
      const collection = client.db(dbName).collection(collectionName);
      const item = await collection.findOne(where) 
      client.close();
      return item
    } catch (err) {
      console.log(err);
      throw new Error('Error, get_item');
    }
  },     
  getCount: async function(collectionName: string , where: any){
    try{
      this.init()
      const dbName = this.get_db_name();
      const client = await LibMongo.getClient();
      const collection = client.db(dbName).collection(collectionName);
      const ret = await collection.find(where).count()
      client.close();
      return ret
    } catch (err) {
      console.log(err);
      throw new Error('Error, getCount');
    }
  },     

}
export default LibMongo;