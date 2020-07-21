import React from 'react';
import './Entries.css';
import formatHelpers from '../Helpers/formatHelpers';
import M from 'materialize-css';

export default function Entry({ deleteEntry, entry, changeModeModal }) {
    const colorRow = 'lighten-1 ' + (entry.type === '-' ? 'red' : 'green');

    const handleClickDelete = () => {
        deleteEntry(entry._id);
    };

    const handleClickEdit = (event) => {
        changeModeModal('EDIT');
        const modal = M.Modal.getInstance(document.getElementById('entryModal'));
        modal.open();
        document.getElementById('hiddenId').value = entry._id;
        document.getElementById('inputDescription').value = entry.description;
        document.getElementById('inputValue').value = entry.value;
        document.getElementById('inputCategory').value = entry.category;
        if (entry.type === '+') document.getElementById('receita').checked = true;
        else document.getElementById('despesa').checked = true;
        document.querySelectorAll("[name='entryType']").forEach((entryType) => {
            entryType.disabled = true;
        });
        const date = `${formatHelpers.format2Digits(entry.day)}/${formatHelpers.format2Digits(entry.month)}/${entry.year}`;
        document.getElementById('inputDate').value = date;
    };

    return (
        <div className="entry">
            <div className={`entryDay ${colorRow}`}>{formatHelpers.format2Digits(entry.day)}</div>
            <div className="entryContent">
                <div className="entryCategory">
                    <b>{entry.category}</b>
                </div>
                <div className="entryDescription">
                    <i>{entry.description}</i>
                </div>
            </div>
            <div className="entryValue">{formatHelpers.formatValue(entry.value)}</div>
            <div className="entryOptions">
                <button className="waves-effect waves-light btn-floating" onClick={handleClickEdit}>
                    <i className="material-icons">edit</i>
                </button>
                <button className="waves-effect waves-light btn-floating" onClick={handleClickDelete}>
                    <i className="material-icons">delete</i>
                </button>
            </div>
        </div>
    );
}
