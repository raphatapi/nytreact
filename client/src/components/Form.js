import React from'react';

export const Form = props =>

    <div className="panel panel-primary">
        <div className="panel-heading">
            <h2 className="panel-title text-center"><strong>Search</strong></h2>
        </div>
        <div className="panel-body text-center">

                <form>
                    <div className="form-group">
                        <h4 className=""><strong>Topic</strong></h4>
                        <input type="text" className="form-control text-center" id="topic" {...props} required/>
                        <br />

                        <h4 className=""><strong>Start Year</strong></h4>
                        <input type="text" className="form-control text-center" id="startYear" {...props} required/>
                        <br />

                        <h4 className=""><strong>End Year</strong></h4>
                        <input type="text" className="form-control text-center" id="endYear" {...props} required/>
                        <br />
                        
                        <button type="button" className="btn btn-primary" onClick={this.handleClick}>Search</button>
                    </div>

                </form>
        </div>
    </div>