import { useContext, useState } from "react";
import NoteContext from "../context/notes/noteContext";

export default function AddNote(props) {
    const context = useContext(NoteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleAdd = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })
        props.showAlert("Note added Successfully", "teal")
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <h1 className="text-3xl font-bold">Add Note</h1>
            <div className="w-full px-4">
                <form className="shadow-md rounded pt-6 pb-8 mb-4" onSubmit={handleAdd}>
                    <div className="mb-4">
                        <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="title">
                            Title
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="title"
                            name="title"
                            type="text"
                            value={note.title}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="description">
                            Description
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="description"
                            name="description"
                            type="text"
                            value={note.description}
                            onChange={onChange}
                            minLength={5}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="title">
                            Tag
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="tag"
                            name="tag"
                            type="text"
                            value={note.tag}
                            onChange={onChange}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            {/* <button className={`${(note.title.length < 3 || note.description.length < 5) ? " bg-blue-300" : "bg-blue-500 hover:bg-blue-700" } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`} type="submit"> */}
                            Add Note
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}
