// LibMongo
const MongoClient = require('mongodb').MongoClient;

const LibMongo = {
  url: "",
  dbName: "test",
  init:function(){
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
  get_db_name: function(){
    this.init()
    return this.dbName
  },   
  get_array: async function(collectionName : string){
    try{
      this.init()
      let client = await MongoClient.connect( this.url);
      const db = client.db( this.dbName);
      const collection = db.collection(collectionName);
      const items = await collection.find({}).sort({created_at: -1}).toArray()
      client.close();
      return items
    } catch (err) {
      console.log(err);
      throw new Error('Error, get_array');
    }
  },
  get_arrayWhere: async function(collectionName: string , where: any){
    try{
      this.init()
      let client = await MongoClient.connect( this.url);
      const db = client.db( this.dbName);
      const collection = db.collection(collectionName);
      const items = await collection.find(where).sort({created_at: -1}).toArray()
      client.close();
      return items
    } catch (err) {
      console.log(err);
      throw new Error('Error, get_array');
    }
  },  
  get_item: async function(collectionName:string , where :any){
    try{
      this.init()
      let client = await MongoClient.connect( this.url);
      const db = client.db( this.dbName);
      const collection = db.collection(collectionName);
      const item = await collection.findOne(where) 
      client.close();
      return item
    } catch (err) {
      console.log(err);
      throw new Error('Error, get_item');
    }
  },
  add_item: async function(collectionName: string,item: any){
    try{
      this.init()
      let client = await MongoClient.connect( this.url);
      const db = client.db( this.dbName);
      const collection = db.collection(collectionName);
      await collection.insertOne(item); 
      client.close();
      return item
    } catch (err) {
      console.log(err);
      throw new Error('Error, add_item');
    }
  }, 
  update_item: async function(collectionName:string , where: any, item: any){
    try{
      this.init()
      let client = await MongoClient.connect( this.url);
      const db = client.db( this.dbName);
      const collection = db.collection(collectionName);
      await collection.updateOne(where, { $set: item })
      client.close();
    } catch (err) {
      console.log(err);
      throw new Error('Error, update_item');
    }
  }, 
  delete_item: async function(collectionName: string , where: any ){
    try{
      this.init()
      let client = await MongoClient.connect( this.url);
      const db = client.db( this.dbName);
      const collection = db.collection(collectionName);
      await collection.deleteOne(where)   
      client.close();
    } catch (err) {
      console.log(err);
      throw new Error('Error, delete_item');
    }
  },
  get_count: async function(collectionName:string , where: any){
    try{
      this.init()
      let client = await MongoClient.connect( this.url);
      const db = client.db( this.dbName);
      const collection = db.collection(collectionName);
      const ret = await collection.find(where).count()
      client.close();
      return ret
    } catch (err) {
      console.log(err);
      throw new Error('Error, get_array');
    }
  },     

}
export default LibMongo;