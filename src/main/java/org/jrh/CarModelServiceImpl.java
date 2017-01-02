package org.jrh;

import org.springframework.stereotype.Service;
import com.mongodb.*;
import org.bson.types.*;
import java.util.*;

@Service
public class CarModelServiceImpl
	implements CarModelService
{
    private static MongoClient mongoClient;
    private static DB database;
    private static DBCollection collection;

    static
    {
        mongoClient = new MongoClient(new MongoClientURI("mongodb://localhost:27017"));
        database = mongoClient.getDB("test");
        collection = database.getCollection("makes");
    }

    public List<CarModel> getModels()
    {
        ArrayList<CarModel> rtn = new ArrayList<CarModel>();
        
        DBCursor cursor = collection.find();

        while( cursor.hasNext() )
        {
            DBObject obj = cursor.next();

            CarModel model = new CarModel( obj.get( "_id" ).toString(),
                                           (String) obj.get( "make_id" ),
                                           (String) obj.get( "make_display" ),
                                           (String) obj.get( "make_is_common" ),
                                           (String) obj.get( "make_country" ) );

            rtn.add( model );
        }

        return rtn;
    }

    public CarModel getModelByID( String id )
    {
        CarModel rtn = null;

        ObjectId idObj = new ObjectId( id );        
        BasicDBObject query = new BasicDBObject();        
        query.append( ID, idObj); 
        
        DBObject obj = collection.findOne(query);

        if ( obj != null )
        {
            rtn = new CarModel( obj.get( "_id" ).toString(),
                                (String) obj.get( "make_id" ),
                                (String) obj.get( "make_display" ),
                                (String) obj.get( "make_is_common" ),
                                (String) obj.get( "make_country" ) );
        }

        return rtn;
    }

    public List<CarModel> searchModels( String attr, String partialValue )
    {
        ArrayList<CarModel> rtn = new ArrayList<CarModel>();

        BasicDBObject regexQuery = new BasicDBObject();
        regexQuery.put(attr,
                       new BasicDBObject("$regex", partialValue + ".*"));
        
        DBCursor cursor = collection.find(regexQuery);

        while( cursor.hasNext() )
        {
            DBObject obj = cursor.next();

            CarModel model = new CarModel( obj.get( "_id" ).toString(),
                                           (String) obj.get( "make_id" ),
                                           (String) obj.get( "make_display" ),
                                           (String) obj.get( "make_is_common" ),
                                           (String) obj.get( "make_country" ) );

            rtn.add( model );
        }

        return rtn;

    }

    public String writeModel( CarModel value )
    {
        String rtn = null;
        int i = 1;

        BasicDBObject record = new BasicDBObject();

        if ( value.getId() != null )
        {
            ObjectId idObj = new ObjectId( value.getId() );

            record.put( ID, idObj );
            record.put( MAKE_ID, value.getMakeId() );
            record.put( MAKE_DISPLAY, value.getMakeDisplay() );
            record.put( MAKE_IS_COMMON, value.getMakeIsCommon() );
            record.put( MAKE_COUNTRY, value.getMakeCountry() );
        }
        else
        {
            BasicDBObject toAdd = new BasicDBObject();

            record.put( MAKE_ID, value.getMakeId() );
            record.put( MAKE_DISPLAY, value.getMakeDisplay() );
            record.put( MAKE_IS_COMMON, value.getMakeIsCommon() );
            record.put( MAKE_COUNTRY, value.getMakeCountry() );
        }
        
        collection.save( record );

        ObjectId idObj = (ObjectId) record.get( ID );
        
        rtn = (( idObj != null ) ? idObj.toString() : "???" );
        
        return rtn;
    }

    public String deleteModel( String id )
    {
        ObjectId idObj = new ObjectId( id );        
        BasicDBObject query = new BasicDBObject();        
        query.append( ID, idObj);

        WriteResult res = collection.remove( query );

        return (( res.wasAcknowledged() ) ? "success" : "fail" );
    }
}
   

    
