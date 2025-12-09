import './PageLayout.css'

export default function ElectionCreationPage() {
  const handleSubmit = (event) => {
    event.preventDefault()
    alert('Election created (placeholder)')
  }

  return (
    <div className="page">
      <h1>Create Election</h1>
      <p className="lead">Set up a new election with key details.</p>
      <div className="page-card">
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input id="title" name="title" placeholder="Election title" required />
          <label htmlFor="category">Category</label>
          <input id="category" name="category" placeholder="e.g., University" />
          <label htmlFor="start">Start</label>
          <input id="start" type="datetime-local" name="start" required />
          <label htmlFor="end">End</label>
          <input id="end" type="datetime-local" name="end" required />
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  )
}

