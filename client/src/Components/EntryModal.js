import React, { useEffect } from 'react';
import M from 'materialize-css';

export default function EntryModal({ modeModal, changeModeModal, actionModal }) {
    const titleModal = modeModal === 'ADD' ? 'Adicionar Lançamento' : 'Editar Lançamento';
    const titleActionButton = modeModal === 'ADD' ? 'Salvar' : 'Atualizar';

    useEffect(() => {
        var modals = document.querySelectorAll('.modal');
        M.Modal.init(modals, {});
        var datepickers = document.querySelectorAll('.datepicker');
        M.Datepicker.init(datepickers, { container: document.getElementById('root'), format: 'dd/mm/yyyy' });
    }, []);

    const handleClickActionModal = (event) => {
        const newEntry = {
            _id: document.getElementById('hiddenId').value,
            description: document.getElementById('inputDescription').value,
            value: document.getElementById('inputValue').value,
            category: document.getElementById('inputCategory').value,
            type: document.querySelector("[name='entryType']:checked").value,
            date: document.getElementById('inputDate').value,
        };
        actionModal(modeModal, newEntry);
    };

    const handleClickAddEntry = (event) => {
        changeModeModal('ADD');
        document.getElementById('hiddenId').value = '';
        document.getElementById('inputDescription').value = '';
        document.getElementById('inputValue').value = '';
        document.getElementById('inputCategory').value = '';
        document.getElementById('receita').checked = true;
        document.querySelectorAll("[name='entryType']").forEach((entryType) => (entryType.disabled = false));
        document.getElementById('inputDate').value = '';
    };

    return (
        <div>
            <div className="fixed-action-btn">
                <button id="newEntry" className="waves-effect waves-light btn btn-large btn-floating modal-trigger" data-target="entryModal" onClick={handleClickAddEntry}>
                    <i className="material-icons">add</i>
                </button>
            </div>
            <div id="entryModal" className="modal modal-fixed-footer">
                <div className="modal-content">
                    <div className="row">
                        <div className="col s12">
                            <h4>{titleModal}</h4>
                        </div>
                    </div>
                    <form action="#">
                        <input type="hidden" id="hiddenId" />
                        <div className="row">
                            <div className="col s6">
                                <label>
                                    <input id="receita" className="with-gap" name="entryType" type="radio" value="+" defaultChecked />
                                    <span>Receita</span>
                                </label>
                            </div>
                            <div className="col s6">
                                <label>
                                    <input id="despesa" className="with-gap" name="entryType" type="radio" value="-" />
                                    <span>Despesa</span>
                                </label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="inputDescription" type="text" placeholder="" />
                                <label>Descrição:</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="inputCategory" type="text" placeholder="" />
                                <label>Categoria:</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="inputValue" type="number" placeholder="" />
                                <label>Valor:</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="inputDate" type="text" className="datepicker" placeholder="" />
                                <label>Data:</label>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button className="modal-close waves-effect waves-green btn green" onClick={handleClickActionModal}>
                        {titleActionButton}
                    </button>
                    <button className="modal-close waves-effect waves-green btn grey darken-1">Cancelar</button>
                </div>
            </div>
        </div>
    );
}
