package org.jrh;

import java.util.*;

public interface CarModelService
{
    public static final String ID = "_id";
    public static final String MAKE_ID = "make_id";
    public static final String MAKE_DISPLAY = "make_display";
    public static final String MAKE_IS_COMMON = "make_is_common";
    public static final String MAKE_COUNTRY = "make_country";
        
    public List<CarModel> getModels();

    public CarModel getModelByID( String id );

    public List<CarModel> searchModels( String attr, String partialValue );

    public String writeModel( CarModel value );

    public String deleteModel( String id );
}
   

    
