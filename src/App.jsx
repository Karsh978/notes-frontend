import { useState, useEffect } from 'react';
import { getAllNotes, createNote, deleteNote } from './api';

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await getAllNotes();
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    try {
      await createNote({ title, content });
      setTitle('');
      setContent('');
      fetchNotes();
    } catch (error) {
      console.error('Error creating note:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      fetchNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          My Notes
        </h1>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-slate-800 rounded-xl p-5 mb-8 shadow-lg border border-slate-700"
        >
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-slate-700 text-slate-100 placeholder-slate-400 rounded-lg px-4 py-2.5 mb-3 outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <textarea
            placeholder="Write something..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            className="w-full bg-slate-700 text-slate-100 placeholder-slate-400 rounded-lg px-4 py-2.5 mb-3 outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-500 transition-colors text-white font-medium px-5 py-2.5 rounded-lg disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add Note'}
          </button>
        </form>

        {/* Notes list */}
        {notes.length === 0 ? (
          <p className="text-center text-slate-500">No notes yet — add your first one above.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {notes.map((note) => (
              <div
                key={note.id}
                className="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow hover:border-slate-600 transition-colors flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-semibold text-lg mb-1 break-words">{note.title}</h3>
                  <p className="text-slate-400 text-sm break-words whitespace-pre-wrap">{note.content}</p>
                </div>
                <button
                  onClick={() => handleDelete(note.id)}
                  className="self-end mt-4 text-red-400 hover:text-red-300 text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;