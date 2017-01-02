package org.jrh;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
@RequestMapping(path = "/models")
public class CarModelController
{
    @Autowired
    private CarModelService carModelService;

    @RequestMapping(method = RequestMethod.GET, path = "/list" )
    public ResponseEntity<List<CarModel>> getModels()
    {
        return new ResponseEntity<List<CarModel>>(carModelService.getModels(), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/byID/{id}" )
    public ResponseEntity<CarModel> getModelByID( @PathVariable String id )
    {
    	CarModel val = carModelService.getModelByID( id );
    	HttpStatus status = ((val != null) ? HttpStatus.OK : HttpStatus.NOT_FOUND );
    	
        return new ResponseEntity<CarModel>(val, status );
    }

    @RequestMapping(method = RequestMethod.GET, path = "/search/{attr}/{partial}" )
    public ResponseEntity<List<CarModel>> searchModels( @PathVariable String attr, @PathVariable String partial )
    {
        return new ResponseEntity<List<CarModel>>(carModelService.searchModels( attr, partial ), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, path = "/write" )
    public ResponseEntity<String> writeModel( @RequestBody CarModel value )
    {
        String val = carModelService.writeModel( value );
    	HttpStatus status = ((val != null) ? HttpStatus.OK : HttpStatus.NOT_FOUND );
        
        return new ResponseEntity<String>(val, status );
    }

    @RequestMapping(method = RequestMethod.DELETE, path = "/delete/{id}" )
    public ResponseEntity<String> deleteModel( @PathVariable String id )
    {
    	String val = carModelService.deleteModel( id );
    	HttpStatus status = ((val != null) ? HttpStatus.OK : HttpStatus.NOT_FOUND );
    	
        return new ResponseEntity<String>(val, status );
    }
}
