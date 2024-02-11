import { useContext, useEffect, useState } from "react";
import NoteContext from "../context/notes/noteContext";
import NoteItems from "./NoteItems";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

export default function Notes(props) {
    const context = useContext(NoteContext);
    const navigate = useNavigate();
    const { notes, getNotes, editNote } = context;
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    const [up, setUp] = useState(false)
    const { showAlert } = props;
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
        }
        else {
            navigate("/login")
        }
    }, [])

    const updateNote = (currentNote) => {
        setUp(!up)
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }

    const handleClick = () => {
        setUp(!up);
        // console.log("Updating note: ", note);
        editNote(note.id, note.etitle, note.edescription, note.etag);
        props.showAlert("Updated Note Successfully", "teal")
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className={`${up ? "" : " hidden"} container m-auto text-white flex flex-col justify-center items-center gap-4`}>
                <div id="default-modal" tabIndex="-1" className=" flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative p-4 w-full max-w-2xl max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Terms of Service
                                </h3>
                                <button type="button"
                                    onClick={() => setUp(!up)}
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="p-4 md:p-5 space-y-4">
                                <form className=" pt-6 pb-8">
                                    <div className="mb-4">
                                        <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="title">
                                            Title
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="etitle"
                                            name="etitle"
                                            type="text"
                                            onChange={onChange}
                                            value={note.etitle}
                                            required
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="description">
                                            Description
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                            id="edescription"
                                            name="edescription"
                                            type="text"
                                            onChange={onChange}
                                            value={note.edescription}
                                            minLength={5}
                                            required
                                        />
                                        <p className="text-red-500 text-xs italic">Please choose a password.</p>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="title">
                                            Tag
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="etag"
                                            name="etag"
                                            type="text"
                                            onChange={onChange}
                                            value={note.etag}
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button onClick={handleClick} data-modal-hide="default-modal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update Note</button>
                                <button onClick={() => setUp(!up)} type="button" className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AddNote showAlert={showAlert} />
            <div className=" container m-auto text-white p-4 flex flex-col justify-center items-center gap-4">
                <h1 className=" text-3xl font-bold">Your Notes</h1>
                <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 w-full">
                    {notes.length > 0 ?
                        (notes.map((note, i) => {
                            return (<NoteItems key={i} updateNote={updateNote} showAlert={showAlert} note={note} />);
                        }))
                        :
                        <p>There is no Note.</p>
                    }
                </div>
            </div>
        </>
    )
}
