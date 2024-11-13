
import './App.css'
import PaginatedItems from './components/Basic'
import ServerSidePaginatedItems from './components/Server-Side Pagination'

function App() {
  

  return (
   <div>
    <h2>Client-Side Pagination</h2>
    <PaginatedItems itemsPerPage={10} />

    <h2>Server-Side Pagination</h2>
    <ServerSidePaginatedItems itemsPerPage={10} />
   </div>
  )
}

export default App
