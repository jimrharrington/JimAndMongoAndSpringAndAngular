package org.jrh;

public class CarModel
{
    private String id;
    private String makeId;
    private String makeDisplay;
    private String makeIsCommon;
    private String makeCountry;

    public CarModel()
    {
        this.id = null;
        this.makeId = null;
        this.makeDisplay = null;
        this.makeIsCommon = null;
        this.makeCountry = null;
    }

    public CarModel( String id, String makeId, String makeDisplay, String makeIsCommon, String makeCountry )
    {
        this.id = id;
        this.makeId = makeId;
        this.makeDisplay = makeDisplay;
        this.makeIsCommon = makeIsCommon;
        this.makeCountry = makeCountry;
    }

    public String getId()
    {
        return id;
    }

    public void setId( String val )
    {
        id = val;
    }

    public String getMakeId()
    {
        return makeId;
    }

    public void setMakeId( String val )
    {
        makeId = val;
    }

    public String getMakeDisplay()
    {
        return makeDisplay;
    }

    public void setMakeDisplay( String val )
    {
        makeDisplay = val;
    }

    public String getMakeIsCommon()
    {
        return makeIsCommon;
    }

    public void setMakeIsCommon( String val )
    {
        makeIsCommon = val;
    }

    public String getMakeCountry()
    {
        return makeCountry;
    }

    public void setMakeCountry( String val )
    {
        makeCountry = val;
    }
}
   

    
