import React, { useState } from 'react';
import transactionService from './Services/transactionsService';
import Header from './Components/Header';
import Informations from './Components/Informations';
import Filter from './Components/Filter';
import EntryModal from './Components/EntryModal';
import EntriesList from './Components/EntriesList';

const emptyEntry = {
    _id: '',
    description: '',
    value: 0,
    category: '',
    type: '+',
    date: '',
};

export default function App() {
    const selectPeriod = document.getElementById('selectPeriod');
    const [entriesByPeriod, setEntriesByPeriod] = useState([]);
    const [filteredEntriesByPeriod, setFilteredEntriesByPeriod] = useState([]);
    const [modeModal, setModeModal] = useState('ADD');

    const onChangeFilter = (textFilter) => {
        setFilteredEntriesByPeriod(
            entriesByPeriod.filter((entry) => {
                return entry.description.toLowerCase().includes(textFilter.toLowerCase());
            })
        );
    };

    const onChangePeriod = (period) => {
        getEntriesByPeriod(period);
    };

    const getEntriesByPeriod = (period) => {
        const entriesByPeriod = async () => {
            return await transactionService.getEntriesByPeriod(period);
        };

        entriesByPeriod().then((success) => {
            setEntriesByPeriod(success.data.entries);
            setFilteredEntriesByPeriod(success.data.entries);
            document.getElementById('inputFilter').value = '';
        });
    };

    const changeModeModal = (newMode) => {
        setModeModal(newMode);
    };

    const actionModal = async (mode, entry) => {
        const saveEntry = {
            ...entry,
            year: entry.date.split('/')[2],
            month: entry.date.split('/')[1],
            day: entry.date.split('/')[0],
            yearMonth: entry.date.split('/')[2] + '-' + entry.date.split('/')[1],
            yearMonthDay: entry.date.split('/')[2] + '-' + entry.date.split('/')[1] + '-' + entry.date.split('/')[0],
        };
        delete saveEntry.date;
        if (mode === 'ADD') {
            delete saveEntry._id;
            console.log(saveEntry);
            await transactionService
                .postEntry(saveEntry)
                .then((success) => {
                    console.log(success);
                    getEntriesByPeriod(selectPeriod.value);
                })
                .catch((error) => {
                    console.log(error);
                    console.log(error.message);
                    console.log(error.response);
                });
        } else
            await transactionService
                .updateEntry(saveEntry._id, saveEntry)
                .then((success) => {
                    console.log(success);
                    getEntriesByPeriod(selectPeriod.value);
                })
                .catch((error) => {
                    console.log(error);
                    console.log(error.message);
                    console.log(error.response);
                });
    };

    const deleteEntry = async (id) => {
        await transactionService
            .deleteEntry(id)
            .then((success) => {
                console.log(success);
                getEntriesByPeriod(selectPeriod.value);
            })
            .catch((error) => {
                console.log(error);
                console.log(error.message);
                console.log(error.response);
            });
    };

    return (
        <div className="container">
            <Header></Header>
            <Informations entriesByPeriod={entriesByPeriod} onChangePeriod={onChangePeriod}></Informations>
            <Filter onChangeFilter={onChangeFilter}></Filter>
            <EntriesList deleteEntry={deleteEntry} entries={filteredEntriesByPeriod} changeModeModal={changeModeModal}></EntriesList>
            <EntryModal modeModal={modeModal} changeModeModal={changeModeModal} actionModal={actionModal} />
        </div>
    );
}
