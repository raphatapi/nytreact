import React from 'react';

export const Saved = props =>

    <div className="panel panel-success">
        <div className="panel-heading">
            <h3 className="panel-title text-center"><strong>Saved Articles</strong></h3>
        </div>
        <div className="panel-body" {...props} />
    </div>