import React from 'react';

export default function Filter({ onChangeFilter }) {
    const handleChangeFilter = (event) => {
        onChangeFilter(event.target.value);
    };

    return (
        <div className="row">
            <div className="input-field col s12">
                <input placeholder="Buscar descrição" id="inputFilter" type="text" onChange={handleChangeFilter} />
            </div>
        </div>
    );
}
