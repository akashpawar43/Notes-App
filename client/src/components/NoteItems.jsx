import React, { useContext } from 'react';
import { IoTrashBinOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import NoteContext from '../context/notes/noteContext';

export default function NoteItems(props) {
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <div className=" flex flex-col overflow-hidden px-6 py-4 gap-2 shadow-lg border rounded-xl border-slate-500">
            <div className="">
                <div className="font-bold text-xl mb-2">{note.title}</div>
                <p className="text-gray-400 text-base">
                    {note.description}
                </p>
            </div>
            <div className="">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{note.tag}</span>
            </div>
            <div className='flex flex-row gap-2 w-full justify-end cursor-pointer'>
                <IoTrashBinOutline onClick={() => { deleteNote(note._id); props.showAlert("Note Deleted Successfully", "teal") }} />
                <FiEdit onClick={() => { updateNote(note) }} />
            </div>
        </div>
    )
}
