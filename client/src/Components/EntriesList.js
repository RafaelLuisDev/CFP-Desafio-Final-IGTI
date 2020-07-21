import React from 'react';
import Entry from './Entry';

export default function EntriesList({ deleteEntry, entries, changeModeModal }) {
    return (
        <div>
            {entries.map((entry, index) => {
                return <Entry entry={entry} key={index} deleteEntry={deleteEntry} changeModeModal={changeModeModal}></Entry>;
            })}
        </div>
    );
}
