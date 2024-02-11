import Notes from "./Notes";

export default function Home(props) {
    const { showAlert } = props;
    return (
        <main className=" bg-gray-900 min-h-screen">
            <div className=" container m-auto text-white p-4 flex flex-col justify-center items-center gap-4">
                <Notes showAlert={showAlert} />
            </div>
        </main>
    )
}
